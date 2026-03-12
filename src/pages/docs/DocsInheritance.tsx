import { Link } from "react-router-dom";
import DocsHead from "@/components/docs/DocsHead";

const STEPS = [
  {
    title: "Gather Prerequisites",
    description:
      "Before starting, ensure you have the necessary hardware and software.",
    items: [
      "seQRets Desktop App (recommended for smart card support and memory zeroization)",
      "Smart cards (1 per share you plan to write to a card)",
      "USB smart card reader",
      "Tamper-evident envelopes (optional — for physical distribution)",
      "Fireproof case (optional — for primary storage location)",
      "A trusted, malware-free device for the encryption process",
    ],
    outcome:
      "All hardware in hand, desktop app installed and verified.",
  },
  {
    title: "Plan Your Threshold",
    description:
      "Choose how many total shares (N) and how many are needed to reconstruct (K).",
    items: [
      "2-of-3: Simple setup for small families. Any 2 of 3 shares can reconstruct. Lowest redundancy.",
      "3-of-5: Recommended for most inheritance plans. Tolerates loss of 2 shares. Good balance of security and recoverability.",
      "4-of-7: High-security setup for large families or institutional use. Tolerates loss of 3 shares.",
      "Rule of thumb: set K high enough that a single compromised party can't reconstruct, but low enough that shares can realistically be gathered after your death.",
    ],
    outcome:
      "A threshold (K-of-N) chosen based on your trust model and family structure.",
  },
  {
    title: "Create and Encrypt Your Shares",
    description:
      "Open seQRets, enter your secret, set a strong password, and configure the Shamir split.",
    items: [
      "Enter your seed phrase or secret into seQRets",
      "Set a strong, unique password (this derives the encryption key via Argon2id)",
      "Configure the threshold: select K (minimum shares to reconstruct) and N (total shares)",
      "Generate the shares — seQRets encrypts with XChaCha20-Poly1305, splits with Shamir's SSS, and outputs QR codes (Qards)",
      "Optionally write shares to smart cards using the card writer in the desktop app",
      "The secret is destroyed from memory after generation (Rust zeroization in desktop)",
    ],
    outcome:
      "N Qards (QR codes) and/or smart cards, each containing one share. The original secret exists nowhere.",
  },
  {
    title: "Distribute Shares",
    description:
      "Physically separate your shares across locations and trusted people.",
    items: [
      "Never store K or more shares in the same location",
      "Use tamper-evident envelopes so you'll know if a share has been accessed",
      "Consider geographic distribution: different cities, safe deposit boxes, trusted family members",
      "Label shares clearly (e.g., 'Share 1 of 5') but do NOT include the password or threshold info on the share itself",
      "Store at least one share in a fireproof case",
      "Consider giving shares to people who don't know each other — this prevents collusion",
    ],
    outcome:
      "Shares physically distributed across multiple locations and/or trusted holders.",
  },
  {
    title: "Prepare Instructions for Beneficiaries",
    description:
      "Your heirs need to know what to do — without knowing the secret itself.",
    items: [
      "Write a letter of instruction: what seQRets is, where to download it, and that K shares are needed",
      "Do NOT include the password in the same communication channel as the shares",
      "Consider: password in a sealed envelope with your attorney, shares with family members",
      "Include the seQRets website URL and GitHub repo URL so the tool can be found even if the website is down",
      "Use the Inheritance Guide (PDF) from the shop as a template for your letter",
      "Store a copy of the instructions with each share holder",
    ],
    outcome:
      "Each beneficiary knows what to do and where to get help, but cannot act alone.",
  },
  {
    title: "Test Recovery",
    description:
      "Verify the entire process works before you depend on it.",
    items: [
      "Gather K shares from your distributed locations",
      "Open seQRets and scan/import the shares",
      "Enter your password to decrypt",
      "Verify the reconstructed secret matches the original",
      "Re-distribute the shares to their original locations",
      "Do this test at least once — do not skip this step",
    ],
    outcome:
      "Confirmed: your inheritance plan works end-to-end. The secret was successfully reconstructed.",
  },
  {
    title: "Maintain Your Plan",
    description:
      "An inheritance plan is not set-and-forget. Periodically review and update.",
    items: [
      "Check share condition annually — QR codes can fade, envelopes can degrade",
      "Update your plan when circumstances change: births, deaths, divorces, moves",
      "If a share is compromised, regenerate all shares with a new password and redistribute",
      "Verify that your letter of instruction is still accurate and findable",
      "Consider rotating the password periodically (requires regenerating all shares)",
    ],
    outcome:
      "An up-to-date, tested plan that will work when needed.",
  },
  {
    title: "Legal Considerations",
    description:
      "How your inheritance plan interacts with the legal system.",
    items: [
      "This is NOT legal advice — consult an attorney in your jurisdiction",
      "Consider adding a reference to your crypto inheritance plan in your will or trust",
      "A letter of instruction (separate from the will) can provide operational details without making them part of the public probate record",
      "Some jurisdictions have specific laws around digital asset inheritance — research yours",
      "Your executor or trustee should know that a crypto inheritance plan exists, even if they don't hold shares",
      "Consider a digital asset clause in your estate plan",
    ],
    outcome:
      "Your legal documents reference the existence of the plan, ensuring your heirs know to look for it.",
  },
];

const DocsInheritance = () => {
  const jsonLd = {
    "@type": "HowTo",
    name: "How to Set Up Crypto Inheritance with seQRets",
    description:
      "Step-by-step guide for creating a Shamir's Secret Sharing-based inheritance plan for crypto seed phrases using seQRets.",
    totalTime: "PT2H",
    tool: [
      { "@type": "HowToTool", name: "seQRets Desktop App" },
      { "@type": "HowToTool", name: "USB Smart Card Reader" },
    ],
    supply: [
      { "@type": "HowToSupply", name: "JCOP Smart Cards" },
      { "@type": "HowToSupply", name: "Tamper-Evident Envelopes" },
      { "@type": "HowToSupply", name: "Fireproof Case" },
    ],
    step: STEPS.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.title,
      text: step.description,
    })),
  };

  return (
    <>
      <DocsHead
        title="Inheritance Guide"
        description="Step-by-step guide for setting up crypto seed phrase inheritance using Shamir's Secret Sharing with seQRets."
        path="/docs/inheritance"
        jsonLd={jsonLd}
      />

      <div className="mb-10">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-gradient-silver mb-4">
          Inheritance Guide
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-black text-foreground tracking-tight mb-4">
          Crypto <span className="text-gradient">Inheritance Planning</span>
        </h1>
        <p className="text-muted-foreground/80">
          A step-by-step guide for distributing your crypto seed phrase to
          trusted people and locations using Shamir's Secret Sharing. Designed
          to be followed by humans or by AI agents assisting with setup.
        </p>
      </div>

      <div className="space-y-6">
        {STEPS.map((step, i) => (
          <section
            key={step.title}
            className="rounded-2xl border border-border/30 bg-card/20 p-6"
          >
            <div className="flex items-start gap-4 mb-4">
              <span className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary text-sm font-bold shrink-0">
                {i + 1}
              </span>
              <div>
                <h2 className="font-display text-lg font-bold text-foreground">
                  {step.title}
                </h2>
                <p className="text-sm text-muted-foreground/80 mt-1">
                  {step.description}
                </p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground/80 ml-12 mb-4">
              {step.items.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-primary mt-0.5 shrink-0">&#8226;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="ml-12 rounded-xl bg-primary/5 border border-primary/10 px-4 py-3">
              <p className="text-xs text-muted-foreground/60 uppercase tracking-wider mb-1">
                Expected Outcome
              </p>
              <p className="text-sm text-foreground/80">{step.outcome}</p>
            </div>
          </section>
        ))}
      </div>

      {/* Shop CTA */}
      <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center">
        <h3 className="font-display text-xl font-bold text-foreground mb-2">
          Need the hardware?
        </h3>
        <p className="text-sm text-muted-foreground/80 mb-6">
          The Inheritance Bundle includes everything listed in Step 1 — smart
          cards, reader, envelopes, fireproof case, and the printed guide.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90"
        >
          Browse the Shop &rarr;
        </Link>
      </div>
    </>
  );
};

export default DocsInheritance;
