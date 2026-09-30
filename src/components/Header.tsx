"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { nav, site } from "@/lib/site";
import { categories } from "@/data/products";
import { Logo } from "./Logo";

export function Header() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [query, setQuery] = useState("");

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/products?q=${encodeURIComponent(q)}` : "/products");
    setSearchOpen(false);
    setMobileOpen(false);
    setQuery("");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur-md">
      <div className="mx-auto w-full max-w-[1920px] px-5 sm:px-8 lg:px-12 flex h-[72px] items-center justify-between gap-6">
        {/* Left: logo + primary nav grouped together */}
        <div className="flex items-center gap-6 lg:gap-10">
        {/* Logo */}
        <Link href="/" aria-label={`${site.name} home`}>
          <Logo /> 
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {/* Products mega-menu — opens on hover (mouse), click (touch), and
              keyboard (focus + Enter/Space); closes on Escape or focus-out. */}
          <div
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                setProductsOpen(false);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") setProductsOpen(false);
            }}
          >
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={productsOpen}
              aria-controls="products-menu"
              onClick={() => setProductsOpen((v) => !v)}
              className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-slate transition-colors hover:bg-light hover:text-ink"
            >
              Products
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                aria-hidden
                className={`mt-0.5 opacity-60 transition-transform ${productsOpen ? "rotate-180" : ""}`}
              >
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </button>

            <div
              id="products-menu"
              className={`absolute left-0 top-full z-50 w-[560px] max-w-[calc(100vw-3rem)] pt-3 transition-all duration-150 ${
                productsOpen ? "visible opacity-100" : "invisible opacity-0"
              }`}
            >
              <div className="card p-3">
                <div className="grid grid-cols-2 gap-1">
                  {categories.map((c) => (
                    <Link
                      key={c.id}
                      href={`/products?category=${c.id}`}
                      onClick={() => setProductsOpen(false)}
                      className="rounded-lg p-3 transition-colors hover:bg-light"
                    >
                      <span className="block text-sm font-semibold text-ink">{c.name}</span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-muted">
                        {c.blurb}
                      </span>
                    </Link>
                  ))}
                </div>
                <Link
                  href="/products"
                  onClick={() => setProductsOpen(false)}
                  className="mt-1 flex items-center justify-between rounded-lg bg-navy px-4 py-3 text-sm font-semibold text-white hover:bg-navy-700"
                >
                  Browse the full catalog
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </div>

          {nav
            .filter((item) => item.label !== "Products")
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-slate transition-colors hover:bg-light hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
        </nav>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSearchOpen((v) => !v)}
            aria-label="Search products"
            aria-expanded={searchOpen}
            className="grid h-10 w-10 place-items-center rounded-full text-slate transition-colors hover:bg-light hover:text-ink"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
              <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.8" />
              <path d="M14 14l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>

          <Link href="/contact" className="btn-primary hidden !px-5 !py-2.5 sm:inline-flex">
            Request a quote
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            className="grid h-10 w-10 place-items-center rounded-full text-ink hover:bg-light lg:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
              {mobileOpen ? (
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              ) : (
                <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Search bar */}
      {searchOpen && (
        <div className="border-t border-line bg-white">
          <form onSubmit={submitSearch} className="mx-auto w-full max-w-[1920px] px-5 sm:px-8 lg:px-12 flex items-center gap-3 py-4">
            <label htmlFor="header-search" className="sr-only">
              Search products
            </label>
            <input
              id="header-search"
              autoFocus
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search cells, BMS boards, nickel strip…"
              className="w-full rounded-full border border-line bg-light px-5 py-3 text-sm text-ink placeholder:text-muted focus:border-brand"
            />
            <button type="submit" className="btn-primary !py-3">
              Search
            </button>
          </form>
        </div>
      )}

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="border-t border-line bg-white lg:hidden">
          <nav className="mx-auto w-full max-w-[1920px] px-5 sm:px-8 lg:px-12 flex flex-col py-4" aria-label="Mobile">
            <span className="px-2 pb-1 pt-2 text-xs font-semibold uppercase tracking-eyebrow text-muted">
              Products
            </span>
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/products?category=${c.id}`}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-2 py-2.5 text-sm font-medium text-ink hover:bg-light"
              >
                {c.name}
              </Link>
            ))}
            <div className="my-2 h-px bg-line" />
            {nav
              .filter((item) => item.label !== "Products")
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-2 py-2.5 text-sm font-medium text-ink hover:bg-light"
                >
                  {item.label}
                </Link>
              ))}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="btn-primary mt-3"
            >
              Request a quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
