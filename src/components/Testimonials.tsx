/**
 * Social-proof section.
 *
 * Per the "zero invented claims" rule, we do NOT ship fabricated customer
 * quotes, names, or company logos. These are clearly-labelled placeholder
 * cards that establish the layout. Replace each `quote`/`author`/`role` with
 * a real, permissioned customer testimonial before launch, and remove the
 * `placeholder` flag. If you have no testimonials yet, delete this section.
 */

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  placeholder?: boolean;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Add a verified customer quote here — what they were sourcing, and how the enquiry-to-quote process worked for them.",
    author: "Customer name",
    role: "Role, Company",
    placeholder: true,
  },
  {
    quote:
      "A second short testimonial. Keep quotes specific and factual; only publish quotes you have permission to use.",
    author: "Customer name",
    role: "Role, Company",
    placeholder: true,
  },
  {
    quote:
      "A third testimonial. Two to three sentences reads best in this card format.",
    author: "Customer name",
    role: "Role, Company",
    placeholder: true,
  },
];

export function Testimonials() {
  return (
    <section className="container-content py-20 md:py-28">
      <div className="max-w-2xl">
        <p className="eyebrow">Social proof</p>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          What customers say.
        </h2>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <figure
            key={i}
            className={`card flex flex-col p-7 ${
              t.placeholder ? "border-dashed" : ""
            }`}
          >
            <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden className="text-brand-tint">
              <path
                d="M14 9c-4 1.5-7 5-7 10v6h9v-9h-4c0-3 1-5 3-6l-1-1zm13 0c-4 1.5-7 5-7 10v6h9v-9h-4c0-3 1-5 3-6l-1-1z"
                fill="currentColor"
              />
            </svg>
            <blockquote className="mt-4 flex-1 text-base leading-relaxed text-ink">
              {t.quote}
            </blockquote>
            <figcaption className="mt-6 border-t border-line pt-4">
              <p className="text-sm font-semibold text-ink">{t.author}</p>
              <p className="text-sm text-muted">{t.role}</p>
              {t.placeholder && (
                <span className="mt-3 inline-block rounded-full bg-brand-tint px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-eyebrow text-brand-strong">
                  Placeholder — replace before launch
                </span>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
