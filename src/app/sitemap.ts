import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { products, categories } from "@/data/products";
import { resources } from "@/data/resources";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/products", priority: 0.9 },
    { path: "/resources", priority: 0.6 },
    { path: "/how-to-order", priority: 0.6 },
    { path: "/about", priority: 0.5 },
    { path: "/contact", priority: 0.7 },
  ].map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: r.priority,
  }));

  const categoryRoutes = categories.map((c) => ({
    url: `${site.url}/products?category=${c.id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const productRoutes = products.map((p) => ({
    url: `${site.url}/products/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const resourceRoutes = resources.map((r) => ({
    url: `${site.url}/resources/${r.slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.4,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes, ...resourceRoutes];
}
