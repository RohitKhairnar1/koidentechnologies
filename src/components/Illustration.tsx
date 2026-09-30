import Image from "next/image";
import { artRegistry, type ArtKey } from "./illustrations";

/**
 * Renders branded vector art on a navy/steel frame — or, once you have real
 * photography, an optimised next/image. Drop a file in /public and pass its
 * path as `src` (or set `image` on a product); the illustration becomes the
 * fallback with no other changes.
 *
 * `hover` enables a smooth 4% zoom when an ancestor `.group` is hovered.
 * Pass `children` to overlay content (e.g. a dark scrim + CTA) on top.
 */
export function Illustration({
  art = "generic",
  alt,
  src,
  ratio = "aspect-[4/3]",
  variant = "navy",
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  hover = false,
  children,
}: {
  art?: ArtKey;
  alt: string;
  src?: string;
  ratio?: string;
  variant?: "navy" | "steel";
  className?: string;
  sizes?: string;
  hover?: boolean;
  children?: React.ReactNode;
}) {
  const surface = variant === "steel" ? "photo-steel" : "photo-navy";
  const Art = artRegistry[art] ?? artRegistry.generic;

  return (
    <div
      className={`photo-grid relative isolate overflow-hidden ${surface} ${ratio} ${className}`}
      role="img"
      aria-label={alt}
    >
      <div
        className={`absolute inset-0 ${
          hover ? "transition-transform duration-500 ease-out group-hover:scale-[1.04]" : ""
        }`}
      >
        {src ? (
          <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
        ) : (
          <div className="grid h-full w-full place-items-center p-4">
            <Art className="h-full max-h-[94%] w-full max-w-[94%] drop-shadow-lg" />
          </div>
        )}
      </div>
      {children}
    </div>
  );
}
