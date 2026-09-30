import Link from "next/link";
import { site } from "@/lib/site";
import { categories } from "@/data/products";
import { Logo } from "./Logo";

const resourceCategories = [
  { title: "Battery Technology", slug: "battery-technology" },
  { title: "Pack Engineering", slug: "pack-engineering" },
  { title: "Components & Reliability", slug: "components-reliability" },
  { title: "Reference & Procurement", slug: "reference-procurement" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
      {/* Pre-footer CTA */}
      <div className="border-b border-line-dark">
        <div className="container-content flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Ready to price your build?
            </h2>
            <p className="mt-2 text-sm text-slate-300/80">
              Send your bill of materials for a consolidated quote.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">Request a quote</Link>
            <Link href="/products" className="btn-outline-light">Browse catalog</Link>
          </div>
        </div>
      </div>

      <div className="container-content grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo variant="light" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-300/70">
            {site.description}
          </p>
        </div>

        <div className="md:col-span-2">
          <h3 className="text-xs font-semibold uppercase tracking-eyebrow text-slate-300/60">
            Products
          </h3>
          <ul className="mt-4 space-y-2.5">
            {categories.map((c) => (
              <li key={c.id}>
                <Link href={`/products?category=${c.id}`} className="text-sm text-slate-300/80 transition-colors hover:text-white">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="text-xs font-semibold uppercase tracking-eyebrow text-slate-300/60">
            Resources
          </h3>
          <ul className="mt-4 space-y-2.5">
            {resourceCategories.map((r) => (
              <li key={r.slug}>
                <Link href={`/resources#${r.slug}`} className="text-sm text-slate-300/80 transition-colors hover:text-white">
                  {r.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/how-to-order" className="text-sm text-slate-300/80 transition-colors hover:text-white">How to order</Link>
            </li>
            <li>
              <Link href="/about" className="text-sm text-slate-300/80 transition-colors hover:text-white">About</Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="text-xs font-semibold uppercase tracking-eyebrow text-slate-300/60">
            Get in touch
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-slate-300/80">
            <li className="not-italic">
              {site.address.line1}, {site.address.city}, {site.address.state}{" "}
              {site.address.postalCode}, {site.address.country}
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-white">{site.email}</a>
            </li>
            <li>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-white">{site.phone}</a>
            </li>
            <li>{site.hours}</li>
            <li className="pt-2">
              <Link href="/contact" className="arrow-link !text-brand-soft">
                Send an enquiry <span aria-hidden>→</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line-dark">
        <div className="container-content flex flex-col gap-2 py-6 text-xs text-slate-300/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}
            {site.registration ? ` · ${site.registration}` : ""}. All rights reserved.
          </p>
          <p>Made in India.</p>
        </div>
      </div>
    </footer>
  );
}