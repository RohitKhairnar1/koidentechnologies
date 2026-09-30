/**
 * Product catalog data.
 *
 * IMPORTANT — honesty rules baked in:
 *  - No prices anywhere (quote-based B2B).
 *  - No invented technical specifications. `specs` is left undefined unless
 *    real, verified specs are supplied; detail pages then show
 *    "Specifications available on request".
 *  - Each product maps to a DISTINCT illustration (`art`) that matches
 *    the product type. When real photography is available, set `image`
 *    to a file in /public and it replaces the illustration automatically.
 *
 * CARD vs DETAIL:
 *  - `tagline`  → one short line shown on the product card.
 *  - `keySpecs` → 2–3 short highlight chips shown on the product card.
 *  - `summary`  → longer description shown on the product detail page.
 *  - `specs`    → full structured spec table shown on the product detail page.
 */

import type { ArtKey } from "@/components/illustrations";

export type CategoryId =
  | "battery-cells"
  | "battery-management"
  | "battery-pack-components"
  | "battery-insulation-protection";

export interface Category {
  id: CategoryId;
  number: string;
  name: string;
  blurb: string;
  art: ArtKey;
  image?: string;
}

export interface Spec {
  label: string;
  value: string;
}

export interface Product {
  slug: string;
  name: string;
  category: CategoryId;
  productType: string;
  application: string;
  /** Short, single-line summary — shown on the product CARD. */
  tagline: string;
  /** Longer description — shown on the product DETAIL page. */
  summary: string;
  /** 2–3 short highlight chips — shown on the product CARD. */
  keySpecs?: string[];
  art: ArtKey;
  /** Optional real photo in /public (e.g. "/images/18650.jpg"). */
  image?: string;
  /** Only set when real, verified specs are supplied. Full table — DETAIL page. */
  specs?: Spec[];
  /** Derived filter facets (Product Type + Application). */
  facets: Record<string, string>;
}

export const categories: Category[] = [
  {
    id: "battery-cells",
    number: "01",
    name: "Battery Cells",
    blurb:
      "Lithium-ion and lithium iron phosphate cells for battery pack assembly, energy storage, and mobility applications.",
    image: "/images/Battery-cells-1.png",
    art: "cell-18650",
  },
  {
    id: "battery-management",
    number: "02",
    name: "Battery Management Systems (BMS)",
    blurb:
      "Battery management and balancing solutions for protecting, monitoring, and managing lithium battery packs.",
    image: "/images/Battery-Management.png",
    art: "bms",
  },
  {
    id: "battery-pack-components",
    number: "03",
    name: "Battery Pack Components",
    blurb:
      "Interconnects, holders, connectors, housings, and hardware used to assemble and complete battery packs.",
    image: "/images/pack-components.png",
    art: "housing",
  },
  {
    id: "battery-insulation-protection",
    number: "04",
    name: "Battery Insulation & Protection",
    blurb:
      "Insulation, wrapping, cushioning, and protective materials used during battery pack assembly.",
    image: "/images/Battery-Assembly-Components1.png",
    art: "tape",
  },
];

export const categoryMap: Record<CategoryId, Category> = Object.fromEntries(
  categories.map((c) => [c.id, c]),
) as Record<CategoryId, Category>;

type ProductInput = Omit<Product, "facets">;

function make(p: ProductInput): Product {
  return {
    ...p,
    facets: {
      "Product Type": p.productType,
      Application: p.application,
    },
  };
}

export const products: Product[] = [
  // ─────────────────────────────────────────────────────────────────
  // 01 — BATTERY CELLS
  // ─────────────────────────────────────────────────────────────────

  make({
    slug: "dmegc-18650-li-ion-cells",
    name: "3.7V DMEGC 18650 Li-Ion Cells",
    category: "battery-cells",
    productType: "Cylindrical cell (Li-ion)",
    application: "E-mobility",
    image: "/images/18650.jpg",
    art: "cell-18650",
    tagline: "High-rate 18650 Li-ion cell for e-mobility packs.",
    keySpecs: ["2650mAh+", "3C EV Grade", "200 cells/box"],
    summary:
      "DMEGC 18650 3.7V lithium-ion cylindrical cell rated 3C, built for electric-mobility battery packs. Supplied in standard 200-cell boxes for pack assembly.",
    specs: [
      { label: "Model", value: "DMEGC18650-2600mAh 3C" },
      { label: "Capacity", value: "2650mAh+" },
      { label: "Internal Resistance", value: "15–17 mΩ" },
      { label: "Grade", value: "3C EV Grade" },
      { label: "Packaging", value: "200 cells / box" },
      { label: "Weight", value: "10 kg / box" },
    ],
  }),

  make({
    slug: "norda-18650-li-ion-cells",
    name: "3.7V NORDA 18650 Li-Ion Cells",
    category: "battery-cells",
    productType: "Cylindrical cell (Li-ion)",
    application: "E-mobility",
    image: "/images/Norda 18650.jpg",
    art: "cell-18650",
    tagline: "High-rate 18650 Li-ion cell with low internal resistance.",
    keySpecs: ["2650mAh+", "IR 11–13 mΩ", "200 cells/box"],
    summary:
      "NORDA 18650 3.7V lithium-ion cylindrical cell rated 3C, with a lower internal resistance than standard grades. Supplied in 200-cell boxes for pack assembly.",
    specs: [
      { label: "Model", value: "NORDA18650-2600mAh 3C" },
      { label: "Capacity", value: "2650mAh+" },
      { label: "Internal Resistance", value: "11–13 mΩ" },
      { label: "Grade", value: "3C EV Grade" },
      { label: "Packaging", value: "200 cells / box" },
      { label: "Weight", value: "10 kg / box" },
    ],
  }),

  make({
    slug: "21700-li-ion-cells",
    name: "21700 Li-Ion Cells",
    category: "battery-cells",
    productType: "Cylindrical cell (Li-ion)",
    application: "E-mobility",
    image: "/images/21700.jpg",
    art: "cell-18650",
    tagline: "Higher-capacity 21700 cylindrical cell for e-mobility.",
    keySpecs: ["4500mAh+", "3C EV Grade", "200 cells/box"],
    summary:
      "NORDA 21700 lithium-ion cylindrical cell rated 3C, offering higher capacity than 18650 for e-mobility battery packs. Supplied in 200-cell boxes.",
    specs: [
      { label: "Model", value: "NORDA21700–4500mAh" },
      { label: "Capacity", value: "4500mAh+" },
      { label: "Internal Resistance", value: "15–17 mΩ" },
      { label: "Grade", value: "3C EV Grade" },
      { label: "Packaging", value: "200 cells / box" },
      { label: "Weight", value: "15 kg / box" },
    ],
  }),

  make({
    slug: "hx-32700-lfp-cells",
    name: "HX 32700 LFP Cells",
    category: "battery-cells",
    productType: "Cylindrical cell (LFP)",
    application: "Energy storage",
    image: "/images/32700hx.jpg",
    art: "cell-lfp",
    tagline: "High-capacity 32700 LFP cell for energy storage.",
    keySpecs: ["6000mAh+", "IR 5–7 mΩ", "100 cells/box"],
    summary:
      "Hunan Huaxing 32700 lithium iron phosphate cylindrical cell rated 3C, built for energy storage systems. Supplied in 100-cell boxes.",
    specs: [
      { label: "Manufacturer", value: "Hunan Huaxing" },
      { label: "Capacity", value: "6000mAh+" },
      { label: "Internal Resistance", value: "5–7 mΩ" },
      { label: "Grade", value: "3C EV Grade" },
      { label: "Packaging", value: "100 cells / box" },
      { label: "Weight", value: "13 kg / box" },
    ],
  }),

  make({
    slug: "cbak-32140-lfp-cells",
    name: "CBAK 32140 LFP Cells",
    category: "battery-cells",
    productType: "Cylindrical cell (LFP)",
    image: "/images/cbak32140.jpg",
    application: "Energy storage",
    art: "cell-lfp",
    tagline: "15Ah LFP cell rated for 2,500 life cycles.",
    keySpecs: ["15.5Ah+", "A6/A7 Grade", "2,500 cycles"],
    summary:
      "CBAK 32140 lithium iron phosphate cell, A6/A7 grade, rated 15Ah for ESS and EV applications. Supplied in 40-cell boxes.",
    specs: [
      { label: "Model", value: "CBAK32140 LFP – 15Ah" },
      { label: "Grade", value: "A6/A7, ESS/EV" },
      { label: "Capacity", value: "15,500mAh+" },
      { label: "Internal Resistance", value: "2–3 mΩ" },
      { label: "Life Cycles", value: "2,500" },
      { label: "Packaging", value: "40 cells / box" },
      { label: "Weight", value: "13 kg / box" },
    ],
  }),

  make({
    slug: "jsk-32140-lfp-cells",
    name: "JSK 32140 LFP Cells",
    category: "battery-cells",
    productType: "Cylindrical cell (LFP)",
    image: "/images/32140.jpg",
    application: "Energy storage",
    art: "cell-lfp",
    tagline: "15Ah A-Grade LFP cell for energy storage systems.",
    keySpecs: ["15.5Ah+", "A Grade", "1,500 cycles"],
    summary:
      "JSK 32140 lithium iron phosphate cell, A grade, rated 15Ah for ESS and EV applications. Supplied in 40-cell boxes.",
    specs: [
      { label: "Model", value: "JSK32140 LFP – 15Ah" },
      { label: "Grade", value: "A, ESS/EV" },
      { label: "Capacity", value: "15,500mAh+" },
      { label: "Internal Resistance", value: "2–3 mΩ" },
      { label: "Life Cycles", value: "1,500" },
      { label: "Packaging", value: "40 cells / box" },
      { label: "Weight", value: "13 kg / box" },
    ],
  }),

  make({
    slug: "prismatic-lfp-cells",
    name: "Prismatic LFP Cells",
    category: "battery-cells",
    productType: "Prismatic cell (LFP)",
    application: "Energy storage",
    image: "/images/highpower100ah.jpg",
    art: "cell-prismatic",
    tagline: "100Ah prismatic LFP cell built for long cycle life.",
    keySpecs: ["105Ah+", "4,000 cycles", "3C EV/ESS"],
    summary:
      "Greatpower 100Ah prismatic lithium iron phosphate cell, rated 3C for EV and ESS applications with an extended 4,000-cycle life.",
    specs: [
      { label: "Manufacturer", value: "Greatpower" },
      { label: "Capacity", value: "105Ah+" },
      { label: "Internal Resistance", value: "0.3–0.4 mΩ" },
      { label: "Grade", value: "3C EV/ESS Grade" },
      { label: "Life Cycles", value: "4,000" },
    ],
  }),

  // ─────────────────────────────────────────────────────────────────
  // 02 — BATTERY MANAGEMENT SYSTEMS (BMS)
  // ─────────────────────────────────────────────────────────────────

  make({
    slug: "jbd-16s-80a-nmc-hardware-bms",
    name: "JBD 16S 80A NMC Hardware BMS",
    category: "battery-management",
    productType: "Hardware BMS",
    application: "E-mobility",
    image: "/images/jbd-16s-80a-nmc-hardware-bms.webp",
    art: "bms",
    tagline: "16S 80A hardware BMS for NMC e-mobility packs.",
    keySpecs: ["16S", "80A", "NMC"],
    summary:
      "JBD hardware BMS designed for 16S Li-ion (NMC) battery packs. Supports 80A continuous current with a common charge/discharge port, balance function, and NTC temperature monitoring. Suitable for electric bicycles, electric motorcycles, and custom lithium battery applications.",
    specs: [
      { label: "Model", value: "ZP16S011-NMC-16S-80A-B-T" },
      { label: "Configuration", value: "16S" },
      { label: "Chemistry", value: "Li-ion (NMC)" },
      { label: "Continuous Current", value: "80A" },
      { label: "Port Type", value: "Common charge / discharge" },
      { label: "Features", value: "Balance function, NTC monitoring" },
      { label: "Applications", value: "E-bicycles, e-motorcycles, custom packs" },
    ],
  }),

  make({
    slug: "jbd-8s-60a-150a-lfp-nmc-bms",
    name: "JBD 8S 60A–150A BMS",
    category: "battery-management",
    productType: "Hardware BMS",
    application: "Energy storage",
    image: "/images/jbd-8s-60a-150a-lfp-nmc-bms.webp",
    art: "bms",
    tagline: "8S 24V hardware BMS with up to 150A continuous current.",
    keySpecs: ["8S / 24V", "up to 150A", "LiFePO4"],
    summary:
      "JBD hardware BMS for 8S LiFePO4 battery packs in 24V systems, offered in 60A, 100A, and 150A continuous-current options. Includes a common charge/discharge port, balance function, external NTC, and a full protection suite.",
    specs: [
      { label: "Model", value: "ZP10S036" },
      { label: "Configuration", value: "8S (24V)" },
      { label: "Chemistry", value: "LiFePO4" },
      { label: "Current Options", value: "60A / 100A / 150A" },
      {
        label: "Protections",
        value: "Overcharge, over-discharge, over-current, short-circuit, temperature, drop-line",
      },
    ],
  }),

  make({
    slug: "jbd-4s-50a-120a-lfp-bms",
    name: "JBD 4S 50A–120A LiFePO4 BMS",
    category: "battery-management",
    productType: "Hardware BMS",
    application: "Energy storage",
    image: "/images/jbd-4s-50a-120a-lfp-bms.webp",
    art: "bms",
    tagline: "4S LiFePO4 BMS for small energy storage and portable power.",
    keySpecs: ["4S", "50–120A", "LiFePO4"],
    summary:
      "JBD hardware BMS designed for 4S LiFePO4 battery packs, supporting 50A–120A continuous current with a common charge/discharge port, balance function, and external NTC monitoring. Suitable for small ESS, solar street lights, lead-acid replacement, and portable power.",
    specs: [
      { label: "Model", value: "ZP04S014" },
      { label: "Configuration", value: "4S" },
      { label: "Chemistry", value: "LiFePO4" },
      { label: "Current", value: "50A–120A" },
      {
        label: "Applications",
        value: "Small ESS, solar street lights, lead-acid replacement, portable power",
      },
    ],
  }),

  make({
    slug: "jbd-7s-24s-40a-80a-smart-bms",
    name: "JBD 7S–24S 40A–80A Smart BMS",
    category: "battery-management",
    productType: "Smart BMS",
    application: "E-mobility",
    image: "/images/jbd-7s-24s-40a-80a-smart-bms.webp",
    art: "bms",
    tagline: "Bluetooth-enabled smart BMS for 24V–80V e-mobility packs.",
    keySpecs: ["7S–24S", "40–80A", "Bluetooth"],
    summary:
      "JBD smart BMS for 7S–24S LiFePO4 and 7S–20S Li-ion (NMC) battery packs, supporting 40A–80A current and 24V–80V systems. Built-in Bluetooth enables app monitoring and configuration, with UART support for PC software and LCD displays.",
    specs: [
      { label: "Model", value: "DB24SA03" },
      { label: "Configuration", value: "7S–24S (LFP) / 7S–20S (NMC)" },
      { label: "System Voltage", value: "24V–80V" },
      { label: "Current Options", value: "40A / 80A" },
      { label: "Communication", value: "Bluetooth (App), UART (PC / LCD)" },
      {
        label: "Applications",
        value: "E-bikes, motorcycles, tricycles, low-speed EVs, DIY packs",
      },
    ],
  }),

  make({
    slug: "jbd-10s-17s-20a-120a-smart-bms",
    name: "JBD 10S–17S 20A–120A Smart BMS",
    category: "battery-management",
    productType: "Smart BMS",
    application: "E-mobility",
    image: "/images/jbd-10s-17s-20a-120a-smart-bms.webp",
    art: "bms",
    tagline: "Auto-detecting smart BMS spanning 10S–17S configurations.",
    keySpecs: ["10S–17S", "20–120A", "Bluetooth"],
    summary:
      "JBD smart BMS for LiFePO4 and Li-ion (NMC) packs with automatic 10S–17S string identification and 20A–120A current options. Features built-in Bluetooth, balance cable, UART communication, app monitoring, and LCD display support.",
    specs: [
      { label: "Configuration", value: "10S–17S (auto-detect)" },
      { label: "Chemistry", value: "LiFePO4 / Li-ion (NMC)" },
      { label: "Current Options", value: "20A–120A" },
      { label: "Communication", value: "Bluetooth, UART" },
    ],
  }),

  make({
    slug: "daly-smart-bms",
    name: "DALY Smart BMS",
    category: "battery-management",
    productType: "Smart BMS",
    application: "EV / Energy storage",
    image: "/images/daly-smart-bms.webp",
    art: "bms",
    tagline: "Cloud-connected smart BMS for 4S–24S multi-chemistry packs.",
    keySpecs: ["4S–24S", "Bluetooth + IoT", "CAN/RS485"],
    summary:
      "DALY smart BMS compatible with 4S–24S packs across LiFePO4, Li-ion, and LTO chemistries. Features Bluetooth app monitoring, IoT cloud platform support, automatic string-count identification, and CAN, RS485, and dual UART interfaces.",
    specs: [
      { label: "Configuration", value: "4S–24S (auto-detect)" },
      { label: "Chemistry", value: "LiFePO4, Li-ion, LTO" },
      { label: "Communication", value: "Bluetooth, CAN, RS485, dual UART" },
      { label: "Features", value: "IoT cloud platform, app monitoring" },
    ],
  }),

  make({
    slug: "daly-m-series-bms",
    name: "DALY M Series BMS",
    category: "battery-management",
    productType: "High-current BMS",
    application: "Golf carts / Utility vehicles",
    image: "/images/daly-m-series-bms.webp",
    art: "bms",
    tagline: "High-current BMS built for golf carts and utility vehicles.",
    keySpecs: ["3S–24S", "150–200A", "Waterproof"],
    summary:
      "DALY M Series standard BMS for high-current applications, supporting 3S–24S LiFePO4 and Li-ion packs in 150A and 200A variants. Designed for golf carts and sightseeing vehicles with waterproofing and reduced temperature rise.",
    specs: [
      { label: "Configuration", value: "3S–24S" },
      { label: "Current Options", value: "150A / 200A" },
      { label: "Chemistry", value: "LiFePO4 / Li-ion" },
      { label: "Features", value: "Waterproof, low temperature rise" },
      { label: "Applications", value: "Golf carts, sightseeing vehicles" },
    ],
  }),

  make({
    slug: "daly-g-series-bms",
    name: "DALY G Series BMS",
    category: "battery-management",
    productType: "Standard BMS",
    application: "E-mobility",
    image: "/images/daly-g-series-bms.webp",
    art: "bms",
    tagline: "Compact standard BMS for light e-mobility applications.",
    keySpecs: ["3S–13S", "15A / 20A"],
    summary:
      "DALY G Series standard BMS for 3S–13S lithium packs, available in 15A and 20A variants. Suitable for Li-ion and LiFePO4 applications including e-bicycles, two-wheelers, wheelchairs, scooters, hoverboards, and solar street lights.",
    specs: [
      { label: "Configuration", value: "3S–13S" },
      { label: "Current Options", value: "15A / 20A" },
      { label: "Chemistry", value: "Li-ion / LiFePO4" },
      {
        label: "Applications",
        value: "E-bicycles, two-wheelers, wheelchairs, scooters, hoverboards, solar lights",
      },
    ],
  }),

  make({
    slug: "daly-h-series-bms",
    name: "DALY H Series BMS",
    category: "battery-management",
    productType: "Standard BMS",
    application: "E-mobility",
    image: "/images/daly-h-series-bms.webp",
    art: "bms",
    tagline: "Rugged standard BMS with a full protection suite for 18650 packs.",
    keySpecs: ["3S–16S", "40A / 60A"],
    summary:
      "DALY H Series standard BMS for 3S–16S lithium packs, available in 40A and 60A variants. Designed for 18650-based and other Li-ion or LiFePO4 applications with a comprehensive protection suite.",
    specs: [
      { label: "Configuration", value: "3S–16S" },
      { label: "Current Options", value: "40A / 60A" },
      { label: "Chemistry", value: "Li-ion / LiFePO4" },
      {
        label: "Protections",
        value: "Overcharge, over-discharge, over-current, short-circuit, temperature, waterproof, shock, ESD",
      },
    ],
  }),

  make({
    slug: "daly-k-series-bms",
    name: "DALY K Series BMS",
    category: "battery-management",
    productType: "Standard BMS",
    application: "AGV / E-mobility",
    image: "/images/daly-k-series-bms.webp",
    art: "bms",
    tagline: "Standard BMS built for AGV and industrial e-mobility packs.",
    keySpecs: ["3S–24S", "40–100A"],
    summary:
      "DALY K Series standard BMS for 3S–24S lithium packs, available in 40A, 60A, and 100A variants. Designed for AGV and other Li-ion or LiFePO4 applications with a comprehensive protection suite.",
    specs: [
      { label: "Configuration", value: "3S–24S" },
      { label: "Current Options", value: "40A / 60A / 100A" },
      { label: "Chemistry", value: "Li-ion / LiFePO4" },
      {
        label: "Protections",
        value: "Overcharge, over-discharge, over-current, short-circuit, temperature, waterproof, shock, ESD",
      },
      { label: "Applications", value: "AGVs, industrial e-mobility" },
    ],
  }),

  // ─────────────────────────────────────────────────────────────────
  // 03 — BATTERY PACK COMPONENTS
  // ─────────────────────────────────────────────────────────────────

  make({
    slug: "nickel-strips",
    name: "Nickel Plated Strips",
    category: "battery-pack-components",
    productType: "Interconnect",
    application: "Pack assembly",
    image: "/images/nickel-strip.jpg",
    art: "nickel-strip",
    tagline: "Nickel strip stock for spot-welded cell interconnects.",
    keySpecs: ["0.12 / 0.15mm", "5–15mm width"],
    summary:
      "Nickel-plated strip material used for spot-welded cell interconnections during battery pack assembly, available in multiple thicknesses and widths.",
    specs: [
      { label: "Thickness", value: "0.12mm / 0.15mm" },
      { label: "Width Options", value: "5mm / 8mm / 10mm / 15mm" },
      { label: "Use", value: "Spot-welded interconnects" },
    ],
  }),

  make({
    slug: "h-type-nickel-strips",
    name: "H-Type Nickel Strips",
    category: "battery-pack-components",
    productType: "Interconnect",
    application: "Pack assembly",
    image: "/images/h-type-nickel.jpg",
    art: "h-strip",
    tagline: "H-pattern nickel strips for multi-cell interconnection.",
    keySpecs: ["32700 / 32140 / 18650 / 21700", "0.12 / 0.15mm"],
    summary:
      "H-pattern nickel strips designed for cell interconnection during battery pack assembly, compatible with common cylindrical cell formats, with and without holder options.",
    specs: [
      { label: "Compatible Cells", value: "32700, 32140, 18650, 21700" },
      { label: "Thickness", value: "0.12mm / 0.15mm" },
      { label: "Pattern", value: "H-type" },
      { label: "Holder Options", value: "With / without holder" },
    ],
  }),

  make({
    slug: "cell-holders",
    name: "Cell Holders",
    category: "battery-pack-components",
    productType: "Holder / spacer",
    application: "Pack assembly",
    image: "/images/cell-holder.jpg",
    art: "cell-holder",
    tagline: "Cell holders and spacers for consistent pack alignment.",
    keySpecs: ["32700 / 32140 / 18650 / 21700", "1×1 / 1×2 / 1×3"],
    summary:
      "Cell holders and spacers used to maintain cell positioning and spacing during battery pack assembly, compatible with common cylindrical cell formats.",
    specs: [
      { label: "Compatible Cells", value: "32700, 32140, 18650, 21700" },
      { label: "Configuration", value: "1×1 / 1×2 / 1×3" },
    ],
  }),

  make({
    slug: "SB-50-connector",
    name: "SB50 Connector",
    category: "battery-pack-components",
    productType: "Electrical connector",
    application: "Pack assembly",
    image: "/images/sb50connectors.webp",
    art: "hardware",
    tagline: "Anderson SB50 power connector housing set.",
    keySpecs: ["SB50 Gray Housing"],
    summary:
      "Anderson SB50 gray power connector housing, supplied with 5900-BK and 992-BK contacts for battery pack electrical connections.",
    specs: [
      { label: "Series", value: "Anderson SB50" },
      { label: "Housing Color", value: "Gray" },
      { label: "Contacts", value: "5900-BK, 992-BK" },
    ],
  }),

  make({
    slug: "battery-housing",
    name: "Battery Housing",
    category: "battery-pack-components",
    productType: "Enclosure",
    application: "Pack assembly",
    image: "/images/housing.jpg",
    art: "housing",
    tagline: "Housings and enclosures to contain and protect packs.",
    summary:
      "Battery housings and enclosures designed to contain and protect assembled battery packs.",
  }),

  make({
    slug: "housing-handles",
    name: "Housing Handles",
    category: "battery-pack-components",
    productType: "Hardware",
    application: "Pack assembly",
    image: "/images/body-handle.jpg",
    art: "handle",
    tagline: "Handles and grips for carrying and mounting housings.",
    summary:
      "Handles and grips used for carrying, handling, and mounting battery housings.",
  }),

  // ─────────────────────────────────────────────────────────────────
  // 04 — BATTERY INSULATION & PROTECTION
  // ─────────────────────────────────────────────────────────────────

  make({
    slug: "kapton-tape",
    name: "Kapton Tape",
    category: "battery-insulation-protection",
    productType: "Insulation tape",
    application: "Pack insulation",
    image: "/images/kapton-tape.jpg",
    art: "tape",
    tagline: "Polyimide insulation tape for electrical protection.",
    keySpecs: ["12 / 24 / 48mm"],
    summary:
      "Polyimide insulation tape used for electrical insulation, masking, and protection during battery pack assembly.",
    specs: [{ label: "Width Options", value: "12mm / 24mm / 48mm" }],
  }),

  make({
    slug: "pvc-sleeves",
    name: "PVC Sleeves",
    category: "battery-insulation-protection",
    productType: "Sleeve / wrap",
    application: "Pack protection",
    image: "/images/pvc-roll.jpg",
    art: "sleeve",
    tagline: "PVC sleeving for cell and pack insulation.",
    keySpecs: ["30–630mm"],
    summary:
      "PVC sleeving used for wrapping and insulating battery cells and assembled battery packs.",
    specs: [{ label: "Size Range", value: "30mm – 630mm" }],
  }),

  make({
    slug: "heat-shrink-tubes",
    name: "Heat Shrink Tubes",
    category: "battery-insulation-protection",
    productType: "Sleeve / wrap",
    application: "Pack protection",
    image: "/images/heat-shrink-tube.jpg",
    art: "sleeve",
    tagline: "Heat-shrink tubing for terminal and cable insulation.",
    keySpecs: ["5–15mm", "100m rolls"],
    summary:
      "Heat-shrink tubing used for insulating terminals, joints, connections, and cable runs.",
    specs: [
      { label: "Diameter Options", value: "5 / 6 / 7 / 8 / 10 / 15mm" },
      { label: "Roll Length", value: "100m" },
    ],
  }),

  make({
    slug: "epoxy-sheets",
    name: "Epoxy Sheets",
    category: "battery-insulation-protection",
    productType: "Insulation sheet",
    application: "Pack insulation",
    image: "/images/epoxy-sheet.jpg",
    art: "sheet",
    tagline: "Rigid epoxy sheets for structural insulation.",
    keySpecs: ["0.5–2mm"],
    summary:
      "Rigid epoxy sheets used for electrical insulation, separation, and structural protection within battery packs.",
    specs: [{ label: "Thickness Options", value: "0.5mm / 0.8mm / 1mm / 2mm" }],
  }),

  make({
    slug: "barley-paper",
    name: "Barley Paper",
    category: "battery-insulation-protection",
    productType: "Insulation paper",
    application: "Cell insulation",
    image: "/images/barley-paper.jpg",
    art: "sheet",
    tagline: "Insulation paper for cylindrical cell protection.",
    summary:
      "Barley paper used for electrical insulation and protection during cylindrical cell and battery pack assembly.",
  }),

  make({
    slug: "two-sided-foam-tape",
    name: "Two-Sided Foam Tape",
    category: "battery-insulation-protection",
    productType: "Adhesive tape",
    application: "Pack assembly",
    image: "/images/foam-tape.jpg",
    art: "tape",
    tagline: "Double-sided foam tape for mounting and cushioning.",
    summary:
      "Double-sided foam adhesive tape used for mounting, cushioning, and securing components inside battery packs.",
  }),
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function productsByCategory(category: CategoryId): Product[] {
  return products.filter((p) => p.category === category);
}