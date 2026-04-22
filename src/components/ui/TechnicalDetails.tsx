import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface TechnicalDetailsProps {
  children: React.ReactNode;
  label?: string;
  className?: string;
}

/**
 * Collapsible disclosure for technical depth on marketing pages.
 * Keeps buyer-facing copy clean while preserving the detail for those
 * who want to dig in. Defaults to "Show technical details".
 */
const TechnicalDetails = ({
  children,
  label = "Show technical details",
  className = "",
}: TechnicalDetailsProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border-t border-border/20 pt-3 ${className}`}>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground/70 hover:text-foreground transition-colors"
      >
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
        {open ? "Hide technical details" : label}
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pt-3 text-xs text-muted-foreground/70 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalDetails;
