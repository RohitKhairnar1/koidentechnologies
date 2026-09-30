"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  categories,
  products as allProducts,
  type CategoryId,
} from "@/data/products";
import {
  applyFilters,
  countActiveFacets,
  emptyFilters,
  getFacetOptions,
  type FilterState,
  type SortKey,
} from "@/lib/filter";
import { ProductCard } from "./ProductCard";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "relevance", label: "Relevance" },
  { value: "name-asc", label: "Name (A–Z)" },
  { value: "name-desc", label: "Name (Z–A)" },
  { value: "category", label: "Category" },
];

export function CatalogFilter({
  initialCategory = "all",
  initialQuery = "",
}: {
  initialCategory?: CategoryId | "all";
  initialQuery?: string;
}) {
  const router = useRouter();
  const [filters, setFilters] = useState<FilterState>({
    ...emptyFilters,
    category: initialCategory,
    query: initialQuery,
  });

  // The nav can link to /products?category=... while CatalogFilter stays
  // mounted (Next.js reuses the instance instead of remounting on navigation).
  // Without this, clicking a different category in the header does nothing
  // because `filters` was only ever seeded from the initial props once.
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category: initialCategory,
      facets: {}, // clear stale facet selections from the previous category
    }));
  }, [initialCategory]);

  useEffect(() => {
    setFilters((prev) => ({ ...prev, query: initialQuery }));
  }, [initialQuery]);

  // Facet menu reflects the products in the chosen category so the options
  // stay relevant (BMS series counts don't appear while browsing nickel strip).
  const facetOptions = useMemo(() => {
    const scope =
      filters.category === "all"
        ? allProducts
        : allProducts.filter((p) => p.category === filters.category);
    return getFacetOptions(scope);
  }, [filters.category]);

  const results = useMemo(() => applyFilters(allProducts, filters), [filters]);
  const activeFacetCount = countActiveFacets(filters.facets);

  function setCategory(category: CategoryId | "all") {
    setFilters((prev) => ({ ...prev, category, facets: {} }));
    const url = category === "all" ? "/products" : `/products?category=${category}`;
    router.replace(url, { scroll: false });
  }

  function toggleFacet(key: string, value: string) {
    setFilters((prev) => {
      const current = prev.facets[key] ?? [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      const facets = { ...prev.facets, [key]: next };
      if (next.length === 0) delete facets[key];
      return { ...prev, facets };
    });
  }

  function reset() {
    setFilters((prev) => ({ ...emptyFilters, category: prev.category }));
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[264px_1fr] lg:gap-12">
      {/* ── Filter rail ─────────────────────────────────────── */}
      <aside className="lg:sticky lg:top-24 lg:h-fit">
        <div className="space-y-8 rounded-xl2 border border-line bg-white p-6 shadow-card">
          <div>
            <label
              htmlFor="catalog-search"
              className="text-xs font-semibold uppercase tracking-eyebrow text-muted"
            >
              Search
            </label>
            <input
              id="catalog-search"
              type="search"
              value={filters.query}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, query: e.target.value }))
              }
              placeholder="Cell, Filament Tape, Nickel…"
              className="mt-2 w-full rounded-lg border border-line bg-light px-3 py-2.5 text-sm text-ink placeholder:text-muted focus:border-brand focus:bg-white"
            />
          </div>

          <fieldset>
            <legend className="text-xs font-semibold uppercase tracking-eyebrow text-muted">
              Category
            </legend>
            <div className="mt-3 space-y-1">
              <CategoryOption
                label="All categories"
                checked={filters.category === "all"}
                onChange={() => setCategory("all")}
              />
              {categories.map((c) => (
                <CategoryOption
                  key={c.id}
                  label={c.name}
                  checked={filters.category === c.id}
                  onChange={() => setCategory(c.id)}
                />
              ))}
            </div>
          </fieldset>

          {facetOptions.map((facet) => (
            <fieldset key={facet.key}>
              <legend className="text-xs font-semibold uppercase tracking-eyebrow text-muted">
                {facet.key}
              </legend>
              <div className="mt-3 space-y-1.5">
                {facet.values.map((value) => {
                  const selected = (filters.facets[facet.key] ?? []).includes(value);
                  return (
                    <label
                      key={value}
                      className="flex cursor-pointer items-center gap-2.5 text-sm text-slate"
                    >
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => toggleFacet(facet.key, value)}
                        className="h-4 w-4 flex-none shrink-0 border-line accent-brand focus:ring-brand"
                      />
                      {value}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          ))}

          {(activeFacetCount > 0 || filters.query) && (
            <button
              type="button"
              onClick={reset}
              className="text-sm font-semibold text-brand hover:text-brand-strong"
            >
              Clear filters
            </button>
          )}
        </div>
      </aside>

      {/* ── Results ─────────────────────────────────────────── */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
          <p className="text-sm text-slate" aria-live="polite">
            <span className="font-semibold text-ink">{results.length}</span>{" "}
            {results.length === 1 ? "product" : "products"}
          </p>
          <div className="flex items-center gap-2">
            <label htmlFor="catalog-sort" className="text-sm text-muted">
              Sort
            </label>
            <select
              id="catalog-sort"
              value={filters.sort}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  sort: e.target.value as SortKey,
                }))
              }
              className="rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink focus:border-brand"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {results.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-16 rounded-xl2 border border-dashed border-line bg-light p-12 text-center">
            <p className="text-base font-medium text-ink">No products match those filters.</p>
            <p className="mt-2 text-sm text-slate">
              Try widening the category or clearing a facet.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-6 text-sm font-semibold text-brand hover:text-brand-strong"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function CategoryOption({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate">
      <input
        type="radio"
        name="category"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 flex-none shrink-0 border-line accent-brand focus:ring-brand"
      />
      {label}
    </label>
  );
}