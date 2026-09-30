/**
 * Ordering FAQ.
 *
 * Answers are written to be true without committing to specifics we can't
 * verify here (exact MOQs, prices, lead times, payment terms). Where a real
 * policy value is needed, the copy defers to "confirmed with your quote".
 * Tighten these with Koiden's actual policies before launch.
 */
export interface FaqItem {
  question: string;
  answer: string;
}

export const faq: FaqItem[] = [
  {
    question: "How do I place an order?",
    answer:
      "Browse the catalog, open the product you need, and submit the bulk enquiry form with your quantity and application. We reply with availability, lead time, and pricing for that quantity. Orders are confirmed against a quote — there is no retail checkout.",
  },
  {
    question: "Is there a minimum order quantity?",
    answer:
      "Minimum order quantities vary by product and are confirmed with your quote. Tell us the quantity you're considering in your enquiry and we'll advise what's practical for that item.",
  },
  {
    question: "How is pricing determined?",
    answer:
      "Pricing is quoted per order rather than as a fixed per-unit retail price, so it can reflect the quantity you need. Share your target volume and we'll return a price for that order.",
  },
  {
    question: "What are your lead times?",
    answer:
      "Lead time depends on the product and quantity. We confirm the expected lead time with your quote, before you commit to an order.",
  },
  {
    question: "Can I order sample quantities before a production run?",
    answer:
      "Yes. You can request sample quantities to validate a design, then scale the same specification to a production order through the same enquiry process.",
  },
  {
    question: "Do you supply documentation for the products?",
    answer:
      "Available documentation is confirmed at the time of quote. Note in your enquiry which documents your process requires and we'll tell you what can be provided for that item.",
  },
  {
    question: "Where do you deliver?",
    answer:
      "We supply manufacturers and integrators across India. Include your delivery location in your enquiry so we can factor it into the quote.",
  },
];
