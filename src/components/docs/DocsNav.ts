import {
  BookOpen,
  Shield,
  Users,
  AlertTriangle,
  Package,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";

export interface DocsNavItem {
  label: string;
  path: string; // relative to /docs — "" for hub
  icon: LucideIcon;
  description: string;
}

export const DOCS_NAV: DocsNavItem[] = [
  {
    label: "Documentation",
    path: "",
    icon: BookOpen,
    description: "Overview, quick links, and key technical facts",
  },
  {
    label: "Technical Overview",
    path: "technical",
    icon: Shield,
    description:
      "Cryptographic primitives, architecture, key sizes, and algorithms",
  },
  {
    label: "Inheritance Guide",
    path: "inheritance",
    icon: Users,
    description: "Step-by-step inheritance planning with Shamir splits",
  },
  {
    label: "Threat Model",
    path: "threat-model",
    icon: AlertTriangle,
    description:
      "What seQRets protects against, what it doesn't, and honest limitations",
  },
  {
    label: "Product Specs",
    path: "products",
    icon: Package,
    description:
      "Technical specifications for hardware and software products",
  },
  {
    label: "FAQ",
    path: "faq",
    icon: HelpCircle,
    description: "Common questions, troubleshooting, and quick answers",
  },
];
