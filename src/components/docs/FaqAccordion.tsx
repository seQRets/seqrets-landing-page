import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItemProps {
  question: string;
  answer: string | React.ReactNode;
}

const FaqAccordion = ({ question, answer }: FaqItemProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-border/30 bg-card/20 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-card/40 transition-colors"
      >
        <span className="font-display text-sm font-bold text-foreground">
          {question}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="px-6 pb-6 text-sm text-muted-foreground/80 border-t border-border/20 pt-4">
          {answer}
        </div>
      )}
    </div>
  );
};

export default FaqAccordion;
