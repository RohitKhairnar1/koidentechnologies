/**
 * Central place for company details used across the site.
 *
 * NOTE: Values marked "TODO" are placeholders. Replace them with Koiden's
 * verified details before launch. Nothing here should assert a claim
 * (certification, client count, tenure, etc.) that the company cannot back up.
 */
export const site = {
  name: "Koiden Technologies",
  shortName: "Koiden",
  // Canonical site URL. Override at build time with NEXT_PUBLIC_SITE_URL.
  // TODO: replace the fallback with the real production domain before launch.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://koiden.example",
  tagline: "Industrial supply for battery pack manufacturing",
  description:
    "Koiden Technologies supplies battery cells, BMS boards, nickel strips, and pack-assembly materials to manufacturers and integrators across India.",
  // TODO: replace with the registered business email/phone/address.
  email: "koidentechnologies@gmail.com",
  phone: "+91 74987 96715",
  address: {
    line1: "Gat No. 90/4, Golegaon Road, Markal, Taluka-Khed",
    city: "Pune",
    state: "Maharashtra",
    postalCode: "412105",
    country: "India",
  },
  // TODO: add GSTIN / CIN once confirmed. Displayed in the footer.
  registration: "",
  hours: "Mon–Sat, 10:00–18:00 IST",
} as const;

export const nav = [
  { label: "Products", href: "/products" },
  { label: "Industries", href: "/#industries" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
] as const;
