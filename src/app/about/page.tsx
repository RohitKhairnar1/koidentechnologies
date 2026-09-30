import type { Metadata } from "next";
import Link from "next/link";
import { Illustration } from "@/components/Illustration";
import { categories } from "@/data/products";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Koiden Technologies",
  description: `${site.name} is a B2B supplier of battery cells, BMS, battery-pack components, interconnect materials and insulation products for manufacturers, OEMs and system integrators in India.`,
};

const whoWeServe = [
  {
    title: "Battery-Pack Manufacturers",
    description:
      "For production and assembly requirements involving cells, BMS, interconnects, insulation, mechanical components, and related materials.",
  },
  {
    title: "OEMs & Equipment Manufacturers",
    description:
      "For products and equipment incorporating battery systems.",
  },
  {
    title: "System Integrators",
    description:
      "For projects requiring components selected around electrical, mechanical, and application requirements.",
  },
  {
    title: "Engineering & Product Development Teams",
    description:
      "For prototype, pilot, development, and production requirements.",
  },
  {
    title: "Procurement Teams",
    description:
      "For recurring component sourcing and consolidated procurement.",
  },
  {
    title: "Industrial Businesses",
    description:
      "For battery and related electrical components used in industrial and commercial applications.",
  },
];

const process = [
  {
    step: "01",
    title: "Requirement",
    description:
      "You share a BOM, product specification, quantity, application requirement, or component requirement.",
  },
  {
    step: "02",
    title: "Review",
    description:
      "We review the requirement, specifications, quantities, and procurement needs.",
  },
  {
    step: "03",
    title: "Sourcing",
    description:
      "Suitable supply options are evaluated according to the defined requirement and availability.",
  },
  {
    step: "04",
    title: "Quotation",
    description:
      "A quotation is prepared based on confirmed specifications, quantity, availability, and commercial conditions.",
  },
  {
    step: "05",
    title: "Supply",
    description:
      "Once confirmed, the required components are coordinated and supplied according to the agreed requirement.",
  },
];

const approach = [
  {
    title: "Specification-led sourcing",
    description:
      "We begin with the required specification and application instead of treating every requirement as a generic catalogue purchase.",
  },
  {
    title: "Clear communication",
    description:
      "Specifications, availability, quantities, lead times, and commercial conditions are clearly discussed before confirmation.",
  },
  {
    title: "Consolidated procurement",
    description:
      "Where practical, customers can source multiple battery-pack component requirements through one focused supplier.",
  },
  {
    title: "Practical execution",
    description:
      "The focus is on understanding the actual requirement and coordinating sourcing and supply around the customer's project or production needs.",
  },
];

const qualitySourcing = [
  "Defined specifications for every component discussed",
  "Product identification confirmed against the stated requirement",
  "Requirement confirmation before sourcing begins",
  "Supplier and product evaluation where applicable",
  "Availability confirmation ahead of quotation",
  "Quantity confirmation aligned to the actual order",
  "Commercial transparency on pricing and lead time",
  "Documentation shared where applicable",
  "Clear communication maintained before order confirmation",
];

const whyKoiden = [
  {
    title: "One supply point",
    description:
      "Multiple battery-pack component categories through one supplier.",
  },
  {
    title: "B2B focused",
    description:
      "The website and procurement approach are designed around business requirements.",
  },
  {
    title: "Specification oriented",
    description:
      "Product discussions are based on defined technical requirements.",
  },
  {
    title: "Quote based",
    description:
      "Pricing is discussed according to specification, quantity, availability, and current supply conditions.",
  },
  {
    title: "Consolidated sourcing",
    description:
      "Multiple component requirements can potentially be coordinated through one supply relationship.",
  },
  {
    title: "Requirement focused",
    description:
      "The objective is to understand the actual application and procurement requirement before finalising supply.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-navy text-white">
        <div className="container-content grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="eyebrow-light">About Koiden</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              A dependable supply partner for battery and industrial
              components.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-300/80">
              {site.name} is a B2B supplier focused on battery cells, BMS,
              battery-pack components, interconnect materials, insulation
              products, mechanical components, and related industrial and
              assembly materials.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-slate-300/80">
              We work with manufacturers, OEMs, system integrators,
              engineering teams, and procurement teams building battery
              systems, with a primary focus on the Indian market.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary !px-8 !py-4 text-base">
                Start an enquiry
              </Link>
              <Link
                href="/products"
                className="btn-outline-light !px-8 !py-4 text-base"
              >
                Explore products
              </Link>
            </div>
          </div>

          <img
            src="/images/allproduct1.jpg"
            alt="Battery pack components"
            className="aspect-[4/3] w-full rounded-xl2 object-cover shadow-2xl"
          />
        </div>
      </section>

      {/* ── Who we are ───────────────────────────────────────── */}
      <section className="container-content py-16 md:py-24">
        <div className="max-w-3xl">
          <p className="eyebrow">Who we are</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            Built around the requirements of modern product manufacturing.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate">
            Battery systems are built from multiple interconnected
            components — cells, BMS, conductive interconnects, insulation,
            mechanical components, connectors, and other assembly materials.
            Sourcing each of these individually, from separate vendors, adds
            complexity to a build that is already technically demanding.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-slate">
            Koiden&apos;s objective is to bring these relevant component
            requirements together through a focused B2B supply portfolio. Our
            approach is specification-led rather than simply catalogue-led:
            requirements are evaluated based on product specification,
            application, quantity, availability, and commercial requirement,
            rather than treated as a standard retail purchase.
          </p>
        </div>
      </section>

      {/* ── What we supply ───────────────────────────────────── */}
      <section className="border-t border-line bg-light">
        <div className="container-content py-16 md:py-24">
          <div className="max-w-2xl">
            <p className="eyebrow">What we supply</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              A portfolio built around the battery-pack build process.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate">
              Our catalog covers battery cells, BMS and battery electronics,
              interconnect materials, insulation and protection materials,
              mechanical battery-pack components, and assembly and supporting
              materials.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                href={`/products?category=${category.id}`}
                className="group flex flex-col justify-between rounded-2xl border border-line bg-white p-7 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/30 hover:bg-brand/[0.06] hover:shadow-md"
              >
                <div>
                  <p className="text-xs font-semibold tracking-widest text-muted transition-colors duration-200 group-hover:text-brand">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 text-lg font-semibold text-ink transition-colors duration-200 group-hover:text-brand">
                    {category.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">
                    {category.blurb}
                  </p>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink transition-all duration-200 group-hover:translate-x-1 group-hover:text-brand">
                  View {category.name.toLowerCase()}
                  <span aria-hidden>→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who we serve ─────────────────────────────────────── */}
      <section className="container-content py-16 md:py-24">
        <div className="max-w-2xl">
          <p className="eyebrow">Who we serve</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            Supporting different stages of the product lifecycle.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whoWeServe.map((item, index) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-line bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/30 hover:bg-brand/[0.06] hover:shadow-md"
            >
              <p className="text-xs font-semibold tracking-widest text-muted transition-colors duration-200 group-hover:text-brand">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 text-base font-semibold text-ink transition-colors duration-200 group-hover:text-brand">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How we work ──────────────────────────────────────── */}
      <section className="border-t border-line bg-light">
        <div className="container-content py-16 md:py-24">
          <div className="max-w-2xl">
            <p className="eyebrow">How we work</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              A defined process from requirement to supply.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {process.map((item) => (
              <div
                key={item.step}
                className="group rounded-2xl border border-line bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/30 hover:bg-brand/[0.06] hover:shadow-md"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-brand text-sm font-semibold text-brand transition-colors duration-200 group-hover:bg-brand group-hover:text-white">
                  {item.step}
                </div>
                <h3 className="mt-5 text-base font-semibold text-ink transition-colors duration-200 group-hover:text-brand">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our approach ─────────────────────────────────────── */}
      <section className="container-content py-16 md:py-24">
        <div className="max-w-2xl">
          <p className="eyebrow">Our approach</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            Operating principles behind how we supply.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {approach.map((item, index) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-line bg-white p-7 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/30 hover:bg-brand/[0.06] hover:shadow-md"
            >
              <p className="text-xs font-semibold tracking-widest text-muted transition-colors duration-200 group-hover:text-brand">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 text-lg font-semibold text-ink transition-colors duration-200 group-hover:text-brand">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Quality, sourcing & procurement ──────────────────── */}
      <section className="border-t border-line bg-light">
        <div className="container-content py-16 md:py-24">
          <div className="max-w-2xl">
            <p className="eyebrow">Quality, sourcing &amp; procurement</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              A disciplined approach to sourcing and confirmation.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate">
              Before any order is confirmed, we work through a clear
              sequence to make sure the specification, availability, and
              commercial terms are properly understood by both sides.
            </p>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {qualitySourcing.map((item) => (
              <div
                key={item}
                className="group flex items-start gap-3 rounded-xl border border-line bg-white p-4 transition-all duration-200 hover:border-brand/30 hover:bg-brand/[0.06]"
              >
                <span
                  aria-hidden="true"
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                />
                <span className="text-sm leading-relaxed text-slate">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Koiden ───────────────────────────────────────── */}
      <section className="container-content py-16 md:py-24">
        <div className="max-w-2xl">
          <p className="eyebrow">Why Koiden</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            Practical reasons to work with us.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyKoiden.map((item, index) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-line bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/30 hover:bg-brand/[0.06] hover:shadow-md"
            >
              <p className="text-xs font-semibold tracking-widest text-muted transition-colors duration-200 group-hover:text-brand">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 text-base font-semibold text-ink transition-colors duration-200 group-hover:text-brand">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────── */}

    </>
  );
}