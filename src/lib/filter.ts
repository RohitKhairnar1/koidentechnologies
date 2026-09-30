import type { CategoryId, Product } from "@/data/products";

export type SortKey = "relevance" | "name-asc" | "name-desc" | "category";

export interface FilterState {
  query: string;
  category: CategoryId | "all";
  /** facetKey -> selected values (OR within a key, AND across keys). */
  facets: Record<string, string[]>;
  sort: SortKey;
}

export const emptyFilters: FilterState = {
  query: "",
  category: "all",
  facets: {},
  sort: "relevance",
};

/**
 * Build the facet menu from a set of products. Facets are derived from the
 * data itself, so adding a product with a new facet key surfaces it here
 * automatically — no separate config to maintain.
 */
export function getFacetOptions(
  products: Product[],
): { key: string; values: string[] }[] {
  const map = new Map<string, Set<string>>();

  for (const product of products) {
    for (const [key, value] of Object.entries(product.facets)) {
      if (!map.has(key)) map.set(key, new Set());
      map.get(key)!.add(value);
    }
  }

  return Array.from(map.entries())
    .map(([key, values]) => ({
      key,
      values: Array.from(values).sort((a, b) =>
        a.localeCompare(b, undefined, { numeric: true }),
      ),
    }))
    .sort((a, b) => a.key.localeCompare(b.key));
}

function matchesQuery(product: Product, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack = [
    product.name,
    product.summary,
    ...Object.values(product.facets),
  ]
    .join(" ")
    .toLowerCase();
  // Every whitespace-separated term must appear somewhere.
  return q.split(/\s+/).every((term) => haystack.includes(term));
}

function matchesFacets(
  product: Product,
  facets: Record<string, string[]>,
): boolean {
  return Object.entries(facets).every(([key, selected]) => {
    if (selected.length === 0) return true;
    const value = product.facets[key];
    return value !== undefined && selected.includes(value);
  });
}

export function applyFilters(
  products: Product[],
  state: FilterState,
): Product[] {
  const filtered = products.filter((product) => {
    if (state.category !== "all" && product.category !== state.category) {
      return false;
    }
    if (!matchesQuery(product, state.query)) return false;
    if (!matchesFacets(product, state.facets)) return false;
    return true;
  });

  const sorted = [...filtered];
  switch (state.sort) {
    case "name-asc":
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      sorted.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "category":
      sorted.sort(
        (a, b) =>
          a.category.localeCompare(b.category) || a.name.localeCompare(b.name),
      );
      break;
    case "relevance":
    default:
      // Keep source order (curated) as the relevance baseline.
      break;
  }

  return sorted;
}

/** Count how many products remain if a single facet value were toggled on. */
export function countActiveFacets(facets: Record<string, string[]>): number {
  return Object.values(facets).reduce((sum, values) => sum + values.length, 0);
}
