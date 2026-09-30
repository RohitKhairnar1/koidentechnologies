import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-content flex flex-col items-center justify-center py-32 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
        This page could not be found.
      </h1>
      <p className="mt-4 max-w-md text-lg text-slate">
        The page may have moved. Head back to the catalog or the homepage.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link href="/products" className="btn-primary">Browse the catalog</Link>
        <Link href="/" className="btn-outline">Go home</Link>
      </div>
    </section>
  );
}
