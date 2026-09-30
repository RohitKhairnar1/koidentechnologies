import type { Metadata } from "next";
import { CatalogFilter } from "@/components/CatalogFilter";
import { categories, type CategoryId } from "@/data/products";

export const metadata: Metadata = {
  title: "Product Directory",
  description:
    "Explore Koiden Technologies' range of battery, EV, energy storage, and industrial components. Filter by category, product type, and application, then send a bulk enquiry.",
};

function resolveCategory(value?: string): CategoryId | "all" {
  if (value && categories.some((c) => c.id === value)) {
    return value as CategoryId;
  }
  return "all";
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const { category, q } = await searchParams;
  const initialCategory = resolveCategory(category);

  return (
    <>
      <section className="bg-navy text-white">
        <div className="container-content py-16 md:py-20">
          <p className="eyebrow-light">Products</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
            Product Directory
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300/80">
            Explore Koiden Technologies&rsquo; range of battery, EV, energy
            storage, and industrial components. Filter by category, product
            type, and application, then send a bulk enquiry.
          </p>
        </div>
      </section>

      <section className="container-content py-12 md:py-16">
        <CatalogFilter initialCategory={initialCategory} initialQuery={q ?? ""} />
      </section>
    </>
  );
}
