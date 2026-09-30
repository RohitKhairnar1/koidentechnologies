import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getResource, resources } from "@/data/resources";

export function generateStaticParams() {
  return resources.map((resource) => ({
    slug: resource.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResource(slug);

  if (!resource) {
    return {
      title: "Resource not found",
    };
  }

  return {
    title: resource.title,
    description: resource.excerpt,
  };
}

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = getResource(slug);

  if (!resource) {
    notFound();
  }

  return (
    <article>
      {/* Breadcrumb */}
      <div className="border-b border-line bg-light">
        <div className="container-content flex items-center gap-2 py-4 text-sm text-muted">
          <Link
            href="/resources"
            className="transition-colors hover:text-brand"
          >
            Resources
          </Link>

          <span aria-hidden>/</span>

          <span className="truncate text-ink">{resource.title}</span>
        </div>
      </div>

      {/* Header */}
      <header className="container-content pt-14 md:pt-20">
        <div className="mx-auto max-w-4xl">
          <p className="eyebrow">{resource.kind}</p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink md:text-6xl">
            {resource.title}
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate md:text-xl">
            {resource.excerpt}
          </p>
        </div>
      </header>


      {/* Article layout */}
      <div className="container-content py-14 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
          {/* Table of contents */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                In this guide
              </p>

              <nav className="mt-5 border-l border-line">
                {resource.sections.map((section, index) => (
                  <a
                    key={section.heading}
                    href={`#section-${index}`}
                    className="block border-l border-transparent py-2 pl-4 text-sm leading-relaxed text-slate transition-colors hover:border-brand hover:text-brand"
                  >
                    {section.heading}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Article */}
          <div className="min-w-0">
            {/* Introduction */}
            <div className="border-b border-line pb-10">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                Technical overview
              </p>

              <div className="mt-5 space-y-5">
                {resource.body.map((paragraph, index) => (
                  <p
                    key={index}
                    className="max-w-3xl text-base leading-8 text-slate md:text-lg"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Sections */}
            <div className="mt-12">
              {resource.sections.map((section, index) => (
                <section
                  key={section.heading}
                  id={`section-${index}`}
                  className="scroll-mt-28 border-b border-line py-10 first:pt-0 last:border-b-0"
                >
                  <div className="grid gap-6 md:grid-cols-[48px_minmax(0,1fr)]">
                    <div className="text-sm font-medium tracking-widest text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div>
                      <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
                        {section.heading}
                      </h2>

                      {section.paragraphs && (
                        <div className="mt-5 space-y-5">
                          {section.paragraphs.map((paragraph, paragraphIndex) => (
                            <p
                              key={paragraphIndex}
                              className="max-w-3xl text-base leading-8 text-slate"
                            >
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      )}

                      {section.bullets && (
                        <ul className="mt-6 max-w-3xl space-y-3">
                          {section.bullets.map((bullet, bulletIndex) => (
                            <li
                              key={bulletIndex}
                              className="flex gap-3 text-base leading-7 text-slate"
                            >
                              <span
                                aria-hidden="true"
                                className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                              />

                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </section>
              ))}
            </div>

            {/* Engineering note */}
            <div className="border-t border-line pt-10">
              <div className="border-l-2 border-brand pl-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                  Engineering note
                </p>

                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate">
                  Battery performance depends on the exact cell, configuration,
                  operating conditions and supporting electronics. Use
                  manufacturer datasheets and application-specific validation
                  when making final design decisions. The information in this
                  guide is intended as a technical reference and should not
                  replace product-specific specifications or engineering
                  validation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related resources */}
      <section className="border-t border-line bg-light">
        <div className="container-content py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <p className="eyebrow">Continue reading</p>

            <div className="mt-7 divide-y divide-line border-y border-line">
              {resources
                .filter((item) => item.slug !== resource.slug)
                .slice(0, 3)
                .map((relatedResource) => (
                  <Link
                    key={relatedResource.slug}
                    href={`/resources/${relatedResource.slug}`}
                    className="group flex items-center justify-between gap-6 py-6 transition-colors hover:bg-white"
                  >
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.14em] text-brand">
                        {relatedResource.kind}
                      </p>

                      <h3 className="mt-2 text-lg font-semibold text-ink transition-colors group-hover:text-brand">
                        {relatedResource.title}
                      </h3>
                    </div>

                    <span
                      aria-hidden="true"
                      className="shrink-0 text-lg transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line">
        <div className="container-content py-16 md:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div>
                <p className="eyebrow">Need help with specification?</p>

                <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-ink md:text-4xl">
                  Discuss your battery requirement with Koiden.
                </h2>

                <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate">
                  Share your application, voltage, capacity, current,
                  dimensions and quantity requirements for a technical
                  discussion.
                </p>
              </div>

              <div className="flex shrink-0 flex-wrap gap-3">
                <Link href="/products" className="btn-primary">
                  Browse products
                </Link>

                <Link href="/contact" className="btn-outline">
                  Request a quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}