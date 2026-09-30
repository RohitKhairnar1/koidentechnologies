import { faq } from "@/data/faq";

/**
 * FAQ accordion built on native <details>/<summary> — fully keyboard
 * accessible and functional without any client-side JavaScript.
 */
export function Faq() {
  return (
    <div className="divide-y divide-line rounded-xl2 border border-line bg-white">
      {faq.map((item) => (
        <details key={item.question} className="group px-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-base font-semibold text-ink [&::-webkit-details-marker]:hidden">
            {item.question}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              aria-hidden
              className="flex-none text-muted transition-transform group-open:rotate-45"
            >
              <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </summary>
          <p className="pb-5 text-sm leading-relaxed text-slate">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
