import { useState, useCallback, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";

const WORKER_URL = "https://seqrets-waitlist.baton-banker-hazy.workers.dev";

interface Entry {
  email: string;
  source: string;
  signedUpAt: string | null;
}

function isValidEntry(val: unknown): val is { email: string; source: string; signedUpAt?: string | null } {
  if (!val || typeof val !== "object") return false;
  const v = val as Record<string, unknown>;
  return (
    typeof v.email === "string" && v.email.length > 0 && v.email.length <= 254 &&
    typeof v.source === "string" &&
    (v.signedUpAt === null || v.signedUpAt === undefined || typeof v.signedUpAt === "string")
  );
}

function parseEntries(raw: Array<{ key: string; value: string | object }>): Entry[] {
  return raw
    .map((e) => {
      try {
        const val = typeof e.value === "string" ? JSON.parse(e.value) : e.value;
        const entry = {
          email: val?.email || e.key,
          source: val?.source || "unknown",
          signedUpAt: val?.signedUpAt || null,
        };
        if (!isValidEntry(entry)) return null;
        return entry as Entry;
      } catch {
        if (typeof e.key === "string" && e.key.includes("@")) {
          return { email: e.key, source: "unknown", signedUpAt: null };
        }
        return null;
      }
    })
    .filter((e): e is Entry => e !== null)
    .sort((a, b) => {
      if (!a.signedUpAt) return 1;
      if (!b.signedUpAt) return -1;
      return new Date(b.signedUpAt).getTime() - new Date(a.signedUpAt).getTime();
    });
}

const AdminPage = () => {
  const [sessionToken, setSessionToken] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [search, setSearch] = useState("");
  const [secretValue, setSecretValue] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  // Delete modal state
  const [deleteEmail, setDeleteEmail] = useState("");
  const [confirmInput, setConfirmInput] = useState("");
  const [deleting, setDeleting] = useState(false);
  const modalInputRef = useRef<HTMLInputElement>(null);

  const isLoggedIn = !!sessionToken;

  const logout = useCallback(async () => {
    if (sessionToken) {
      try {
        await fetch(WORKER_URL + "/admin/logout", {
          method: "POST",
          headers: { "X-Admin-Token": sessionToken },
        });
      } catch { /* token will expire via TTL */ }
    }
    setSessionToken("");
    setEntries([]);
    setSearch("");
    setSecretValue("");
    setLoginError("");
  }, [sessionToken]);

  const fetchEntries = useCallback(async (token: string) => {
    const res = await fetch(WORKER_URL, {
      headers: { "X-Admin-Token": token },
    });
    if (res.status === 403) {
      logout();
      setLoginError("Session expired. Please log in again.");
      return;
    }
    if (!res.ok) return;
    const data = await res.json();
    setEntries(parseEntries(data.entries || []));
  }, [logout]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const secret = secretValue.trim();
    if (!secret) return;
    setLoggingIn(true);

    try {
      const loginRes = await fetch(WORKER_URL + "/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret }),
      });

      if (!loginRes.ok) {
        setLoginError(
          loginRes.status === 403
            ? "Wrong secret. Try again."
            : `Something went wrong (${loginRes.status})`
        );
        setLoggingIn(false);
        return;
      }

      const loginData = await loginRes.json();
      const token = loginData.token;
      setSessionToken(token);
      setSecretValue("");

      const res = await fetch(WORKER_URL, {
        headers: { "X-Admin-Token": token },
      });

      if (!res.ok) {
        setLoginError("Authenticated but failed to load data");
        setSessionToken("");
        setLoggingIn(false);
        return;
      }

      const data = await res.json();
      setEntries(parseEntries(data.entries || []));
    } catch {
      setLoginError("Network error — is the Worker deployed?");
    } finally {
      setLoggingIn(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteEmail) return;
    setDeleting(true);
    try {
      const res = await fetch(WORKER_URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Token": sessionToken,
        },
        body: JSON.stringify({ email: deleteEmail }),
      });
      if (res.ok) {
        setEntries((prev) => prev.filter((e) => e.email !== deleteEmail));
        setDeleteEmail("");
        setConfirmInput("");
      } else if (res.status === 403) {
        setDeleteEmail("");
        logout();
        setLoginError("Session expired. Please log in again.");
      }
    } catch { /* retry manually */ }
    finally { setDeleting(false); }
  };

  const exportCsv = () => {
    if (entries.length === 0) return;
    const rows = [["Email", "Source", "Signed Up"]];
    entries.forEach((e) => rows.push([e.email, e.source, e.signedUpAt || ""]));
    const csv = rows.map((r) => r.map((c) => '"' + c.replace(/"/g, '""') + '"').join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `seqrets-waitlist-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Focus modal input when opening
  useEffect(() => {
    if (deleteEmail) modalInputRef.current?.focus();
  }, [deleteEmail]);

  const filtered = search
    ? entries.filter(
        (e) =>
          e.email.toLowerCase().includes(search.toLowerCase()) ||
          e.source.toLowerCase().includes(search.toLowerCase())
      )
    : entries;

  const todayStr = new Date().toISOString().slice(0, 10);
  const todayCount = entries.filter(
    (e) => e.signedUpAt && e.signedUpAt.slice(0, 10) === todayStr
  ).length;

  const sources: Record<string, number> = {};
  entries.forEach((e) => { sources[e.source] = (sources[e.source] || 0) + 1; });
  const topSource = Object.entries(sources).sort((a, b) => b[1] - a[1])[0];

  return (
    <>
      <Helmet>
        <title>seQRets — Waitlist Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', background: "#0a0a0b", color: "#e4e4e7", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center" }}>

        {/* Login */}
        {!isLoggedIn && (
          <div style={{ background: "#18181b", border: "1px solid #27272a", borderRadius: 12, padding: "2rem", maxWidth: 400, margin: "4rem auto 0" }}>
            <h2 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "0.5rem" }}>Waitlist Admin</h2>
            <p style={{ color: "#71717a", fontSize: "0.8125rem", marginBottom: "1.25rem" }}>Enter the admin secret to view signups.</p>
            <form onSubmit={handleLogin}>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <input
                  type="password"
                  value={secretValue}
                  onChange={(e) => setSecretValue(e.target.value)}
                  placeholder="Admin secret"
                  autoComplete="off"
                  required
                  style={{ flex: 1, background: "#0a0a0b", border: "1px solid #3f3f46", borderRadius: 8, padding: "0.625rem 0.875rem", color: "#e4e4e7", fontSize: "0.875rem", outline: "none" }}
                />
                <button
                  type="submit"
                  disabled={loggingIn}
                  style={{ background: "#f59e0b", color: "#0a0a0b", border: "none", borderRadius: 8, padding: "0.625rem 1.25rem", fontSize: "0.875rem", fontWeight: 600, cursor: loggingIn ? "not-allowed" : "pointer", opacity: loggingIn ? 0.5 : 1, whiteSpace: "nowrap" }}
                >
                  View
                </button>
              </div>
              {loginError && (
                <div style={{ color: "#ef4444", fontSize: "0.8125rem", marginTop: "0.75rem" }}>{loginError}</div>
              )}
            </form>
          </div>
        )}

        {/* Dashboard */}
        {isLoggedIn && (
          <div style={{ width: "100%", maxWidth: 800, padding: "2rem 1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.25rem" }}>
              <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Waitlist Signups</h1>
              <button
                onClick={logout}
                style={{ background: "transparent", color: "#71717a", border: "none", fontSize: "0.8125rem", cursor: "pointer", padding: "0.375rem 0.75rem" }}
              >
                Log out
              </button>
            </div>
            <p style={{ color: "#71717a", fontSize: "0.875rem", marginBottom: "2rem" }}>seQRets email capture dashboard</p>

            {/* Stats */}
            <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
              <div style={{ background: "#18181b", border: "1px solid #27272a", borderRadius: 10, padding: "1rem 1.5rem", flex: 1, minWidth: 140 }}>
                <div style={{ color: "#71717a", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Total signups</div>
                <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "#f59e0b" }}>{entries.length}</div>
              </div>
              <div style={{ background: "#18181b", border: "1px solid #27272a", borderRadius: 10, padding: "1rem 1.5rem", flex: 1, minWidth: 140 }}>
                <div style={{ color: "#71717a", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Today</div>
                <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "#f59e0b" }}>{todayCount}</div>
              </div>
              <div style={{ background: "#18181b", border: "1px solid #27272a", borderRadius: 10, padding: "1rem 1.5rem", flex: 1, minWidth: 140 }}>
                <div style={{ color: "#71717a", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Top source</div>
                <div style={{ fontSize: "1rem", fontWeight: 700, color: "#f59e0b" }}>{topSource ? `${topSource[0]} (${topSource[1]})` : "—"}</div>
              </div>
            </div>

            {/* Toolbar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", gap: "0.75rem", flexWrap: "wrap" }}>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search emails..."
                style={{ maxWidth: 260, flex: 1, background: "#0a0a0b", border: "1px solid #3f3f46", borderRadius: 8, padding: "0.625rem 0.875rem", color: "#e4e4e7", fontSize: "0.875rem", outline: "none" }}
              />
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  onClick={() => fetchEntries(sessionToken)}
                  style={{ background: "#27272a", color: "#e4e4e7", border: "none", borderRadius: 8, padding: "0.625rem 1.25rem", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer" }}
                >
                  Refresh
                </button>
                <button
                  onClick={exportCsv}
                  style={{ background: "#27272a", color: "#e4e4e7", border: "none", borderRadius: 8, padding: "0.625rem 1.25rem", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer" }}
                >
                  Export CSV
                </button>
              </div>
            </div>

            {/* Table */}
            <table style={{ width: "100%", borderCollapse: "collapse", background: "#18181b", border: "1px solid #27272a", borderRadius: 10, overflow: "hidden" }}>
              <thead style={{ background: "#1f1f23" }}>
                <tr>
                  {["#", "Email", "Source", "Signed up", ""].map((h) => (
                    <th key={h} style={{ textAlign: "left", padding: "0.75rem 1rem", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "#71717a", fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center", padding: "3rem", color: "#71717a" }}>
                      {entries.length === 0 ? "No signups yet" : "No matches"}
                    </td>
                  </tr>
                ) : (
                  filtered.map((e, i) => (
                    <tr key={e.email} style={{ cursor: "default" }}
                      onMouseEnter={(ev) => { (ev.currentTarget as HTMLTableRowElement).style.background = "#1f1f23"; }}
                      onMouseLeave={(ev) => { (ev.currentTarget as HTMLTableRowElement).style.background = ""; }}
                    >
                      <td style={{ padding: "0.75rem 1rem", fontSize: "0.875rem", borderTop: "1px solid #27272a", color: "#71717a" }}>{i + 1}</td>
                      <td style={{ padding: "0.75rem 1rem", fontSize: "0.875rem", borderTop: "1px solid #27272a" }}>{e.email}</td>
                      <td style={{ padding: "0.75rem 1rem", fontSize: "0.875rem", borderTop: "1px solid #27272a" }}>
                        <span style={{ display: "inline-block", background: "#27272a", color: "#a1a1aa", fontSize: "0.75rem", padding: "0.125rem 0.5rem", borderRadius: 999 }}>{e.source}</span>
                      </td>
                      <td style={{ padding: "0.75rem 1rem", fontSize: "0.875rem", borderTop: "1px solid #27272a", color: "#a1a1aa" }}>
                        {e.signedUpAt
                          ? new Date(e.signedUpAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" })
                          : "—"}
                      </td>
                      <td style={{ padding: "0.75rem 1rem", fontSize: "0.875rem", borderTop: "1px solid #27272a" }}>
                        <button
                          onClick={() => { setDeleteEmail(e.email); setConfirmInput(""); }}
                          style={{ background: "transparent", color: "#71717a", padding: "0.25rem 0.5rem", fontSize: "0.75rem", borderRadius: 6, border: "1px solid transparent", cursor: "pointer" }}
                          onMouseEnter={(ev) => { const t = ev.currentTarget; t.style.color = "#ef4444"; t.style.borderColor = "#ef4444"; t.style.background = "rgba(239,68,68,0.1)"; }}
                          onMouseLeave={(ev) => { const t = ev.currentTarget; t.style.color = "#71717a"; t.style.borderColor = "transparent"; t.style.background = "transparent"; }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Delete confirmation modal */}
        {deleteEmail && (
          <div
            onClick={(e) => { if (e.target === e.currentTarget) { setDeleteEmail(""); setConfirmInput(""); } }}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <div style={{ background: "#18181b", border: "1px solid #27272a", borderRadius: 12, padding: "1.5rem", maxWidth: 420, width: "90%" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.5rem" }}>Confirm Deletion</h3>
              <p style={{ color: "#a1a1aa", fontSize: "0.8125rem", marginBottom: "1rem" }}>
                Type the email address to confirm:{" "}
                <span style={{ fontWeight: 600, color: "#ef4444", wordBreak: "break-all" }}>{deleteEmail}</span>
              </p>
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
                <input
                  ref={modalInputRef}
                  type="text"
                  value={confirmInput}
                  onChange={(e) => setConfirmInput(e.target.value)}
                  placeholder="Type email to confirm"
                  autoComplete="off"
                  style={{ flex: 1, background: "#0a0a0b", border: "1px solid #3f3f46", borderRadius: 8, padding: "0.625rem 0.875rem", color: "#e4e4e7", fontSize: "0.875rem", outline: "none" }}
                />
              </div>
              <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                <button
                  onClick={() => { setDeleteEmail(""); setConfirmInput(""); }}
                  style={{ background: "#27272a", color: "#e4e4e7", border: "none", borderRadius: 8, padding: "0.625rem 1.25rem", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={confirmInput.trim().toLowerCase() !== deleteEmail.toLowerCase() || deleting}
                  style={{
                    background: "#ef4444", color: "#fff", border: "none", borderRadius: 8, padding: "0.625rem 1.25rem", fontSize: "0.875rem", fontWeight: 600,
                    cursor: confirmInput.trim().toLowerCase() !== deleteEmail.toLowerCase() || deleting ? "not-allowed" : "pointer",
                    opacity: confirmInput.trim().toLowerCase() !== deleteEmail.toLowerCase() || deleting ? 0.4 : 1,
                  }}
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminPage;
