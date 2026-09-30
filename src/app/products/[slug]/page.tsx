import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BulkEnquiryForm } from "@/components/BulkEnquiryForm";
import { Illustration } from "@/components/Illustration";
import { ProductCard } from "@/components/ProductCard";
import { JsonLd } from "@/components/JsonLd";
import {
  categoryMap,
  getProduct,
  products,
  productsByCategory,
} from "@/data/products";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };
  return { title: product.name, description: product.summary };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = categoryMap[product.category];
  const related = productsByCategory(product.category)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);
  const hasSpecs = !!product.specs && product.specs.length > 0;

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    category: category.name,
    additionalProperty: [
      { "@type": "PropertyValue", name: "Product type", value: product.productType },
      { "@type": "PropertyValue", name: "Application", value: product.application },
    ],
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Products", item: `${site.url}/products` },
      {
        "@type": "ListItem",
        position: 2,
        name: category.name,
        item: `${site.url}/products?category=${category.id}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `${site.url}/products/${product.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={productLd} />
      <JsonLd data={breadcrumbLd} />

      {/* Breadcrumb */}
      <div className="border-b border-line bg-light">
        <div className="container-content flex items-center gap-2 py-4 text-sm text-muted">
          <Link href="/products" className="hover:text-ink">Products</Link>
          <span aria-hidden>/</span>
          <Link href={`/products?category=${category.id}`} className="hover:text-ink">
            {category.name}
          </Link>
          <span aria-hidden>/</span>
          <span className="text-ink">{product.name}</span>
        </div>
      </div>

      {/* Overview */}
      <section className="container-content grid gap-10 py-12 md:grid-cols-2 md:gap-16 md:py-16">
        <div>
          <Illustration
            art={product.art}
            src={product.image}
            alt={product.name}
            ratio="aspect-square"
            className="rounded-xl2"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div>
          <p className="eyebrow">{category.name}</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
            {product.name}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate">{product.summary}</p>

          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-6">
            <div>
              <dt className="text-xs font-medium uppercase tracking-eyebrow text-muted">Category</dt>
              <dd className="mt-1 text-sm font-semibold text-ink">{category.name}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-eyebrow text-muted">Application</dt>
              <dd className="mt-1 text-sm font-semibold text-ink">{product.application}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-eyebrow text-muted">Product type</dt>
              <dd className="mt-1 text-sm font-semibold text-ink">{product.productType}</dd>
            </div>
          </dl>

          <div className="mt-8 rounded-xl2 border border-line bg-light p-5 text-sm leading-relaxed text-slate">
            Pricing is quoted per order. Submit the enquiry below with your
            quantity and we&rsquo;ll respond with availability, lead time, and a
            price for that volume.
          </div>

          <a href="#enquiry" className="btn-primary mt-6 !px-8 !py-4 text-base">
            Enquire About This Product
          </a>
        </div>
      </section>

      {/* Specifications */}
      <section className="border-y border-line bg-light">
        <div className="container-content py-14 md:py-16">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">Specifications</h2>
          {hasSpecs ? (
            <div className="mt-5 max-w-3xl overflow-x-auto">
              <table className="w-full text-sm">
                <tbody>
                  {product.specs!.map((spec) => (
                    <tr key={spec.label} className="border-b border-line">
                      <th scope="row" className="w-1/2 py-3 pr-4 text-left font-medium text-slate">
                        {spec.label}
                      </th>
                      <td className="py-3 text-ink">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="mt-5 max-w-3xl rounded-xl2 border border-line bg-white p-6">
              <p className="text-base font-medium text-ink">Specifications available on request.</p>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                Tell us the exact specification and quantity you need in your
                enquiry, and we&rsquo;ll confirm the details with your quote.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Enquiry — replaces the retail cart */}
      <section id="enquiry" className="container-content py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <div>
            <p className="eyebrow">Bulk enquiry</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Enquire about {product.name}.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate">
              This is a business-to-business enquiry — not a retail checkout.
              Share your quantity and application and we&rsquo;ll reply with a
              quote tailored to your order.
            </p>
            <p className="mt-6 rounded-lg border border-line bg-light p-4 text-sm text-slate">
              Need a different specification or quantity?{" "}
              <Link href="/contact" className="font-semibold text-brand hover:text-brand-strong">
                Contact our team
              </Link>
              .
            </p>
          </div>
          <div className="card p-6 md:p-8">
            <BulkEnquiryForm productName={product.name} productSlug={product.slug} />
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-line bg-light">
          <div className="container-content py-14 md:py-16">
            <h2 className="text-2xl font-semibold tracking-tight text-ink">
              More in {category.name}
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
