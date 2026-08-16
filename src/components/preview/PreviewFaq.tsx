import { useState } from "react";
import { ChevronDown } from "lucide-react";

/* ------------------------------------------------------------------ *
 * Themed FAQ accordion.
 *
 * A palette-token twin of components/docs/FaqAccordion, which styles
 * against shadcn semantics and so cannot follow the light/dark switch.
 * That one is still used by /docs/faq; this exists rather than changing
 * it in place so the two palettes do not fight over one component.
 * Behaviour is identical — the grid-rows trick animates height without
 * measuring content.
 * ------------------------------------------------------------------ */

const PreviewFaq = ({
  question,
  answer,
}: {
  question: string;
  answer: string | React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-[16px] border border-[var(--line)] bg-[var(--sf)]">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-[var(--band)] md:p-6"
      >
        <span className="font-display text-[14.5px] font-bold text-[var(--ink)]">
          {question}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-[var(--ink3)] transition-transform duration-300 ease-out ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-[var(--line)] px-5 pb-5 pt-4 text-[14px] leading-[1.7] text-[var(--ink2)] md:px-6 md:pb-6">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewFaq;
