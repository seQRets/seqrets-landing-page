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
    slug: "zero-knowledge-proofs-mainstream-crypto-2026",
    title: "Zero Knowledge Goes Mainstream: Why 2026 Is ZKP's Breakout Year",
    date: "2026-04-04",
    category: "smart",
    excerpt:
      "Binance just published a landmark piece on how zero-knowledge proofs solve the privacy-compliance paradox. With privacy coins up over 800% and institutional ZK infrastructure exploding, the cryptographic technique powering seQRets is having its moment.",
    readTime: 6,
    content: `For years, zero-knowledge proofs lived in academic papers and niche cryptography forums. That era is over. In April 2026, Binance — the world's largest cryptocurrency exchange — published a deep-dive highlighting how ZKPs are becoming core infrastructure for the institutional crypto market. The framing was remarkable: not privacy versus compliance, but privacy and compliance, simultaneously, by mathematical necessity.

That shift in framing matters more than it might seem. The crypto industry has spent years caught in an apparent contradiction: regulators demand transparency, users demand privacy, and no one could find a way to give both sides what they wanted. Zero-knowledge proofs cut through this knot. A ZKP lets you prove that a statement is true — you're solvent, you're not sanctioned, your transaction is legitimate — without revealing anything else about yourself or your finances. The proof is the disclosure. Nothing more.

The market has noticed. Privacy-oriented cryptocurrencies surged dramatically in late 2025 and early 2026, with some protocols posting triple-digit gains as institutional money started flowing into privacy-preserving infrastructure. The ZK project market cap crossed $11.7 billion. Coinbase, Grayscale, and several sovereign wealth funds are now holding or building on ZK-based protocols. This is no longer a cypherpunk preference — it's becoming a fiduciary consideration.

The timing is significant because ZKPs are maturing in two directions at once. On the scaling side, ZK-rollups are allowing Ethereum and other chains to process thousands of transactions per second while posting compressed proofs to the base layer — inheriting its security without its bottlenecks. On the privacy side, ZK identity systems are letting users verify their credentials (age, accreditation status, tax residency) to counterparties and regulators without handing over their entire financial history. Both are now live in production at scale.

What's easy to miss in all of this is that zero-knowledge isn't just a feature bolted onto existing systems. It's an architectural principle: you should only ever have to reveal what's necessary to prove what you need to prove. Everything else stays private by design, not by policy. Policies get changed. Designs are auditable.

This is exactly the philosophy behind seQRets. When you split your Bitcoin seed phrase using Shamir's Secret Sharing, each share reveals provably nothing about your secret — not a hint, not a statistical signal, nothing. This isn't a trust assumption or an implementation promise. It's information-theoretic security: with fewer shares than the threshold, there are infinitely many valid secrets consistent with what you hold. The math itself is the privacy guarantee. No server, no policy, no terms of service required.

As ZKPs move from niche to mainstream, the underlying principle is becoming more legible to a broader audience: cryptographic guarantees are more trustworthy than institutional promises because they're enforced by mathematics, not intentions. You don't need to trust the custodian if the custodian mathematically cannot access your data. You don't need to trust the threshold signer if the share holder literally cannot reconstruct your secret alone.

We're in the early stages of an architectural shift across the entire financial system toward protocols that replace trust with proof. Zero-knowledge proofs are the leading edge of that shift. seQRets is built on the same foundation — the conviction that privacy isn't a preference to be traded away for convenience, but a property to be enforced by design.

The breakout year for ZKPs is also a good year to ask: does your Bitcoin security model rely on trust, or on proof?`,
  },
  {
    slug: "wrench-attacks-bitcoin-physical-security",
    title: "The $5 Wrench Problem: Why Physical Attacks on Bitcoin Holders Are Surging",
    date: "2026-03-29",
    category: "crypto",
    excerpt:
      "Physical 'wrench attacks' on crypto holders jumped 75% in 2025, with 72 confirmed incidents worldwide and losses exceeding $40 million. The uncomfortable truth: if you hold all your keys in one place, you are the vulnerability.",
    readTime: 6,
    content: `There's a well-known joke in security circles: no cryptographic algorithm can withstand a $5 wrench. You can have the best hardware wallet, the strongest passphrase, and air-gapped signing ceremonies — but if someone is willing to threaten you with physical harm, your security model has a gaping hole.

That joke stopped being funny in 2025. According to a report by CertiK, wrench attacks — physical assaults aimed at coercing crypto holders into surrendering their private keys — jumped 75% from the prior year, with 72 confirmed incidents worldwide. Losses exceeded $40 million. The attacks ranged from home invasions to kidnappings, and in some cases, murder. In the first two months of 2026 alone, researcher Jameson Lopp's public tracking database had already recorded eleven incidents globally.

Europe has become the epicenter. France leads with 19 documented attacks, with organized crime groups increasingly targeting known holders across France, Spain, and Sweden. The pattern is consistent: attackers identify high-net-worth crypto holders through social media, on-chain activity, or data leaks, then apply physical pressure to extract access.

This is the dark side of Bitcoin's transparency. The blockchain is public. If someone knows your wallet address, they can see exactly how much you hold. And with name-address data leaks from exchanges, centralized services, and tax databases, the gap between "someone knows your balance" and "someone knows where you live" is often smaller than people realize.

The self-custody community's default response has been operational security: don't talk about your holdings, use hardware wallets, avoid sharing addresses. That advice is sound, but it addresses only one part of the threat model. The deeper problem is architectural: most Bitcoin holders store their entire secret in one place, whether it's a hardware wallet in their desk, a seed phrase on a steel plate in their safe, or a passphrase memorized in their head. A determined attacker only needs to find and control one person — you — to access everything.

Shamir's Secret Sharing breaks this model entirely. With a threshold split, no single location, device, or person holds enough information to reconstruct your seed phrase. A 2-of-3 split means your Bitcoin requires cooperation from at least two independent sources. A 3-of-5 split distributes control even further. If you're the only share holder present, you genuinely cannot comply with a demand to produce the full secret. You don't have it. The attacker gains nothing by threatening you — not because you're brave, but because the math is on your side.

This property is sometimes called a "credible inability to comply," and it matters enormously in coercive scenarios. A smart adversary, once they understand the setup, has no incentive to keep applying pressure. There's nothing to extract.

seQRets is built on exactly this principle. You split your encrypted seed phrase into QR-encoded shares and distribute them to separate locations — different cities, different people, different jurisdictions. None of the individual custodians can reconstruct your secret alone. You travel light. You're not carrying your Bitcoin. You're carrying one piece of a puzzle that's only useful combined with pieces held elsewhere by people who aren't with you.

The rise of wrench attacks is a predictable consequence of Bitcoin's price appreciation and the growing visibility of self-custodians. As adoption grows, so does the target surface. The answer isn't to abandon self-custody — it's to redesign your setup so that you are no longer the single point of failure.

If your entire Bitcoin security depends on no one ever finding out where you live, you've already lost the security game before it starts.`,
  },
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
