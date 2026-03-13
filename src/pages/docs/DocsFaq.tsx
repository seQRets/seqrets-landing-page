import { Link } from "react-router-dom";
import DocsHead from "@/components/docs/DocsHead";
import FaqAccordion from "@/components/docs/FaqAccordion";

interface FaqCategory {
  heading: string;
  items: { q: string; a: string | React.ReactNode }[];
}

const FAQ_DATA: FaqCategory[] = [
  {
    heading: "General",
    items: [
      {
        q: "What is seQRets?",
        a: "seQRets is an open-source tool that encrypts secrets (like crypto seed phrases) with XChaCha20-Poly1305, splits them using Shamir's Secret Sharing into multiple shares, and outputs each share as a printable QR code called a Qard. No single Qard reveals any information about the original secret.",
      },
      {
        q: "Is seQRets free?",
        a: "The web app at app.seqrets.app is free and always will be. The Desktop App (Rust/Tauri) is a paid product that adds smart card support, inheritance planning, code signing, and native Rust cryptography.",
      },
      {
        q: "Is seQRets open source?",
        a: "Yes. The full source code is publicly available on GitHub under the AGPLv3 license. You can audit the encryption, the splitting logic, and every dependency.",
      },
      {
        q: "What secrets can I protect with seQRets?",
        a: "Any text-based secret: crypto seed phrases (BIP-39), private keys, passwords, recovery codes, API keys, or personal notes. The maximum input size is constrained by QR code capacity (approximately 2,953 bytes at the highest error correction level).",
      },
    ],
  },
  {
    heading: "Security",
    items: [
      {
        q: "What encryption does seQRets use?",
        a: "XChaCha20-Poly1305 for authenticated encryption (256-bit key, 192-bit nonce) and Argon2id for key derivation (64 MB memory cost, 4 iterations). These are the same primitives used in Signal, WireGuard, and libsodium.",
      },
      {
        q: "What is Shamir's Secret Sharing?",
        a: "A mathematically proven threshold scheme where a secret is split into N shares, and any K of those shares (the threshold) can reconstruct it. Fewer than K shares reveal zero information about the original — this is information-theoretic security, not computational. It is also quantum-resistant.",
      },
      {
        q: "Does seQRets phone home or collect telemetry?",
        a: "No. There are no analytics, no tracking pixels, no error reporting services. The app makes exactly one optional network call — to fetch the current Bitcoin price for display. Even that can be disabled by going offline.",
      },
      {
        q: "Is seQRets zero-knowledge?",
        a: "Yes, with two explicit caveats: (1) The Bob AI assistant optionally sends your question to Google's Gemini API if you provide your own API key. (2) The app optionally fetches the current BTC price. Neither of these transmits any secret data. All encryption, splitting, and QR generation happens locally with no server communication.",
      },
      {
        q: "Has seQRets been audited?",
        a: "Not yet by a third-party firm. The code is open source and uses well-audited cryptographic primitives (noble/ciphers, noble/hashes by Paul Miller for web; RustCrypto crates for desktop). A formal audit is on the roadmap. Independent review is encouraged — the codebase is intentionally small and readable.",
      },
      {
        q: "What cryptographic libraries does seQRets use?",
        a: "Web: @noble/ciphers and @noble/hashes by Paul Miller — audited, zero-dependency JavaScript implementations. Desktop: Native Rust crates — argon2, chacha20poly1305, and zeroize from the RustCrypto project.",
      },
    ],
  },
  {
    heading: "Inheritance",
    items: [
      {
        q: "How does inheritance planning work?",
        a: "You create a Shamir split with a threshold (e.g., 3-of-5), distribute shares to trusted people or locations, and provide instructions for how to reconstruct the secret. The Desktop App includes a dedicated Inheritance Plan builder that guides you through this process.",
      },
      {
        q: "Is the Inheritance Plan stored somewhere?",
        a: "No. The Inheritance Plan is encrypted and exported as a file or written to a JavaCard. seQRets does not store any copy. If you lose all copies of your encrypted plan, it cannot be recovered.",
      },
      {
        q: "Can seQRets recover my secret if I lose my shares?",
        a: "No. seQRets has no server, no account system, and no backup of your data. If you lose enough shares to fall below your chosen threshold, your secret is gone. This is by design — it means nobody else can recover it either.",
      },
    ],
  },
  {
    heading: "Desktop App",
    items: [
      {
        q: "What's the difference between the web app and desktop app?",
        a: "Both use the same encryption and splitting logic. The desktop app adds native Rust cryptography, memory zeroization (compiler-fence), browser extension immunity (Tauri WebView loads no extensions), code signing, and features like the Inheritance Plan builder and JavaCard smart card support.",
      },
      {
        q: "What platforms does the desktop app support?",
        a: "macOS, Windows, and Linux. The app is built with Tauri (Rust backend + web frontend) and ships as a code-signed binary with automatic delta updates.",
      },
      {
        q: "What happens if the seQRets website or app goes offline?",
        a: "The web app works fully offline once loaded. The desktop app has no network dependency at all. Even if the project disappeared entirely, anyone with the source code could reconstruct the recovery tool. The cryptographic standards used are open, well-documented, and implemented in dozens of other libraries.",
      },
    ],
  },
  {
    heading: "Smart Cards",
    items: [
      {
        q: "What kind of smart cards does seQRets use?",
        a: "JCOP-based Java Cards with a contact interface. The seQRets applet is pre-installed on branded cards sold in the shop. The desktop app communicates via a standard USB smart card reader.",
      },
      {
        q: "Can I use my own smart cards?",
        a: "Yes, if they are JCOP-compatible Java Cards that support the GlobalPlatform standard for applet installation. You would need to install the seQRets applet yourself using a GP-compatible tool.",
      },
      {
        q: "Smart card not detected — what should I do?",
        a: "Ensure the card is fully inserted in the reader (contact interface, not NFC). Check that the USB reader is recognized by your OS (it should appear as a CCID device). On Linux, you may need to install pcsclite. Try a different USB port. Restart the desktop app after connecting the reader.",
      },
    ],
  },
  {
    heading: "Troubleshooting",
    items: [
      {
        q: "QR code won't scan — what should I do?",
        a: "Ensure adequate lighting and contrast. If printing Qards, use a high-resolution printer (300 DPI minimum) on white paper. Avoid scaling the QR code below the recommended minimum size displayed in the app. Try different scanner apps — some handle high-density QR codes better than others.",
      },
      {
        q: "I forgot my password — can I recover my secret?",
        a: "No. The password is used to derive the encryption key via Argon2id. Without it, the encrypted data cannot be decrypted. There is no password reset, recovery email, or backdoor. This is by design.",
      },
      {
        q: "How do I verify the desktop app download?",
        a: "The desktop app binary is code-signed. On macOS, Gatekeeper verifies the signature automatically. On Windows, SmartScreen checks the Authenticode signature. You can also verify the SHA-256 hash of the downloaded file against the hash published on the GitHub release page.",
      },
      {
        q: "Where is my API key for Bob AI stored?",
        a: "Locally on your device only. It is never sent anywhere except directly to Google's Gemini API when you ask Bob a question. It is never included in any other request. You can remove it at any time from the settings.",
      },
    ],
  },
];

const DocsFaq = () => {
  const allQA = FAQ_DATA.flatMap((cat) => cat.items);

  const jsonLd = {
    "@type": "FAQPage",
    name: "seQRets FAQ",
    description: "Frequently asked questions about seQRets — seed phrase security, encryption, inheritance planning, smart cards, and troubleshooting.",
    mainEntity: allQA.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: {
        "@type": "Answer",
        text: typeof a === "string" ? a : "",
      },
    })),
  };

  return (
    <>
      <DocsHead
        title="FAQ"
        description="Frequently asked questions about seQRets — seed phrase security, encryption, inheritance, smart cards, and troubleshooting."
        path="/docs/faq"
        jsonLd={jsonLd}
      />

      <div className="mb-10">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-gradient-silver mb-4">
          FAQ
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-black text-foreground tracking-tight mb-4">
          Frequently Asked <span className="text-gradient">Questions</span>
        </h1>
        <p className="text-muted-foreground/80">
          Answers to common questions about seQRets. For a deeper security
          analysis, see the{" "}
          <Link to="/security" className="text-primary hover:underline">
            Security page
          </Link>
          .
        </p>
      </div>

      <div className="space-y-10">
        {FAQ_DATA.map((category) => (
          <section key={category.heading}>
            <h2 className="font-display text-lg font-bold text-foreground mb-4">
              {category.heading}
            </h2>
            <div className="space-y-2">
              {category.items.map(({ q, a }) => (
                <FaqAccordion key={q} question={q} answer={a} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
};

export default DocsFaq;
