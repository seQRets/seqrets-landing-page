import { useEffect } from "react";
import { Monitor, Shield, Package, CreditCard, BookOpen, Flame, Lock, Mail, Store } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import navbarIcon from "@/assets/navbar-icon.png";
import heroLogo from "@/assets/hero-logo.png";

interface Product {
  name: string;
  description: string;
  price: string;
  badge?: string;
  icon: React.ElementType;
  features: string[];
  highlight?: boolean;
}

const bundles: Product[] = [
  {
    name: "Desktop App",
    description: "Code-signed, auto-updating binary with NFC smart card support. macOS, Windows & Linux.",
    price: "$49",
    icon: Monitor,
    features: [
      "Code-signed binary",
      "Automatic delta updates",
      "NFC smart card integration",
      "All desktop platforms",
    ],
  },
  {
    name: "Backup Bundle",
    description: "Everything you need to back up your secrets to a physical smart card with a portable reader.",
    price: "$89",
    badge: "Popular",
    icon: Shield,
    features: [
      "Desktop App license",
      "1× branded smart card",
      "1× portable USB card reader",
      "Quick-start guide",
    ],
    highlight: true,
  },
  {
    name: "Inheritance Bundle",
    description: "A complete inheritance kit — distribute secret shares across multiple cards with tamper-proof packaging.",
    price: "$179",
    badge: "Best Value",
    icon: Package,
    features: [
      "Desktop App license",
      "3–5× smart cards",
      "1× portable USB card reader",
      "PDF inheritance guide",
      "Tamper-evident envelopes",
      "Fireproof storage case",
    ],
  },
];

const accessories: Product[] = [
  {
    name: "Smart Card",
    description: "JCOP-based NFC smart card, branded with the seQRets logo.",
    price: "$12",
    icon: CreditCard,
    features: ["NFC & contact interface", "JCOP applet compatible"],
  },
  {
    name: "USB Card Reader",
    description: "Compact, portable USB smart card reader. Plug-and-play on all platforms.",
    price: "$19",
    icon: Monitor,
    features: ["USB-A connector", "macOS / Windows / Linux"],
  },
  {
    name: "Tamper-Evident Envelopes",
    description: "Pack of 5 security envelopes that reveal any opening attempt.",
    price: "$9",
    icon: Lock,
    features: ["5-pack", "Void pattern on tamper"],
  },
  {
    name: "Fireproof Case",
    description: "Compact fireproof document & card case rated to 1,200 °F for 30 minutes.",
    price: "$39",
    icon: Flame,
    features: ["Fits cards & documents", "1,200 °F / 30 min rated"],
  },
  {
    name: "Inheritance Guide (PDF)",
    description: "Step-by-step guide for setting up a dead man's switch and distributing shares to heirs.",
    price: "$15",
    icon: BookOpen,
    features: ["Printable PDF", "Legal considerations checklist"],
  },
];

const ProductCard = ({ product }: { product: Product }) => (
  <div
    className={`relative flex flex-col rounded-xl border p-6 transition-all hover:glow-border ${
      product.highlight
        ? "border-primary/40 bg-warm-surface"
        : "border-border/50 bg-card/30"
    }`}
  >
    {product.badge && (
      <Badge className="absolute -top-2.5 right-4 font-display text-xs">
        {product.badge}
      </Badge>
    )}
    <div className="mb-4 flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
        <product.icon className="h-5 w-5 text-primary" />
      </div>
      <h3 className="font-display text-lg font-bold text-foreground">{product.name}</h3>
    </div>
    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
    <ul className="mb-6 flex-1 space-y-2">
      {product.features.map((f) => (
        <li key={f} className="flex items-start gap-2 text-sm text-foreground/80">
          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          {f}
        </li>
      ))}
    </ul>
    <div className="mt-auto flex items-center justify-between">
      <span className="font-display text-2xl font-bold text-foreground">{product.price}</span>
      <Button size="sm" className="font-display font-semibold" disabled>
        Coming Soon
      </Button>
    </div>
  </div>
);

const Shop = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
          <Link to="/" className="flex items-center gap-3">
            <img src={navbarIcon} alt="seQRets" className="h-9 w-auto rounded-md" />
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            <Link to="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Home
            </Link>
            <Button size="sm" className="font-display font-semibold" disabled>
              <Mail className="mr-1.5 h-3.5 w-3.5" />
              Join Waitlist
            </Button>
          </div>
        </div>
      </nav>

      <main>
        {/* Coming Soon Banner */}
        <div className="pt-16">
          <div className="flex items-center justify-center gap-2 bg-primary/10 border-b border-primary/20 px-4 py-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="font-display text-sm font-semibold text-primary">Shop Coming Soon — Join the waitlist to get notified</span>
          </div>
        </div>

        {/* Hero */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          {/* Background glow effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-primary/5 blur-[100px]" />
            <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-warm-muted/5 blur-[80px]" />
          </div>
          <div className="container relative mx-auto px-4 md:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
                <Store className="h-7 w-7 text-primary" />
              </div>
              <h1 className="font-display text-4xl font-black md:text-5xl text-foreground mb-5">
                The seQRets Shop
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
                Hardware, software, and kits to protect your secrets — from everyday backups to generational inheritance.
              </p>
            </div>
          </div>
        </section>

        {/* Bundles */}
        <section className="py-16 bg-section-warm">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="font-display text-3xl font-bold text-foreground mb-2">Bundles</h2>
            <p className="text-muted-foreground mb-10">Pick a tier that fits your threat model.</p>
            <div className="grid gap-6 md:grid-cols-3">
              {bundles.map((p) => (
                <ProductCard key={p.name} product={p} />
              ))}
            </div>
          </div>
        </section>

        {/* Individual Items */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="font-display text-3xl font-bold text-foreground mb-2">Individual Items</h2>
            <p className="text-muted-foreground mb-10">Already have some gear? Grab exactly what you need.</p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {accessories.map((p) => (
                <ProductCard key={p.name} product={p} />
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-20 bg-section-warm">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Want to know when the shop opens?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Join the waitlist and be the first to grab a bundle at launch-day pricing.
            </p>
            <Button size="lg" className="font-display font-semibold px-8" disabled>
              <Mail className="mr-2 h-4 w-4" />
              Join the Waitlist
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4 md:px-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} seQRets · Open-source under AGPLv3
        </div>
      </footer>
    </div>
  );
};

export default Shop;
