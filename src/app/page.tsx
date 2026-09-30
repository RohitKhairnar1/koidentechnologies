import Link from "next/link";
import { CategoryShowcaseCard } from "@/components/CategoryShowcaseCard";
import { SolutionCard } from "@/components/SolutionCard";
import { ResourceCard } from "@/components/ResourceCard";
import { IndustryRow } from "@/components/IndustryRow";
import { Testimonials } from "@/components/Testimonials";
import { categoryMap, products, productsByCategory } from "@/data/products";
import { site } from "@/lib/site";

// Stats derived from catalog data — nothing invented. They update as the
// real catalog grows. Replace with verified business figures only if
// substantiated.
function pad(n: number) {
  return String(n).padStart(2, "0");
}
const productTypeCount = new Set(products.map((p) => p.productType)).size;
const applicationCount = new Set(products.map((p) => p.application)).size;

const stats = [
  {
    value: pad(4),
    label: "Product categories",
    sub: "Cells, BMS, pack components, protection",
  },
  {
    value: `${products.length}`,
    label: "Products listed",
    sub: "Across the range",
  },
  {
    value: pad(productTypeCount),
    label: "Product types",
    sub: "Across battery components",
  },
  {
    value: pad(applicationCount),
    label: "Applications served",
    sub: "Mobility, storage, industrial, custom",
  },
];

const namesOf = (id: Parameters<typeof productsByCategory>[0]) =>
  productsByCategory(id).map((p) => p.name);

const solutions = [
  {
    title: "Spec-matched sourcing",
    description:
      "Filter the directory by category, product type, and application to reach the exact part a design needs.",
    href: "/products",
    cta: "Open the directory",
    art: "cell-18650" as const,
    image: "/images/spec-matched.png",
    
  },
  {
    title: "Consolidated bulk orders",
    description:
      "Cells, boards, strip, and consumables on one purchase order reduces the number of vendors a build has to coordinate.",
    href: "/contact",
    cta: "Send a bill of materials",
    art: "cell-holder" as const,
    image: "/images/bulk-orders.png",
  },
  {
    title: "Prototype to production",
    description:
      "Order sample quantities to validate a design, then scale the same specification to a production run.",
    href: "/contact",
    cta: "Start an enquiry",
    art: "bms" as const,
    image: "/images/prototype-production.png",
  },
];

const industries = [
  {
    title: "Electric Mobility",
    description:
      "Battery components for e-bikes, e-scooters, light EVs and other electric mobility systems.",
    href: "/products",
    cta: "Explore mobility",
    art: "cell-18650" as const,
    image: "/images/Light-electric-mobility.png",
  },
  {
    title: "Energy Storage",
    description:
      "Components for battery systems used in solar storage, backup power, UPS and stationary applications.",
    href: "/products",
    cta: "Explore energy storage",
    art: "cell-lfp" as const,
    image: "/images/Energy-storage.png",
  },
  {
    title: "Industrial & Commercial",
    description:
      "Supporting battery systems used in equipment, machinery, automation and other commercial applications.",
    href: "/products",
    cta: "Explore industrial",
    art: "ev-charger" as const,
    image: "/images/industrial-commercial.png",
  },
  {
    title: "Custom Battery Packs",
    description:
      "Components for manufacturers and assemblers building application-specific battery packs.",
    href: "/contact",
    cta: "Build your battery system",
    art: "cell-holder" as const,
    image: "/images/custom-battery-pack.png",
  },
];

const resourceCategories = [
  {
    title: "Battery Technology",
    slug: "battery-technology",
    description:
      "Core engineering references for cell characteristics, chemistry selection, electrical requirements and sizing.",
  },
  {
    title: "Pack Engineering",
    slug: "pack-engineering",
    description:
      "Guidance for designing, configuring, protecting and charging complete battery packs.",
  },
  {
    title: "Components & Reliability",
    slug: "components-reliability",
    description:
      "Reference material covering supporting components, electrical protection, safety and diagnostics.",
  },
  {
    title: "Reference & Procurement",
    slug: "reference-procurement",
    description:
      "Practical engineering references, calculations and procurement guidance for specification and sourcing.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="photo-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />
        <div className="container-content relative grid items-center gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <p className="eyebrow-light">Industrial supply · India</p>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.02] tracking-tight3 md:text-6xl lg:text-7xl">
              Components for building battery packs.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300/80">
              {site.name} supplies battery cells, BMS, pack components, and
              insulation materials to manufacturers, assemblers, and integrators —
              sourced in one place, priced by the order, not the unit.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link href="/products" className="btn-primary !px-8 !py-4 text-base">
                Browse products
              </Link>
              <Link href="/contact" className="btn-outline-light !px-8 !py-4 text-base">
                Request a bulk quote
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-300/70">
              <span>Specification-first listings</span>
              <span>Quote-based bulk ordering</span>
              <span>Single-supplier convenience</span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <img
                src="/images/allproduct1.jpg"
                alt="Koiden Technologies battery and industrial components"
                className="aspect-[4/3] w-full rounded-xl2 object-cover shadow-2xl"
              />
          </div>
        </div>
      </section>

      {/* ── Products — the visual centerpiece ────────────────── */}
      <section id="products" className="container-content py-20 md:py-28">
        <div className="max-w-3xl">
          <p className="eyebrow">Products</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
            Components That Keep Industry Moving
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate">
            Essential components and industrial products for battery, EV, energy,
            and electrical applications.
          </p>
        </div>

        <div className="mt-12 space-y-6">
          {/* 01 — large split feature */}
          <CategoryShowcaseCard
            category={categoryMap["battery-cells"]}
            products={namesOf("battery-cells")}
            layout="feature"
          />

          {/* 02 — wide horizontal */}
          <CategoryShowcaseCard
            category={categoryMap["battery-management"]}
            products={namesOf("battery-management")}
            layout="wide"
          />

          {/* 03 / 04 — image-top tiles */}
          <div className="grid gap-6 md:grid-cols-2">
            <CategoryShowcaseCard
              category={categoryMap["battery-pack-components"]}
              products={namesOf("battery-pack-components")}
              layout="tile"
            />

            <CategoryShowcaseCard
              category={categoryMap["battery-insulation-protection"]}
              products={namesOf("battery-insulation-protection")}
              layout="tile"
            />
          </div>
        </div>

        <div className="mt-10">
          <Link href="/products" className="btn-dark">
            Open the product directory
          </Link>
        </div>
      </section>

      {/* ── Trust / stats ────────────────────────────────────── */}
      <section className="bg-navy text-white">
        <div className="container-content py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="eyebrow-light">Built for procurement</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              A catalog organised around purchasing decisions.
            </h2>
          </div>
          <dl className="mt-14 grid gap-y-12 gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="border-t border-line-dark pt-6">
                <dt className="text-6xl font-semibold tracking-tight3 text-white md:text-7xl">
                  {stat.value}
                </dt>
                <dd className="mt-4">
                  <p className="text-base font-semibold text-white">{stat.label}</p>
                  <p className="mt-1 text-sm text-slate-300/70">{stat.sub}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Solutions (3-column) ─────────────────────────────── */}
      {/* <section className="container-content py-20 md:py-28">
        <div className="max-w-2xl">
          <p className="eyebrow">How we help</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
            From shortlist to shipped order.
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {solutions.map((solution) => (
            <SolutionCard key={solution.title} {...solution} />
          ))}
        </div>
      </section> */}

 {/* ── How we work ─────────────────────────────────────────── */}
{/* ── How we work ─────────────────────────────────────────── */}
<section id="how-we-work" className="container-content py-20 md:py-28">
  {/* Section heading */}
  <div className="max-w-2xl">
    <p className="eyebrow">How we work</p>

    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
      A defined process from requirement to supply.
    </h2>

    <p className="mt-4 text-lg leading-relaxed text-slate">
      We structure every requirement around the application, specification,
      quantity, availability, and commercial needs before moving toward supply.
    </p>
  </div>

  {/* Desktop */}
  <div className="mt-14 hidden lg:grid lg:grid-cols-5 lg:gap-8">
    {[
      {
        step: "01",
        title: "Requirement",
        description:
          "Share your BOM, product specification, quantity, application requirement, or specific component requirement.",
      },
      {
        step: "02",
        title: "Review",
        description:
          "We review the technical requirement, quantities, application, and procurement needs to understand what is required.",
      },
      {
        step: "03",
        title: "Sourcing",
        description:
          "Suitable supply options are evaluated according to the defined specification, availability, and requirement.",
      },
      {
        step: "04",
        title: "Quotation",
        description:
          "Pricing is prepared around the confirmed specification, quantity, availability, lead time, and commercial conditions.",
      },
      {
        step: "05",
        title: "Supply",
        description:
          "Once the order is confirmed, the required components are coordinated and supplied according to the agreed requirement.",
      },
    ].map((item) => (
      <div
        key={item.step}
        className="group rounded-2xl border border-brand/15 bg-brand/[0.035] p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:bg-brand/[0.10] hover:shadow-lg"
      >
        {/* Step number */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-brand bg-white text-sm font-semibold text-brand transition-all duration-300 group-hover:bg-brand group-hover:text-white">
          {item.step}
        </div>

        {/* Content */}
        <div className="mt-8">
          <p className="text-xs font-semibold tracking-[0.18em] text-muted transition-colors duration-300 group-hover:text-brand">
            STEP {item.step}
          </p>

          <h3 className="mt-3 text-lg font-semibold tracking-tight text-ink transition-colors duration-300 group-hover:text-brand">
            {item.title}
          </h3>

          <p className="mt-3 text-sm leading-6 text-slate">
            {item.description}
          </p>
        </div>
      </div>
    ))}
  </div>

  {/* Mobile / Tablet */}
  <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:hidden">
    {[
      {
        step: "01",
        title: "Requirement",
        description:
          "Share your BOM, product specification, quantity, application requirement, or specific component requirement.",
      },
      {
        step: "02",
        title: "Review",
        description:
          "We review the technical requirement, quantities, application, and procurement needs to understand what is required.",
      },
      {
        step: "03",
        title: "Sourcing",
        description:
          "Suitable supply options are evaluated according to the defined specification, availability, and requirement.",
      },
      {
        step: "04",
        title: "Quotation",
        description:
          "Pricing is prepared around the confirmed specification, quantity, availability, lead time, and commercial conditions.",
      },
      {
        step: "05",
        title: "Supply",
        description:
          "Once the order is confirmed, the required components are coordinated and supplied according to the agreed requirement.",
      },
    ].map((item) => (
      <div
        key={item.step}
        className="group rounded-2xl border border-brand/15 bg-brand/[0.035] p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:bg-brand/[0.10] hover:shadow-md"
      >
        {/* Step number */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-brand bg-white text-sm font-semibold text-brand transition-all duration-300 group-hover:bg-brand group-hover:text-white">
          {item.step}
        </div>

        {/* Content */}
        <div className="mt-7">
          <p className="text-xs font-semibold tracking-[0.18em] text-muted transition-colors duration-300 group-hover:text-brand">
            STEP {item.step}
          </p>

          <h3 className="mt-3 text-lg font-semibold tracking-tight text-ink transition-colors duration-300 group-hover:text-brand">
            {item.title}
          </h3>

          <p className="mt-3 text-sm leading-6 text-slate">
            {item.description}
          </p>
        </div>
      </div>
    ))}
  </div>

  {/* CTA */}
  <div className="mt-10">
    <Link
      href="/contact"
      className="inline-flex items-center gap-2 text-sm font-semibold text-brand transition-all duration-300 hover:gap-3"
    >
      Discuss your requirement
      <span aria-hidden="true">→</span>
    </Link>
  </div>
</section>
      {/* ── Industries / applications (numbered, alternating) ── */}
{/* ── Industries / applications ─────────────────────────── */}
<section id="industries" className="bg-light">
  <div className="container-content py-20 md:py-28">

    {/* Section heading */}
    <div className="max-w-2xl">
      <p className="eyebrow">Industries &amp; applications</p>

      <h2 className="mt-3 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
        Battery components for a wide range of applications.
      </h2>

      <p className="mt-4 text-lg leading-relaxed text-slate">
        Koiden supplies the essential components required to build
        battery packs for mobility, energy, industrial and custom
        applications.
      </p>
    </div>

    {/* Application cards */}
    <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {industries.map((industry) => (
        <SolutionCard
          key={industry.title}
          {...industry}
        />
      ))}
    </div>

  </div>
</section>

      {/* ── Testimonials / social proof ──────────────────────── */}
      {/* <Testimonials /> */}

      {/* ── CTA / capabilities ───────────────────────────────── */}
      <section className="container-content py-20 md:py-28">
        <div className="relative overflow-hidden rounded-xl2 bg-navy px-8 py-16 text-white md:px-16 md:py-20">
          <div className="photo-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />
          <div className="relative grid items-center gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
                Have a bill of materials to price?
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-slate-300/80">
                Send the list and we
                return a consolidated quote with availability and lead time.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/contact" className="btn-white !px-8 !py-4 text-base">Start an enquiry</Link>
                <Link href="/products" className="btn-outline-light !px-8 !py-4 text-base">Browse products</Link>
              </div>
            </div>
            <ul className="grid gap-4">
              {[
                "Quote-based bulk pricing, aligned to order volume",
                "One purchase order across every category",
                "Availability and lead time confirmed before you commit",
                "Sample quantities for prototyping, scaled for production",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-lg bg-white/5 p-4 text-sm text-slate-100">
                  <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden className="mt-0.5 flex-none text-brand-soft">
                    <path d="M5 10.5l3.5 3.5L15 6.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Insights / resources grid ────────────────────────── */}
            {/* ── Insights / resources grid ────────────────────────── */}
      <section className="border-t border-line bg-light">
        <div className="container-content py-20 md:py-28">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="eyebrow">Guides &amp; resources</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
                Reference for pack builders.
              </h2>
            </div>
            <Link href="/resources" className="btn-primary shrink-0">All resources</Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {resourceCategories.map((category, index) => (
              <Link
                key={category.slug}
                href={`/resources#${category.slug}`}
                className="group flex flex-col justify-between rounded-xl2 border border-line bg-white p-7 transition-all duration-200 hover:-translate-y-1 hover:border-brand hover:shadow-lg"
              >
                <div>
                  <p className="text-sm font-medium tracking-widest text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <h3 className="mt-5 text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-brand">
                    {category.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-slate">
                    {category.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-ink transition-all duration-200 group-hover:translate-x-1 group-hover:text-brand">
                  Explore guides
                  <span aria-hidden="true" className="text-lg leading-none">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
