import Link from "next/link";
import { Illustration } from "./Illustration";
import type { ArtKey } from "./illustrations";

/** Reusable application / solution card. */
export function SolutionCard({
  title,
  description,
  href,
  cta,
  art,
  image,
}: {
  title: string;
  description: string;
  href: string;
  cta: string;
  art: ArtKey;
  image?: string;
}) {
  return (
    <div className="card card-hover group flex flex-col overflow-hidden">
      {image ? (
        <div className="aspect-[16/10] w-full overflow-hidden bg-white">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        <Illustration
          art={art}
          alt={title}
          ratio="aspect-[16/10]"
          variant="steel"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
      )}

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold tracking-tight text-ink">
          {title}
        </h3>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">
          {description}
        </p>

        <Link href={href} className="arrow-link mt-5">
          {cta} <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}