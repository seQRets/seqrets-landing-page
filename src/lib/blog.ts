export type BlogCategory = "crypto" | "smart" | "inherit" | "ai";

export interface BlogPost {
  slug: string;
  title: string;
  date: string; // ISO date string
  category: BlogCategory;
  excerpt: string;
  readTime: number; // minutes
  content: string; // rendered as paragraphs (split on \n\n)
}

export const categoryLabels: Record<BlogCategory, string> = {
  crypto: "Security",
  smart: "Technology",
  inherit: "Inheritance",
  ai: "AI & Privacy",
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "hong-kong-decryption-law-bitcoin-travelers",
    title: "Hong Kong's New Decryption Law Is a Wake-Up Call for Bitcoin Holders",
    date: "2026-03-28",
    category: "crypto",
    excerpt:
      "As of March 23, 2026, authorities in Hong Kong can legally compel anyone — including tourists — to unlock devices and hand over passwords. If your seed phrase is on a hardware wallet you're carrying, you may have no legal right to refuse.",
    readTime: 5,
    content: `On March 23, 2026, Hong Kong quietly expanded its national security powers to include the right to compel anyone physically present in the territory — residents, tourists, and even airport transit passengers — to unlock electronic devices, hand over passwords, and assist with decryption. Refusal is now a criminal offense, carrying up to one year in prison and a fine of HK$100,000. Providing false information bumps that to three years.

This isn't hypothetical. Crypto hardware wallets are electronic devices. If you're carrying a Coldcard, a Ledger, or any hardware signer through Hong Kong International Airport, you may be required to unlock it on demand. A hardware wallet's entire security model is built around keeping the keys inside — but that model assumes you are never legally compelled to hand them over.

The broader point isn't specific to Hong Kong. Jurisdictions around the world have passed or are considering similar "compelled decryption" provisions. The UK's Regulation of Investigatory Powers Act has had this capability since 2000. Australia, Canada, and the EU all have varying forms of it. The trend is clear: governments are increasingly asserting the right to access encrypted data on devices they physically control.

This creates a fundamental problem for Bitcoin self-custody. If your entire seed phrase — all 12 or 24 words — is accessible from a single device or a single location, then any situation where you're compelled to unlock that device (a border crossing, a security check, a theft) becomes a catastrophic exposure event.

Shamir's Secret Sharing changes this calculus entirely. With a 3-of-5 split, no single share reveals anything about your seed phrase. Even if a border agent forces you to hand over the one QR code in your bag, they have nothing — mathematically, provably nothing. Two shares are consistent with every possible secret. The only way to reconstruct your seed phrase is to have the threshold number of shares together, in the same place, at the same time.

seQRets is built on exactly this principle. Your encrypted seed phrase is split into shares that you store separately — different locations, different jurisdictions, different people. You travel light. You carry nothing that, on its own, can harm you.

The Hong Kong law isn't a reason to panic. It's a reason to rethink how you hold your Bitcoin. A single point of failure — whether it's a hardware wallet in your carry-on or a paper backup in your safe — is a vulnerability. The solution isn't to stop traveling or stop holding Bitcoin. It's to stop holding your entire secret in one place.`,
  },
  {
    slug: "why-seed-phrase-security-matters",
    title: "Why Seed Phrase Security Matters More Than Ever",
    date: "2026-03-13",
    category: "crypto",
    excerpt:
      "Your 12 or 24-word seed phrase is the master key to your Bitcoin. If someone gets it, your funds are gone — no reversals, no customer support. Here's why securing it properly is non-negotiable.",
    readTime: 5,
    content: `Your Bitcoin seed phrase is, quite literally, your money. Those 12 or 24 words derived from the BIP-39 standard are the master key to every address in your wallet. Lose them, and your Bitcoin is gone forever. Expose them, and someone else owns your coins.

Most people know this in theory. In practice, the majority of self-custodians still write their seed phrase on a piece of paper and stash it in a drawer — or worse, screenshot it on their phone. A single house fire, a curious roommate, or a compromised iCloud backup is all it takes.

The fundamental problem is that a seed phrase is an all-or-nothing secret. Anyone who sees all 12 words has full access. Traditional backup methods don't address this: a safe deposit box is a single point of failure, and giving a copy to a trusted friend means trusting them completely.

This is exactly the problem Shamir's Secret Sharing was designed to solve. Instead of keeping one copy of your seed phrase, you split it into multiple shares — say, 3-of-5. Any three shares can reconstruct the original, but two shares reveal absolutely nothing. It's mathematically provable, not just a promise.

seQRets takes this approach and makes it accessible. Encrypt your seed phrase, split it into shares, and encode each share as a QR code. Print them, store them in different locations, and sleep soundly knowing that no single point of failure can compromise your Bitcoin.

The question isn't whether you need better seed phrase security. The question is whether you'll act before it's too late.`,
  },
  {
    slug: "shamirs-secret-sharing-explained",
    title: "Shamir's Secret Sharing: The Math Behind seQRets",
    date: "2026-03-10",
    category: "smart",
    excerpt:
      "A deep dive into the cryptographic technique that powers seQRets — how polynomial interpolation lets you split a secret into shares where any threshold can reconstruct it, but fewer reveal nothing.",
    readTime: 7,
    content: `In 1979, Adi Shamir — the 'S' in RSA — published a beautifully simple paper that solved a problem cryptographers had been wrestling with: how do you share a secret among a group so that only a sufficient subset can reconstruct it?

The answer is polynomial interpolation. Here's the intuition: a straight line (degree 1 polynomial) is defined by any 2 points. A parabola (degree 2) needs 3 points. A degree-k polynomial needs k+1 points. If you know fewer points than required, you have infinitely many polynomials that fit — meaning you know nothing about the secret.

To create a 3-of-5 sharing scheme, seQRets generates a random degree-2 polynomial where the constant term is your secret. It then evaluates this polynomial at 5 different points — these are your shares. Any 3 shares give you 3 points, which uniquely determine the degree-2 polynomial, letting you recover the constant term (your secret). But 2 shares? They're consistent with every possible secret. That's information-theoretic security — not just computationally hard to break, but mathematically impossible.

What makes this particularly elegant for seed phrase security is that each share is the same size as the original secret. There's no bloat, no overhead. A share encoded as a QR code is compact enough to print on a business card.

seQRets implements this over GF(256) — a finite field that maps perfectly to byte-level operations. Every byte of your encrypted seed phrase is split independently, which means the scheme is both efficient and easy to verify. The source code is open for anyone to audit.

The beauty of Shamir's scheme is that it gives you configurable trust. You decide the threshold. 2-of-3 for personal use. 3-of-5 for family distribution. 4-of-7 for corporate treasury. The math doesn't care — it just works.`,
  },
  {
    slug: "crypto-inheritance-planning",
    title: "Don't Let Your Bitcoin Die With You",
    date: "2026-03-06",
    category: "inherit",
    excerpt:
      "Billions in Bitcoin are lost because holders didn't plan for the unexpected. Inheritance planning for crypto isn't optional — it's a responsibility. Here's how to do it right.",
    readTime: 6,
    content: `An estimated 3 to 4 million Bitcoin are permanently lost. Some of those belong to people who are no longer alive — people who took self-custody seriously but never made a plan for what happens next.

This is the dark side of "be your own bank." When you remove intermediaries, you also remove the safety nets. There's no bank to call, no probate court that can reset a private key. If your family doesn't know how to access your crypto — or even that it exists — it may as well not exist.

The challenge is that crypto inheritance sits at an uncomfortable intersection. You need your secrets to be accessible after you're gone, but completely secure while you're alive. Traditional estate planning tools (wills, trusts, lawyers) weren't designed for bearer assets that exist as pure information.

This is where threshold-based secret sharing becomes invaluable. With a 3-of-5 Shamir split, you can distribute shares to your spouse, your attorney, a safety deposit box, a trusted friend, and a sealed envelope in your home safe. No single party can access your Bitcoin, but any three working together can.

seQRets' inheritance planning feature (available in the Desktop app) guides you through this process step by step. It helps you choose an appropriate threshold, generate labeled shares, and create documentation that your heirs can actually follow — without exposing them to your secrets prematurely.

The conversation with your family doesn't have to include private keys. It just needs to include: "I own Bitcoin, here's where to find the instructions, and here are the people who hold the shares." That's it. The math handles the rest.

If you hold any meaningful amount of Bitcoin, inheritance planning isn't a nice-to-have. It's a responsibility to the people you'd leave behind.`,
  },
];

/** Get a single post by slug */
export const getPostBySlug = (slug: string): BlogPost | undefined =>
  BLOG_POSTS.find((p) => p.slug === slug);
