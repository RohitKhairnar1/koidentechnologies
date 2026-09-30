import type { Metadata } from "next";
import Link from "next/link";
import { resources } from "@/data/resources";

export const metadata: Metadata = {
  title: "Technical Resources",
  description:
    "Technical guides covering battery cells, chemistry, pack design, BMS, charging, sizing, components, safety, troubleshooting and procurement.",
};

const resourceGroups = [
  {
    title: "Battery Technology",
    description:
      "Core engineering references for understanding cell characteristics, chemistry selection, electrical requirements and battery sizing.",
    kinds: ["Battery Technology"],
  },
  {
    title: "Pack Engineering",
    description:
      "Technical guidance for designing, configuring, protecting and charging complete battery packs.",
    kinds: ["Pack Engineering", "Charging & Power"],
  },
  {
    title: "Components & Reliability",
    description:
      "Reference material covering supporting components, electrical protection, safety and pack-level diagnostics.",
    kinds: ["Components & Reliability", "Safety & Reliability", "Service & Diagnostics"],
  },
  {
    title: "Reference & Procurement",
    description:
      "Practical engineering references, calculations and procurement guidance for specification and sourcing.",
    kinds: ["Technical Reference", "Engineering Tools", "Procurement"],
  },
];

export default function ResourcesPage() {
  let number = 0;

  return (
    <>
      {/* Hero */}
      <section className="bg-navy text-white">
        <div className="container-content py-20 md:py-28">
          <p className="eyebrow-light">Technical resources</p>

          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
            Technical knowledge for better battery decisions.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300/80">
            Detailed reference material covering battery technology, pack
            engineering, BMS, charging, components, safety, diagnostics and
            procurement.
          </p>

          <div className="mt-10 flex flex-wrap gap-3 text-sm">
            <a
              href="#battery-chemistry-guide"
              className="rounded-full border border-white/15 px-4 py-2 text-slate-300/80 transition-colors hover:border-brand hover:bg-brand hover:text-white"
            >
              Cell selection
            </a>

            <a
              href="#battery-pack-design-guide"
              className="rounded-full border border-white/15 px-4 py-2 text-slate-300/80 transition-colors hover:border-brand hover:bg-brand hover:text-white"
            >
              Pack design
            </a>

            <a
              href="#bms-guide"
              className="rounded-full border border-white/15 px-4 py-2 text-slate-300/80 transition-colors hover:border-brand hover:bg-brand hover:text-white"
            >
              BMS
            </a>

            <a
              href="#battery-charging-guide"
              className="rounded-full border border-white/15 px-4 py-2 text-slate-300/80 transition-colors hover:border-brand hover:bg-brand hover:text-white"
            >
              Charging
            </a>

            <a
              href="#battery-safety-guide"
              className="rounded-full border border-white/15 px-4 py-2 text-slate-300/80 transition-colors hover:border-brand hover:bg-brand hover:text-white"
            >
              Safety
            </a>

            <a
              href="#battery-buying-guide"
              className="rounded-full border border-white/15 px-4 py-2 text-slate-300/80 transition-colors hover:border-brand hover:bg-brand hover:text-white"
            >
              Procurement
            </a>
          </div>
        </div>
      </section>

      {/* Directory */}
      <main className="container-content py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          {resourceGroups.map((group, groupIndex) => {
            const groupResources = resources.filter((resource) =>
              group.kinds.includes(resource.kind)
            );

            return (
              <section
              key={group.title}
              id={
                group.title === "Battery Technology"
                  ? "battery-technology"
                  : group.title === "Pack Engineering"
                  ? "pack-engineering"
                  : group.title === "Components & Reliability"
                  ? "components-reliability"
                  : "reference-procurement"
              }
              className={`scroll-mt-24 ${groupIndex > 0 ? "mt-20 md:mt-28" : ""}`}
            >
                {/* Category heading */}
                <div className="mb-7 border-b border-line pb-6 md:mb-8">
                  <p className="eyebrow">{`0${groupIndex + 1}`}</p>

                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
                    {group.title}
                  </h2>

                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate md:text-base">
                    {group.description}
                  </p>
                </div>

                {/* Resource rows */}
                <div>
                  {groupResources.map((resource) => {
                    number += 1;

                    return (
                    <Link
                      id={resource.slug}
                      key={resource.slug}
                      href={`/resources/${resource.slug}`}
                      className="group block scroll-mt-24 border-b border-line px-4 py-7 -mx-4 transition-colors duration-200 first:border-t hover:bg-brand/[0.12] focus:outline-none focus-visible:bg-brand/[0.06]"
                    >
                      <div className="grid gap-5 md:grid-cols-[72px_minmax(0,1fr)_auto] md:items-center md:gap-8">
                        {/* Number */}
                        <div className="text-sm font-medium tracking-widest text-muted">
                          {String(number).padStart(2, "0")}
                        </div>

                        {/* Content */}
                        <div>
                          <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand">
                            {resource.kind}
                          </p>

                          <h3 className="mt-2 text-xl font-semibold tracking-tight text-ink transition-colors duration-200 group-hover:text-brand md:text-2xl">
                            {resource.title}
                          </h3>

                          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate md:text-base">
                            {resource.excerpt}
                          </p>
                        </div>

                        {/* Arrow */}
                        <div className="flex items-center gap-2 text-sm font-medium text-ink transition-all duration-200 group-hover:translate-x-1 group-hover:text-brand">
                          <span className="hidden md:inline">Explore guide</span>
                          <span aria-hidden="true" className="text-lg leading-none">
                            →
                          </span>
                        </div>
                      </div>
                    </Link>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </main>

      {/* Bottom CTA */}
      <section className="border-t border-line bg-light">
        <div className="container-content py-16 md:py-20">
          <div className="mx-auto max-w-4xl">
            <p className="eyebrow">Need a specific specification?</p>

            <div className="mt-3 flex flex-col justify-between gap-7 md:flex-row md:items-end">
              <div>
                <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-ink md:text-4xl">
                  Have a battery requirement that needs to be evaluated?
                </h2>

                <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate">
                  Share your voltage, capacity, current, dimensions and
                  application requirements. Our team can help you identify the
                  appropriate battery components or pack configuration.
                </p>
              </div>

              <div className="flex shrink-0 flex-wrap gap-3">
                <Link href="/products" className="btn-primary">
                  Browse products
                </Link>

                <Link href="/contact" className="btn-outline">
                  Send an enquiry
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}