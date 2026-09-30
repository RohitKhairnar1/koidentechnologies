import Link from "next/link";
import type { Product } from "@/data/products";
import { categoryMap } from "@/data/products";
import { Illustration } from "./Illustration";

export function ProductCard({ product }: { product: Product }) {
  const href = `/products/${product.slug}`;

  return (
    <div className="group card card-hover flex flex-col overflow-hidden">
      <Link href={href} aria-label={product.name}>
        <Illustration
          art={product.art}
          src={product.image}
          alt={product.name}
          ratio="aspect-[4/3]"
          hover
          sizes="(max-width: 640px) 100vw, 33vw"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-semibold uppercase tracking-eyebrow text-muted">
          {categoryMap[product.category].name}
        </span>

        <h3 className="mt-2 text-base font-semibold leading-snug tracking-tight text-ink">
          <Link href={href} className="hover:text-brand">
            {product.name}
          </Link>
        </h3>

        {/* One short line only — full description lives on the detail page */}
        <p className="mt-1.5 line-clamp-1 text-sm text-slate">{product.tagline}</p>

        {/* Key spec chips — 2–3 scannable highlights, not the whole spec dump */}
        {product.keySpecs && product.keySpecs.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {product.keySpecs.slice(0, 3).map((spec) => (
              <li
                key={spec}
                className="rounded-md border border-line bg-white px-2 py-1 text-[11px] font-medium text-ink"
              >
                {spec}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-brand-tint px-2.5 py-0.5 text-xs font-medium text-brand-strong">
            {product.application}
          </span>
          <span className="rounded-full bg-light px-2.5 py-0.5 text-xs font-medium text-slate">
            {product.productType}
          </span>
        </div>

        <div className="mt-5 flex items-center gap-4">
          <Link href={`${href}#enquiry`} className="btn-primary !px-4 !py-2 text-xs">
            Enquire
          </Link>
          <Link href={href} className="arrow-link text-sm">
            Details <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}