import type { Metadata } from "next";
import { BulkEnquiryForm } from "@/components/BulkEnquiryForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & bulk enquiry",
  description:
    "Send a bulk enquiry to Koiden Technologies. Share your quantity and application for a quote with availability, lead time, and pricing.",
};

export default function ContactPage() {
  return (
    <section className="container-content py-16 md:py-20">
      <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
        <div>
          <p className="eyebrow">Contact</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
            Send a bulk enquiry.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate">
            Tell us what your build needs — cells, boards, strip, or consumables
            — with the quantity and application. We&rsquo;ll respond with
            availability, lead time, and bulk pricing.
          </p>

          <dl className="mt-10 space-y-6 border-t border-line pt-8">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-eyebrow text-muted">
                Email
              </dt>
              <dd className="mt-1.5">
                <a href={`mailto:${site.email}`} className="text-sm font-medium text-brand hover:text-brand-strong">
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-eyebrow text-muted">
                Phone
              </dt>
              <dd className="mt-1.5">
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="text-sm font-medium text-ink">
                  {site.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-eyebrow text-muted">
                Address
              </dt>
              <dd className="mt-1.5 text-sm text-slate not-italic">
                {site.address.line1}, {site.address.city}, {site.address.state}{" "}
                {site.address.postalCode}, {site.address.country}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-eyebrow text-muted">
                Business hours
              </dt>
              <dd className="mt-1.5 text-sm text-slate">{site.hours}</dd>
            </div>
          </dl>
        </div>

        <div className="card p-6 md:p-8">
          <BulkEnquiryForm />
        </div>
      </div>
    </section>
  );
}
