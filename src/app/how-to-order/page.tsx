import type { Metadata } from "next";
import Link from "next/link";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { faq } from "@/data/faq";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "How to order",
  description:
    "How to order from Koiden Technologies — the enquiry-to-quote process, minimum order quantities, lead times, documentation, and delivery.",
};

const steps = [
  {
    title: "Filter the catalog",
    body: "Narrow by category and specification to reach the exact cell, board, gauge, or consumable your build needs.",
  },
  {
    title: "Send a bulk enquiry",
    body: "Open the product page and submit the enquiry form with your quantity, application, and delivery location.",
  },
  {
    title: "Receive a quote",
    body: "We reply with current availability, lead time, and bulk pricing for the quantity you specified.",
  },
  {
    title: "Confirm the order",
    body: "Approve the quote to place the order. Sample quantities can be scaled to a production run using the same specification.",
  },
];

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function HowToOrderPage() {
  return (
    <>
      <JsonLd data={faqLd} />

      <section className="bg-navy text-white">
        <div className="container-content py-16 md:py-20">
          <p className="eyebrow-light">How to order</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
            A quote-based process, built for bulk buyers.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300/80">
            {site.name} sells on enquiry and quote rather than fixed retail
            pricing. Here&rsquo;s how ordering works, and answers to the
            questions buyers ask most.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="container-content py-16 md:py-20">
        <ol className="grid gap-8 md:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="border-t border-line pt-6">
              <span className="text-sm font-semibold text-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-3 text-lg font-semibold text-ink">{step.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section className="border-t border-line bg-light">
        <div className="container-content py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <p className="eyebrow">Questions</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
                Ordering FAQ
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate">
                Don&rsquo;t see your question? Send it with your enquiry and
                we&rsquo;ll answer alongside your quote.
              </p>
              <Link href="/contact" className="btn-primary mt-6">
                Request a quote
              </Link>
            </div>
            <Faq />
          </div>
        </div>
      </section>
    </>
  );
}
