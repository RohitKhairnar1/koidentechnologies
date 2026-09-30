import Link from "next/link";
import { Illustration } from "./Illustration";
import type { Category } from "@/data/products";

type Layout = "feature" | "wide" | "tile";

/** Dark scrim + CTA that fades/rises in on hover (image-level flourish). */
function HoverCta({ label }: { label: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-end bg-gradient-to-t from-navy/80 via-navy/10 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      <span className="btn-primary !px-5 !py-2 translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
        {label} <span aria-hidden>→</span>
      </span>
    </div>
  );
}

function ProductChips({ names }: { names: string[] }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-1.5">
      {names.map((name) => (
        <li
          key={name}
          className="rounded-full bg-light px-2.5 py-1 text-xs font-medium text-slate"
        >
          {name}
        </li>
      ))}
    </ul>
  );
}

/**
 * One category card in the homepage Products showcase. `layout` drives the
 * arrangement so the section mixes a large split feature, a wide horizontal
 * card, and image-top tiles — rather than a grid of identical cards.
 */
export function CategoryShowcaseCard({
  category,
  products,
  layout,
}: {
  category: Category;
  products: string[];
  layout: Layout;
}) {
  const href = `/products?category=${category.id}`;

  const Header = (
    <div className="flex items-baseline gap-3">
      <span className="text-sm font-semibold text-brand">{category.number}</span>
      <h3
        className={
          layout === "feature"
            ? "text-2xl font-semibold tracking-tight text-ink md:text-3xl"
            : "text-xl font-semibold tracking-tight text-ink"
        }
      >
        {category.name}
      </h3>
    </div>
  );

  if (layout === "tile") {
    return (
      <Link href={href} className="group card card-hover flex flex-col overflow-hidden">
        <Illustration art={category.art} src={category.image} alt={category.name} ratio="aspect-[16/10]" hover sizes="(max-width: 768px) 100vw, 33vw">
          <HoverCta label="View products" />
        </Illustration>
        <div className="flex flex-1 flex-col p-6">
          {Header}
          <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">{category.blurb}</p>
          <ProductChips names={products} />
          <span className="arrow-link mt-5 group-hover:gap-2.5">
            View products <span aria-hidden>→</span>
          </span>
        </div>
      </Link>
    );
  }

  // feature + wide share a side-by-side layout, differing in proportion/scale.
  const grid =
    layout === "feature"
      ? "md:grid-cols-2"
      : "md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]";

  return (
    <Link href={href} className={`group card card-hover grid overflow-hidden ${grid}`}>
      <Illustration
        art={category.art}
        src={category.image}
        alt={category.name}
        ratio="aspect-[16/10] md:aspect-auto md:h-full"
        variant={layout === "feature" ? "navy" : "steel"}
        hover
        sizes="(max-width: 768px) 100vw, 50vw"
      >
        <HoverCta label="View products" />
      </Illustration>
      
      <div className={`flex flex-col justify-center ${layout === "feature" ? "p-8 md:p-10" : "p-6 md:p-8"}`}>
        {Header}
        <p className={`mt-3 leading-relaxed text-slate ${layout === "feature" ? "text-base" : "text-sm"}`}>
          {category.blurb}
        </p>
        <ProductChips names={products} />
        <span className="arrow-link mt-6 group-hover:gap-2.5">
          View products <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  );
}
