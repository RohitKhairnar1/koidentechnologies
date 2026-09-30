import Link from "next/link";
import { Illustration } from "./Illustration";
import type { ArtKey } from "./illustrations";

interface IndustryRowProps {
  number: string;
  eyebrow: string;
  title: string;
  body: string;
  points?: string[];
  href: string;
  linkLabel: string;
  art: ArtKey;
  image?: string;
  /** When true, image sits on the right on desktop (default is left). */
  reverse?: boolean;
}

/**
 * Numbered, image-led application row. Alternating `reverse` across the
 * section produces the zig-zag storytelling layout with generous whitespace.
 */
export function IndustryRow({
  number,
  eyebrow,
  title,
  body,
  points,
  href,
  linkLabel,
  art,
  image,
  reverse = false,
}: IndustryRowProps) {
  return (
    <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16 lg:gap-20">
      <div className={reverse ? "md:order-2" : ""}>
        <Illustration
          art={art}
          src={image}
          alt={title}
          ratio="aspect-[5/4]"
          variant="steel"
          className="rounded-xl2"
        />
      </div>

      <div className={reverse ? "md:order-1" : ""}>
        <div className="flex items-center gap-4">
          <span className="text-5xl font-semibold tracking-tight text-line md:text-6xl">
            {number}
          </span>
          <span className="eyebrow">{eyebrow}</span>
        </div>

        <h3 className="mt-4 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          {title}
        </h3>

        <p className="mt-4 max-w-md text-base leading-relaxed text-slate">
          {body}
        </p>

        {points && points.length > 0 && (
          <ul className="mt-6 space-y-3">
            {points.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 text-sm text-slate"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  aria-hidden
                  className="mt-0.5 flex-none text-brand"
                >
                  <path
                    d="M5 10.5l3.5 3.5L15 6.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {point}
              </li>
            ))}
          </ul>
        )}

        <Link href={href} className="arrow-link mt-8">
          {linkLabel} <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}