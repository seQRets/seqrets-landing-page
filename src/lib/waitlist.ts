// Waitlist API helper
// Requires VITE_WAITLIST_API_URL env var pointing to the waitlist Worker

const WAITLIST_URL = import.meta.env.VITE_WAITLIST_API_URL;

export async function joinWaitlist(
  email: string,
  source: string,
): Promise<{ ok: boolean; error?: string }> {
  if (!WAITLIST_URL) {
    // Fallback: open mailto if Worker URL isn't configured yet
    window.location.href = `mailto:hello@seqrets.app?subject=${encodeURIComponent(
      "Waitlist Signup",
    )}&body=${encodeURIComponent(`Please add ${email} to the ${source} waitlist.`)}`;
    return { ok: true };
  }

  try {
    const res = await fetch(WAITLIST_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return { ok: false, error: (data as { error?: string }).error || "Something went wrong" };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: "Network error — please try again" };
  }
}
