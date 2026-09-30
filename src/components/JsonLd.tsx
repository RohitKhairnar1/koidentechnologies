/**
 * Renders a JSON-LD structured-data block. Search engines read this to
 * understand the organisation, products, and breadcrumbs. It's inert markup —
 * no client JS, no user-facing output.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is trusted, server-generated content.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
