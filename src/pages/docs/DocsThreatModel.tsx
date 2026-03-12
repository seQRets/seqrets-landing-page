import { Link } from "react-router-dom";
import DocsHead from "@/components/docs/DocsHead";

const DocsThreatModel = () => {
  const jsonLd = {
    "@type": "TechArticle",
    name: "seQRets Threat Model",
    description:
      "What seQRets protects against, what it doesn't, assumptions, known limitations, and comparison to alternative seed phrase storage methods.",
    proficiencyLevel: "Expert",
    about: { "@type": "Thing", name: "Threat Modeling" },
  };

  return (
    <>
      <DocsHead
        title="Threat Model"
        description="What seQRets protects against, honest limitations, assumptions, and comparison to alternative seed phrase backup methods."
        path="/docs/threat-model"
        jsonLd={jsonLd}
      />

      <div className="mb-10">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-gradient-silver mb-4">
          Threat Model
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-black text-foreground tracking-tight mb-4">
          Honest <span className="text-gradient">Threat Analysis</span>
        </h1>
        <p className="text-muted-foreground/80">
          What seQRets protects against, what it doesn't, and the assumptions
          the security model depends on. For the narrative discussion, see the{" "}
          <Link to="/security" className="text-primary hover:underline">
            Security page
          </Link>
          .
        </p>
      </div>

      <div className="space-y-12">
        {/* Protected against */}
        <section>
          <h2 className="font-display text-xl font-bold text-foreground mb-4">
            What seQRets Protects Against
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-border/30">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/30 bg-card/30">
                  <th className="text-left p-4 font-display font-bold text-foreground">
                    Threat
                  </th>
                  <th className="text-left p-4 font-display font-bold text-foreground">
                    How Protected
                  </th>
                  <th className="text-left p-4 font-display font-bold text-foreground">
                    Confidence
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                {[
                  [
                    "Physical theft of a single share",
                    "Shamir's SSS — one share reveals zero information about the secret",
                    "High",
                  ],
                  [
                    "Fire, flood, or natural disaster",
                    "Shares distributed across multiple geographic locations; fireproof case available",
                    "High",
                  ],
                  [
                    "Password manager breach",
                    "Secret is never stored in a password manager; protected by independent encryption + splitting",
                    "High",
                  ],
                  [
                    "Cloud provider compromise",
                    "Nothing is stored in the cloud; no accounts, no sync, no server",
                    "High",
                  ],
                  [
                    "Brute-force password attack",
                    "Argon2id KDF with 64 MB memory cost makes GPU/ASIC attacks prohibitively expensive",
                    "High",
                  ],
                  [
                    "Malicious browser extensions (Desktop)",
                    "Tauri WebView loads no extensions; isolated execution environment",
                    "High",
                  ],
                  [
                    "Supply-chain JS attack (Desktop)",
                    "Code bundled and signed at build time; no CDN dependency at runtime",
                    "High",
                  ],
                  [
                    "Single point of failure",
                    "Threshold splitting means no single entity, location, or device holds the full secret",
                    "High",
                  ],
                ].map(([threat, how, confidence]) => (
                  <tr
                    key={threat}
                    className="hover:bg-card/20 transition-colors"
                  >
                    <td className="p-4 font-medium text-foreground">
                      {threat}
                    </td>
                    <td className="p-4 text-muted-foreground/80">{how}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-400">
                        {confidence}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* NOT protected against */}
        <section>
          <h2 className="font-display text-xl font-bold text-foreground mb-4">
            What seQRets Does NOT Protect Against
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-border/30">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/30 bg-card/30">
                  <th className="text-left p-4 font-display font-bold text-foreground">
                    Threat
                  </th>
                  <th className="text-left p-4 font-display font-bold text-foreground">
                    Why Not
                  </th>
                  <th className="text-left p-4 font-display font-bold text-foreground">
                    Mitigation
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                {[
                  [
                    "Compromised device at encryption time",
                    "The secret must briefly exist in memory during encryption. Active malware with memory-reading capability could intercept it.",
                    "Use a trusted, malware-free device. Desktop app zeroes memory with compiler-fence.",
                  ],
                  [
                    "Lost threshold of shares",
                    "If you lose K or more shares (where K is your threshold), the secret cannot be reconstructed. There is no recovery mechanism.",
                    "Choose a conservative threshold (e.g., 3-of-5). Store shares in geographically separate, secure locations.",
                  ],
                  [
                    "Forgotten password",
                    "The password derives the encryption key. No password = no decryption. There is no reset or recovery.",
                    "Use a strong, memorable password. Consider storing a password hint separately from shares.",
                  ],
                  [
                    "Physical coercion (rubber-hose attack)",
                    "If an attacker forces you to reveal your password and produce enough shares, the secret is compromised.",
                    "Distribute shares to trusted third parties who cannot be coerced simultaneously.",
                  ],
                  [
                    "Quantum attack on XChaCha20",
                    "XChaCha20's 256-bit key provides ~128-bit security against Grover's algorithm. Shamir's SSS is fully quantum-resistant.",
                    "128-bit post-quantum security is still beyond current projections. Migration path available if needed.",
                  ],
                  [
                    "Malicious browser extensions (Web app)",
                    "Extensions can read DOM, intercept clipboard, and log keystrokes in the browser context.",
                    "Use the Desktop app for high-value secrets. Or use a dedicated browser profile with no extensions.",
                  ],
                  [
                    "JavaScript memory persistence (Web app)",
                    "JavaScript's garbage collector does not guarantee when or if memory is zeroed. Immutable strings cannot be overwritten.",
                    "Use the Desktop app (Rust zeroization). The web app mitigates by minimizing secret lifetime in memory.",
                  ],
                ].map(([threat, why, mitigation]) => (
                  <tr
                    key={threat}
                    className="hover:bg-card/20 transition-colors"
                  >
                    <td className="p-4 font-medium text-foreground">
                      {threat}
                    </td>
                    <td className="p-4 text-muted-foreground/80">{why}</td>
                    <td className="p-4 text-muted-foreground/80">
                      {mitigation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Assumptions */}
        <section>
          <h2 className="font-display text-xl font-bold text-foreground mb-4">
            Security Assumptions
          </h2>
          <div className="rounded-2xl border border-border/30 bg-card/20 p-6">
            <p className="text-sm text-muted-foreground/80 mb-4">
              The seQRets security model holds when the following assumptions
              are true:
            </p>
            <ol className="space-y-3 text-sm text-muted-foreground/80 list-decimal list-inside">
              <li>
                <strong className="text-foreground">
                  The device is not compromised
                </strong>{" "}
                at the moment of encryption/decryption. No active keylogger,
                screen capture, or memory-reading malware is running.
              </li>
              <li>
                <strong className="text-foreground">
                  The password is strong
                </strong>{" "}
                and not reused from other services. Argon2id makes brute-force
                expensive, but a weak password still weakens the system.
              </li>
              <li>
                <strong className="text-foreground">
                  Shares are stored securely
                </strong>{" "}
                in separate locations. The threshold model only works if an
                attacker cannot access K shares.
              </li>
              <li>
                <strong className="text-foreground">
                  The cryptographic primitives are secure.
                </strong>{" "}
                XChaCha20-Poly1305 and Argon2id are well-studied and
                widely deployed. A break in either would affect the broader
                security ecosystem, not just seQRets.
              </li>
              <li>
                <strong className="text-foreground">
                  The source code matches the running binary.
                </strong>{" "}
                For the desktop app, code signing provides this guarantee. For
                the web app, this depends on the hosting infrastructure.
              </li>
            </ol>
          </div>
        </section>

        {/* Comparison to alternatives */}
        <section>
          <h2 className="font-display text-xl font-bold text-foreground mb-4">
            Comparison to Alternatives
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-border/30">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/30 bg-card/30">
                  <th className="text-left p-4 font-display font-bold text-foreground">
                    Method
                  </th>
                  <th className="text-left p-4 font-display font-bold text-foreground">
                    Single Point of Failure
                  </th>
                  <th className="text-left p-4 font-display font-bold text-foreground">
                    Fire/Flood Risk
                  </th>
                  <th className="text-left p-4 font-display font-bold text-foreground">
                    Theft Risk
                  </th>
                  <th className="text-left p-4 font-display font-bold text-foreground">
                    Inheritance Ready
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                {[
                  ["Paper backup", "Yes", "High", "High", "No"],
                  ["Metal seed plate", "Yes", "Low", "High", "No"],
                  [
                    "Password manager",
                    "Yes (vendor)",
                    "Low",
                    "Medium (breach)",
                    "Depends",
                  ],
                  [
                    "Hardware wallet seed",
                    "Yes",
                    "High (paper backup)",
                    "High (paper backup)",
                    "No",
                  ],
                  [
                    "seQRets (Shamir split)",
                    "No (threshold)",
                    "Low (distributed)",
                    "Low (per share)",
                    "Yes",
                  ],
                ].map(([method, spof, fire, theft, inherit]) => (
                  <tr
                    key={method}
                    className="hover:bg-card/20 transition-colors"
                  >
                    <td className="p-4 font-medium text-foreground">
                      {method}
                    </td>
                    <td className="p-4 text-muted-foreground/80">{spof}</td>
                    <td className="p-4 text-muted-foreground/80">{fire}</td>
                    <td className="p-4 text-muted-foreground/80">{theft}</td>
                    <td className="p-4 text-muted-foreground/80">{inherit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Known limitations */}
        <section>
          <h2 className="font-display text-xl font-bold text-foreground mb-4">
            Known Limitations
          </h2>
          <div className="rounded-2xl border border-border/30 bg-card/20 p-6 space-y-3">
            {[
              {
                label: "No third-party audit yet",
                detail:
                  "The code is open source and uses audited primitives, but seQRets itself has not undergone a formal third-party security audit. This is on the roadmap.",
              },
              {
                label: "Web app browser risks",
                detail:
                  "Browser extensions, JavaScript supply-chain attacks, and unpredictable garbage collection are inherent risks of running in a browser. The desktop app eliminates these.",
              },
              {
                label: "JavaScript memory model",
                detail:
                  "In the web app, JavaScript strings are immutable and cannot be explicitly zeroed. The GC will eventually reclaim the memory, but timing is unpredictable. The desktop app uses Rust's zeroize crate with compiler-fence.",
              },
              {
                label: "QR code durability",
                detail:
                  "Printed QR codes can fade, get damaged, or become unreadable over time. Use high-quality printing, protective sleeves, or write shares to smart cards for long-term storage.",
              },
            ].map(({ label, detail }) => (
              <div key={label}>
                <p className="text-sm font-medium text-foreground">{label}</p>
                <p className="text-sm text-muted-foreground/70">{detail}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default DocsThreatModel;
