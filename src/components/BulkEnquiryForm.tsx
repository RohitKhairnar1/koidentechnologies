"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

interface BulkEnquiryFormProps {
  /** Pre-fills and locks the product context when opened from a product page. */
  productName?: string;
  productSlug?: string;
}

export function BulkEnquiryForm({ productName, productSlug }: BulkEnquiryFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl2 border border-brand/30 bg-brand-tint p-8 text-center">
        <h3 className="text-lg font-semibold text-brand-strong">Enquiry received.</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate">
          Thank you. We&rsquo;ll reply to the email you provided with availability,
          lead time, and bulk pricing. For anything urgent, call us during
          business hours.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-brand hover:text-brand-strong"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Honeypot: hidden from real users, tempting to bots. If filled, the
          API treats the submission as spam. Not a substitute for a real spam
          service, but catches naive bots with zero user friction. */}
      <div aria-hidden className="hidden" tabIndex={-1}>
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {productName && (
        <>
          <input type="hidden" name="productName" value={productName} />
          <input type="hidden" name="productSlug" value={productSlug ?? ""} />
          <div className="rounded-lg border border-line bg-light px-4 py-3 text-sm">
            <span className="text-muted">Enquiring about </span>
            <span className="font-semibold text-ink">{productName}</span>
          </div>
        </>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" required autoComplete="name" />
        <Field label="Company" name="company" required autoComplete="organization" />
        <Field label="Work email" name="email" type="email" required autoComplete="email" />
        <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Quantity required"
          name="quantity"
          placeholder="e.g. 5,000 units / 20 kg"
          required
        />
        <Field
          label="Delivery location"
          name="location"
          placeholder="City, State"
          autoComplete="address-level2"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-ink">
          Application &amp; requirements
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder="Tell us about the pack, target specs, timeline, and any documentation you need."
          className="mt-1.5 w-full rounded-lg border border-line bg-light px-3 py-2.5 text-sm text-ink placeholder:text-muted focus:border-brand focus:bg-white"
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send bulk enquiry"}
        </button>
        <p className="text-xs text-muted">
          We use these details only to respond to your enquiry.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-ink">
        {label}
        {required && <span className="text-brand"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="mt-1.5 w-full rounded-lg border border-line bg-light px-3 py-2.5 text-sm text-ink placeholder:text-muted focus:border-brand focus:bg-white"
      />
    </div>
  );
}
