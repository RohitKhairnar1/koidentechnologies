import Link from "next/link";
import { Illustration } from "./Illustration";
import type { Resource } from "@/data/resources";

/** Image-based insights/resources card. */
export function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <Link
      href={`/resources/${resource.slug}`}
      className="card card-hover group flex flex-col overflow-hidden"
    >
      <Illustration art={resource.art} alt={resource.title} ratio="aspect-[16/9]" sizes="(max-width: 768px) 100vw, 33vw" />
      <div className="flex flex-1 flex-col p-6">
        <span className="text-xs font-semibold uppercase tracking-eyebrow text-brand">
          {resource.kind}
        </span>
        <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight text-ink">
          {resource.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">{resource.excerpt}</p>
        <span className="arrow-link mt-5 group-hover:gap-2.5">
          Read guide <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  );
}
