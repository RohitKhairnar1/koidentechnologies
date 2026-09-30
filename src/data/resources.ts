/**
 * Koiden Technologies — Technical Resources
 *
 * These resources are written as technical reference material for:
 * - OEMs
 * - Engineers
 * - Battery-pack designers
 * - System integrators
 * - Procurement teams
 * - Product development teams
 *
 * The content is intentionally more detailed than beginner-level battery
 * explanations. It focuses on specification, selection, design, integration,
 * reliability, safety and procurement considerations.
 */

export interface ResourceSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface Resource {
  slug: string;
  kind: string;
  title: string;
  excerpt: string;
  imageLabel: string;
  art: "cell-18650" | "bms" | "nickel-strip" | "generic";
  body: string[];
  sections: ResourceSection[];
}

export const resources: Resource[] = [
  {
    slug: "battery-basics",
    kind: "Battery Technology",
    title: "Battery Basics: From Cell Specifications to Pack Architecture",
    excerpt:
      "A technical reference covering voltage, capacity, energy, current, C-rate, cell configuration and the relationship between individual cells and a complete battery pack.",
    imageLabel: "Battery cell and pack architecture",
    art: "cell-18650",
    body: [
      "Battery-pack performance is determined by the interaction between individual cell characteristics, electrical configuration, protection electronics, thermal conditions and the requirements of the application. A pack should therefore be specified as a complete electrical system rather than simply by its nominal voltage and amp-hour rating.",
      "The first stage of battery specification is understanding the required operating voltage, usable energy, continuous and peak current, operating temperature, charging method, physical envelope and expected service life. These requirements determine the appropriate cell chemistry, series count, parallel count, BMS architecture and charger.",
      "It is useful to think of a battery pack as an electromechanical subsystem with its own interface contract to the rest of the product: a voltage window it will operate within, a current envelope it can sustain, a set of environmental conditions it tolerates, and a set of failure modes it is designed to contain. Every downstream engineering decision — enclosure design, wiring harness sizing, thermal management, firmware state-of-charge estimation — depends on that contract being defined clearly and early.",
      "Many field issues that appear late in a product's life (reduced runtime, nuisance BMS trips, inconsistent charging behavior) can be traced back to an incomplete specification at the concept stage. Investing time in a rigorous requirements definition before selecting cells is one of the highest-leverage steps in the entire pack-development process."
    ],
    sections: [
      {
        heading: "What is the difference between a cell, module and battery pack?",
        paragraphs: [
          "A cell is the fundamental electrochemical unit. Multiple cells can be connected in series and parallel to achieve the required voltage and capacity. A module is generally a mechanically and electrically organized group of cells, while a battery pack is the complete assembly that may include cells, interconnects, BMS, insulation, enclosure, connectors, thermal management and other protection components.",
          "For engineering purposes, the distinction is important because a cell specification does not describe the performance of the finished pack. Interconnect resistance, BMS limits, temperature, mechanical construction and cell matching can all influence the final system.",
          "In larger-format designs, modules exist as an intermediate assembly stage primarily for manufacturing, serviceability and safety-segmentation reasons: a module can be tested, qualified and replaced as a unit, and a fault contained within one module does not necessarily propagate to the entire pack. In smaller consumer or light-industrial packs, the module layer is often omitted and cells are wired directly into a single pack assembly.",
          "When reviewing a supplier's datasheet or a competitor's product, it is worth explicitly asking whether the quoted specification describes the cell, the module or the finished pack — the same numerical voltage or capacity value can mean materially different things at each level."
        ]
      },
      {
        heading: "How are voltage and capacity determined?",
        paragraphs: [
          "Cells connected in series increase voltage while cells connected in parallel increase capacity and current capability. A pack described as 4S3P contains four cells or parallel groups in series and three cells in parallel within each group.",
          "The nominal pack voltage is approximately the nominal cell voltage multiplied by the number of series groups. Pack amp-hour capacity is approximately the cell capacity multiplied by the number of cells in parallel.",
          "It is important to distinguish between nominal voltage, minimum (cutoff) voltage, and maximum (full-charge) voltage. A 13S LFP pack, for example, has a nominal voltage in the region of 41.6 V but will reach a maximum charge voltage well above that figure and a minimum discharge voltage well below it. Any downstream electronics — inverters, motor controllers, chargers — must be rated for the full voltage window, not just the nominal figure.",
          "Parallel groups should be built from cells that are closely matched in capacity, internal resistance and state of charge at the time of assembly. Poorly matched parallel groups can result in circulating currents between cells even at rest, accelerated aging of the weaker cells, and long-term capacity divergence within the group."
        ],
        bullets: [
          "Series count primarily determines voltage.",
          "Parallel count primarily determines capacity and current capability.",
          "Actual operating voltage varies with state of charge and load.",
          "Nominal voltage should not be confused with maximum charging voltage.",
          "The BMS and charger must be selected for the actual series configuration.",
          "Parallel groups should be matched for capacity, resistance and state of charge before assembly.",
          "The voltage window (minimum to maximum) — not just the nominal voltage — should be shared with every downstream electronics supplier."
        ]
      },
      {
        heading: "What is the relationship between Ah and Wh?",
        paragraphs: [
          "Amp-hours describe electrical charge capacity, while watt-hours describe energy. For a simplified calculation, energy can be estimated by multiplying nominal voltage by amp-hour capacity.",
          "For example, a nominal 48 V, 30 Ah pack represents approximately 1,440 Wh of nominal energy before accounting for usable-depth-of-discharge limits, conversion losses, temperature effects and other system losses.",
          "Because voltage is not constant across the discharge curve, the Wh figure calculated from nominal voltage is an approximation rather than a precise measurement. A more accurate energy figure can be obtained by integrating instantaneous voltage and current over a full discharge cycle, which is how most cell manufacturers report the Wh rating on a datasheet.",
          "Ah and Wh are also useful for comparing batteries across different voltage classes. A 12 V, 100 Ah battery and a 48 V, 25 Ah battery both represent approximately 1,200 Wh of nominal energy, even though their Ah ratings differ by a factor of four — a common source of confusion during procurement and specification review."
        ]
      },
      {
        heading: "Why is C-rate important when specifying a cell?",
        paragraphs: [
          "C-rate expresses charge or discharge current relative to the cell's rated capacity. A 10 Ah cell delivering 20 A is operating at approximately 2C discharge.",
          "The acceptable C-rate depends on the specific cell design, temperature, duration and manufacturer's specifications. A cell with high nominal capacity is not automatically suitable for a high-current application.",
          "C-rate limits are typically specified separately for continuous and pulse (peak) operation, and pulse ratings are usually time-bound — for example, a 3C pulse for 10 seconds. Designers should confirm both figures and design the electrical and thermal system around the more restrictive continuous rating for sustained loads.",
          "Operating a cell above its rated C-rate, even briefly and even if the BMS does not trip, can accelerate degradation and increase internal heat generation disproportionately. C-rate should therefore be treated as a hard design constraint rather than a target to be approached as closely as possible."
        ]
      },
      {
        heading: "How does internal resistance affect real-world performance?",
        paragraphs: [
          "Internal resistance determines how much a cell's terminal voltage drops under load and how much heat is generated internally during charge and discharge. Two cells with identical nominal capacity but different internal resistance will behave differently under high current, even though their datasheet capacity figures look the same.",
          "Internal resistance is not fixed — it increases with cell aging, decreases at higher temperature (within limits) and increases sharply at low temperature. This is why the same battery can deliver full power on a warm day and struggle to start a motor on a cold morning.",
          "When comparing cells from different suppliers, internal resistance measured under a consistent, stated test method (frequency, temperature, state of charge) is one of the more meaningful figures for predicting real-world voltage sag and thermal performance under load."
        ]
      },
      {
        heading: "What information should be collected before specifying a battery?",
        paragraphs: [
          "A complete requirements definition should be captured in writing before any cell or BMS is selected. Treating this as a formal specification document — rather than an informal conversation — reduces the risk of late-stage redesign and makes it far easier to compare quotations from multiple suppliers on a like-for-like basis."
        ],
        bullets: [
          "Required nominal and maximum operating voltage",
          "Required energy or capacity",
          "Continuous load current",
          "Peak load current and peak duration",
          "Charging voltage and charging current",
          "Operating and storage temperature",
          "Required runtime or backup duration",
          "Available enclosure dimensions",
          "Connector and cable requirements",
          "Expected cycle life and service conditions",
          "Communication requirements, if applicable",
          "Protection and certification requirements",
          "Expected duty cycle (continuous, intermittent, standby)",
          "Vibration, shock and ingress-protection requirements",
          "Target unit cost and expected production volume",
          "Regulatory or transport requirements for the target market"
        ]
      },
      {
        heading: "Professional questions worth asking before starting a battery project",
        bullets: [
          "What is the minimum voltage at which the downstream electronics can still operate correctly?",
          "What is the true peak current, including motor startup or inrush conditions, not just steady-state current?",
          "Is the application's duty cycle continuous, intermittent, or standby-with-occasional-peaks?",
          "What ambient temperature range will the pack realistically see in the field, including worst-case storage conditions?",
          "Does the application require the battery to be hot-swappable or user-replaceable?",
          "What certifications or transport classifications (for example, UN 38.3) will the finished product require?",
          "Is there an existing enclosure or physical envelope the pack must fit into, or is the enclosure being designed around the pack?",
          "What is the required or target cycle life, and under what depth-of-discharge assumption?",
          "Will the battery need to report state-of-charge or diagnostic data to a host system?",
          "What is the acceptable cost target per Wh, and how does that compare to the chemistry options under consideration?"
        ]
      }
    ]
  },

  {
    slug: "battery-chemistry-guide",
    kind: "Battery Technology",
    title: "Battery Chemistry Guide: Selecting the Right Cell Technology",
    excerpt:
      "A practical engineering comparison of lithium-ion chemistries, including energy density, power capability, thermal characteristics, cycle life and application considerations.",
    imageLabel: "Lithium battery chemistry comparison",
    art: "generic",
    body: [
      "Battery chemistry affects far more than nominal voltage. It influences energy density, discharge capability, charging behavior, thermal performance, cycle life, safety considerations, physical size and total system cost.",
      "Chemistry selection should therefore begin with application requirements rather than a preference for a particular cell format or nominal capacity.",
      "Because chemistry decisions influence nearly every other subsystem — BMS thresholds, charger voltage, thermal design, enclosure materials, even transport classification — it is one of the earliest and most consequential decisions in a battery program. Reversing a chemistry decision late in development is typically far more expensive than reversing a mechanical or cosmetic decision."
    ],
    sections: [
      {
        heading: "Which battery chemistry should be selected for an application?",
        paragraphs: [
          "There is no universally best lithium battery chemistry. The appropriate choice depends on the required balance between energy density, power, cycle life, operating conditions, physical constraints and system cost.",
          "Lithium iron phosphate (LiFePO₄ or LFP) is commonly selected where cycle life, thermal stability and durability are important. Other lithium-ion chemistries may provide different balances of energy density and power capability.",
          "A useful way to frame the decision is to rank the application's priorities explicitly — for example, cycle life first, energy density second, cost third — and then evaluate candidate chemistries against that ranking rather than against a generic 'best chemistry' comparison table. The right answer for a stationary backup system is frequently different from the right answer for a handheld or wearable device."
        ]
      },
      {
        heading: "What are the main engineering differences between LFP and other lithium-ion chemistries?",
        paragraphs: [
          "Beyond the headline differences in energy density and thermal stability, LFP and other common lithium-ion chemistries (such as nickel manganese cobalt oxide, or NMC) differ in their voltage curve shape, their sensitivity to over-discharge, and their behavior at low temperature. LFP's discharge curve is comparatively flat across most of its usable range, which can make state-of-charge estimation from voltage alone less precise and often pushes designs toward coulomb-counting-based fuel gauging instead."
        ],
        bullets: [
          "LFP generally offers strong cycle-life characteristics.",
          "LFP has a relatively stable thermal and chemical profile.",
          "Some other lithium-ion chemistries can provide higher energy density.",
          "Nominal and maximum charge voltages differ by chemistry.",
          "The BMS protection thresholds must match the chemistry.",
          "The charger must be compatible with the selected chemistry.",
          "Temperature limits must be evaluated using the actual cell manufacturer's specification.",
          "LFP's flatter discharge curve can make voltage-based state-of-charge estimation less accurate than in other chemistries.",
          "Cost per Wh and cost per cycle can favor different chemistries depending on expected service life."
        ]
      },
      {
        heading: "Does higher energy density always mean a better battery?",
        paragraphs: [
          "No. Higher energy density can reduce pack size and weight, but it may not be the most important parameter for every application. Industrial equipment, backup systems and stationary applications may place greater importance on cycle life, current capability, thermal behavior, reliability and maintainability.",
          "A technically suitable battery is one that satisfies the complete application envelope rather than maximizing one specification.",
          "In some cases, prioritizing energy density can actively work against other requirements — chemistries and cell formats optimized for maximum Wh/kg are sometimes more sensitive to abuse conditions, may have shorter cycle life, or may require more conservative charge and discharge limits to remain within a safe operating envelope."
        ]
      },
      {
        heading: "How should temperature be considered during chemistry selection?",
        paragraphs: [
          "Battery performance changes with temperature. Low temperatures can increase internal resistance and reduce available power, while elevated temperatures can accelerate degradation. Charging at unsuitable temperatures can also create significant reliability and safety concerns.",
          "Temperature limits should always be taken from the specific cell manufacturer's documentation rather than applying a generic lithium-ion temperature range.",
          "For applications that must operate or charge outdoors, in unheated enclosures, or in regions with wide seasonal temperature swings, it is worth reviewing the manufacturer's derating curves for both capacity and maximum charge current as a function of temperature, rather than relying on a single room-temperature specification."
        ]
      },
      {
        heading: "How does cycle life differ from calendar life?",
        paragraphs: [
          "Cycle life describes how many charge-discharge cycles a cell can sustain before its capacity or resistance degrades beyond a defined threshold, typically under a specific test depth-of-discharge and current. Calendar life describes how a cell degrades over time even with minimal use, driven primarily by storage temperature and storage state of charge.",
          "An application with light daily use but a long expected service life (for example, a stationary backup battery that cycles rarely) may be more constrained by calendar life than by cycle life, and storage conditions become correspondingly more important to specify and control."
        ]
      },
      {
        heading: "What should be compared between two cell suppliers?",
        bullets: [
          "Verified cell chemistry",
          "Nominal capacity",
          "Nominal voltage",
          "Maximum continuous discharge",
          "Recommended charging conditions",
          "Cycle-life test conditions",
          "Internal resistance",
          "Operating temperature range",
          "Cell dimensions and weight",
          "Traceability and batch information",
          "Quality-control documentation",
          "Relevant test reports or certifications",
          "Self-discharge rate and recommended storage state of charge",
          "Manufacturer's stated end-of-life capacity threshold"
        ]
      },
      {
        heading: "Professional questions to ask when comparing chemistries",
        bullets: [
          "At what depth of discharge and current was the manufacturer's cycle-life figure measured?",
          "How does maximum charge current change with temperature according to the manufacturer's derating curve?",
          "What is the recommended storage state of charge if the pack will sit unused for extended periods?",
          "Is the chemistry's voltage curve flat or steep across the usable range, and how does that affect state-of-charge estimation?",
          "Are there known abuse-tolerance differences (nail penetration, crush, overcharge) documented by the manufacturer for this chemistry?",
          "How does the chemistry's cost per cycle compare to its cost per Wh, given the expected service life of the product?",
          "Does the chemistry have any transport, storage or disposal classification differences relevant to the target market?"
        ]
      }
    ]
  },

  {
    slug: "battery-pack-design-guide",
    kind: "Pack Engineering",
    title: "Battery Pack Design Guide: From Electrical Specification to Assembly",
    excerpt:
      "A structured guide to battery-pack architecture, series-parallel configuration, current paths, interconnects, insulation, enclosure design and production considerations.",
    imageLabel: "Battery pack engineering and assembly",
    art: "generic",
    body: [
      "Battery-pack design connects the electrical requirements of an application with the physical construction of the finished product. A good design must satisfy electrical, mechanical, thermal, safety, manufacturing and service requirements simultaneously.",
      "The pack should be treated as a system. Cell selection, configuration, interconnection, BMS, charger, enclosure, connectors and thermal conditions must be considered together.",
      "Because these subsystems interact, changes made late in the design process to solve one problem frequently create a new problem elsewhere — for example, adding thicker insulation to solve a clearance issue can reduce available airflow and worsen a thermal issue. A structured, system-level design review at each major milestone helps catch these interactions before they reach production."
    ],
    sections: [
      {
        heading: "How should a battery-pack specification begin?",
        paragraphs: [
          "Begin with the load profile rather than selecting cells first. Establish the required voltage range, continuous current, peak current, energy requirement, runtime, charging method and physical constraints.",
          "Once these parameters are known, the appropriate cell chemistry and cell format can be evaluated. Series and parallel configuration can then be developed around the electrical requirements.",
          "It is good practice to document this specification as a single reference sheet that is shared with every stakeholder — mechanical, electrical, firmware, procurement and quality — so that later design changes can be evaluated against a common baseline rather than against each engineer's individual assumptions."
        ]
      },
      {
        heading: "How is a series-parallel configuration selected?",
        paragraphs: [
          "The series-parallel configuration is rarely a single 'correct' answer; several configurations may satisfy the electrical requirement, and the final choice is often driven by cell availability, physical envelope, BMS options and cost. It is worth evaluating two or three candidate configurations side by side before committing."
        ],
        bullets: [
          "Determine required nominal voltage.",
          "Select the number of cells in series based on cell nominal voltage.",
          "Determine required capacity in Ah.",
          "Calculate the number of parallel cells or groups.",
          "Check continuous and peak current capability.",
          "Verify maximum charge voltage.",
          "Verify BMS series count and current rating.",
          "Check physical dimensions and thermal conditions.",
          "Confirm the configuration against available cell formats and lead times.",
          "Re-check the configuration against the worst-case low-temperature voltage sag scenario."
        ]
      },
      {
        heading: "Why does current-path resistance matter?",
        paragraphs: [
          "Every conductor, weld, connector, fuse, busbar and cable contributes some resistance. At high current, even a small resistance can produce measurable voltage drop and heat.",
          "Pack design should therefore consider the complete current path rather than evaluating only the cell's internal resistance.",
          "A useful engineering discipline is to draw the complete current path as a resistance network — from cell tab, through weld, through nickel or busbar interconnect, through BMS switching elements, through connector contacts, through cable, to the load — and estimate the resistance and expected temperature rise at each stage. This exercise frequently reveals that a connector or a thin section of busbar, not the cell itself, is the limiting factor for maximum current."
        ]
      },
      {
        heading: "What should be considered in mechanical pack design?",
        bullets: [
          "Cell retention and movement prevention",
          "Compression requirements where applicable",
          "Insulation between conductive surfaces",
          "Clearance from the enclosure",
          "Cable routing and strain relief",
          "Connector accessibility",
          "BMS mounting",
          "Thermal pathways",
          "Protection against vibration and impact",
          "Serviceability and inspection access",
          "Creepage and clearance distances between conductors at different potentials",
          "Provision for thermal expansion of cells over the product's service life"
        ]
      },
      {
        heading: "How should thermal management be integrated into the design?",
        paragraphs: [
          "Thermal management should be considered from the earliest layout stage rather than added after a prototype overheats. Passive approaches — spacing between cells, thermally conductive potting or gap-filler materials, and enclosure venting — are often sufficient for moderate-power applications, while higher-power or high-ambient-temperature applications may require forced-air or liquid cooling.",
          "The design should account for both steady-state heat generation under continuous load and transient heat generation during peak events, since these can require different thermal solutions."
        ]
      },
      {
        heading: "How should production be considered during design?",
        paragraphs: [
          "A pack that works as a prototype may still be difficult to manufacture consistently. Production design should consider repeatable cell positioning, welding access, insulation placement, wire routing, test points, inspection steps and final electrical testing.",
          "Design-for-manufacturing principles help reduce variation between packs and make quality control easier as production volume increases.",
          "Designs intended for higher production volumes benefit from an explicit design-for-test strategy: accessible test points for each series group, a defined end-of-line test sequence, and pass/fail criteria documented before the first production run rather than developed reactively once defects appear."
        ]
      },
      {
        heading: "Professional questions to raise during a pack design review",
        bullets: [
          "Has the complete current path resistance been estimated stage by stage, not just the cell's internal resistance?",
          "What is the worst-case temperature rise at the highest-resistance point in the current path under peak load?",
          "Are creepage and clearance distances between conductors documented and verified against the applicable standard?",
          "What test points are accessible for end-of-line electrical testing without disassembling the pack?",
          "How will cell swelling or thermal expansion over the product's service life be accommodated mechanically?",
          "Is there a defined process for handling a parallel group that fails incoming inspection after the pack is partially assembled?",
          "Has the mechanical design been reviewed against vibration and shock requirements relevant to the end application?",
          "What is the plan for field service or cell replacement, if applicable, and does the mechanical design support it?"
        ]
      }
    ]
  },

  {
    slug: "bms-guide",
    kind: "Pack Engineering",
    title: "BMS Guide: Protection, Balancing and Current Management",
    excerpt:
      "A detailed guide to BMS selection covering series count, charge and discharge protection, balancing, temperature monitoring, current ratings and communication requirements.",
    imageLabel: "Battery management system",
    art: "bms",
    body: [
      "The battery management system is one of the most important electronic subsystems in a lithium battery pack. It monitors cell-group voltages and other parameters and provides protection against operating conditions outside defined limits.",
      "BMS selection should never be based only on nominal pack voltage. Series count, chemistry, current requirements, balancing strategy, temperature monitoring and communication requirements must all be considered.",
      "A BMS is best understood as a safety-and-management layer that sits between the cells and the rest of the electrical system, not as a component that adds capability to the cells themselves. Its protection thresholds should be set with reference to the specific cell manufacturer's datasheet limits, with margin, rather than to generic values found in a reference table."
    ],
    sections: [
      {
        heading: "What does a BMS actually do?",
        bullets: [
          "Monitors individual series-group voltages",
          "Protects against overcharge conditions",
          "Protects against over-discharge conditions",
          "Provides over-current protection",
          "Provides short-circuit protection on supported designs",
          "Monitors temperature where sensors are provided",
          "Performs cell balancing where supported",
          "May provide state information and communication",
          "May control charger enable/disable and load disconnect functions",
          "May log fault history for later diagnostic review"
        ]
      },
      {
        heading: "How do you select the correct BMS series count?",
        paragraphs: [
          "The BMS series rating must correspond to the number of cells or parallel groups connected in series. A 13S pack requires a BMS designed for 13 series groups.",
          "The chemistry must also be compatible because protection thresholds and charging requirements depend on the cell chemistry.",
          "Some BMS platforms support a configurable series count within a defined range and are field-programmable, while others are fixed at manufacture. For low-volume or evolving designs, a configurable BMS can reduce the risk of committing to the wrong series count too early; for high-volume production, a fixed-configuration BMS purpose-built for the exact series count is often more cost-effective."
        ]
      },
      {
        heading: "How should the BMS current rating be selected?",
        paragraphs: [
          "The BMS current rating should be evaluated against the application's continuous and peak load requirements. A system that occasionally draws a high peak current requires consideration of peak duration and the BMS's actual protection behavior, not simply the printed nominal current value.",
          "Thermal conditions and enclosure design can also affect the practical current capability of the BMS.",
          "Manufacturers typically publish a continuous current rating, a peak (pulse) current rating with a defined maximum duration, and a distinct over-current-protection trip threshold. All three should be confirmed against the application's actual load profile, including startup or inrush conditions, before the BMS is finalized."
        ]
      },
      {
        heading: "What is cell balancing and why does it matter?",
        paragraphs: [
          "Cells or parallel groups connected in series can develop small differences in voltage and state of charge. Balancing helps reduce voltage divergence between series groups.",
          "Passive balancing dissipates excess energy through resistive circuitry, while active balancing transfers energy between cells or groups. The appropriate approach depends on pack architecture, application requirements and cost.",
          "Balancing current is typically small relative to the pack's main charge or discharge current, which means balancing is a slow, ongoing correction process rather than an instantaneous fix. Packs with significant cell mismatch at assembly, or packs that spend long periods away from full charge, may never fully balance under typical operating conditions and should be evaluated for that risk during design."
        ]
      },
      {
        heading: "How does temperature monitoring integrate with BMS protection?",
        paragraphs: [
          "Many BMS platforms accept one or more temperature sensor inputs and can use them to gate charging or discharging outside a defined temperature window, independent of voltage-based protection. This is particularly important for chemistries that are sensitive to charging at low temperature.",
          "The number and placement of temperature sensors should be considered relative to pack size — a single sensor near the BMS may not represent the temperature of cells located at the opposite end of a larger pack, particularly under uneven thermal loading."
        ]
      },
      {
        heading: "When should a smart or communication-enabled BMS be considered?",
        bullets: [
          "When the host system needs battery status information",
          "When state-of-charge data is required",
          "When fault information needs to be logged",
          "When CAN, UART, RS485 or another interface is required",
          "When configuration or monitoring is required",
          "When system-level diagnostics are important",
          "When remote or fleet-level monitoring of multiple packs is planned",
          "When firmware-adjustable protection thresholds are needed across product variants"
        ]
      },
      {
        heading: "Professional questions to ask when specifying a BMS",
        bullets: [
          "What are the exact voltage, current and temperature protection thresholds, and how do they compare with margin to the cell manufacturer's absolute limits?",
          "Is the peak current rating time-limited, and does the application's actual peak duration fit within that limit?",
          "What balancing current is provided, and is it sufficient given the expected mismatch between parallel groups at assembly?",
          "How many temperature sensors are supported, and where should they be physically located in this specific pack layout?",
          "Does the BMS log fault events, and can that log be retrieved for field diagnostics?",
          "Is the series count fixed or field-configurable, and which is more appropriate for the expected production volume?",
          "What communication protocol, if any, is required by the host system, and does the BMS support it natively?",
          "What happens electrically when the BMS trips — does it latch, auto-recover, or require a manual reset?"
        ]
      }
    ]
  },

  {
    slug: "battery-charging-guide",
    kind: "Charging & Power",
    title: "Battery Charging Guide: Voltage, Current and Charging Strategy",
    excerpt:
      "A technical overview of lithium battery charging, CC-CV behavior, charger selection, charging limits, temperature considerations and charger-to-BMS compatibility.",
    imageLabel: "Battery charging system",
    art: "generic",
    body: [
      "The charger is part of the battery system and must be selected around the battery chemistry, series configuration, required charge voltage, charging current and BMS protection architecture.",
      "Using a charger with an incorrect output voltage or unsuitable charging profile can cause poor performance, BMS trips, reduced battery life or unsafe operating conditions.",
      "Charging strategy is frequently under-specified relative to discharge behavior, even though inappropriate charging is a common root cause of both premature aging and field safety events. Charger selection deserves the same level of engineering rigor as cell and BMS selection."
    ],
    sections: [
      {
        heading: "What is CC-CV charging?",
        paragraphs: [
          "Lithium-ion batteries are commonly charged using a constant-current and constant-voltage approach. During the constant-current stage, the charger supplies a controlled current while battery voltage rises. Once the target voltage is reached, the charger regulates voltage and the current gradually decreases.",
          "The exact voltage and termination behavior depend on the chemistry and the cell manufacturer's specifications.",
          "The transition point and termination current threshold (the current level at which the charger considers the battery full and stops or reduces charging) both affect how much usable capacity is delivered on each charge cycle and how much stress is placed on the cells near full charge. These parameters should be set according to the cell manufacturer's guidance rather than a generic default."
        ]
      },
      {
        heading: "How do you select a charger for a battery pack?",
        bullets: [
          "Match charger output voltage to the complete series configuration.",
          "Confirm chemistry compatibility.",
          "Select an appropriate charging current.",
          "Verify connector polarity and physical compatibility.",
          "Confirm BMS charging limits.",
          "Consider operating temperature during charging.",
          "Check whether communication or charger enable control is required.",
          "Confirm charger protection features.",
          "Confirm the charger's behavior on fault (BMS trip, cell fault, communication loss).",
          "Verify regulatory and safety certification appropriate to the target market."
        ]
      },
      {
        heading: "Why is charging current important?",
        paragraphs: [
          "Charging current affects charging time, heat generation and potentially long-term cell aging. A higher charging current can reduce charging time, but only if the cell and complete pack are rated for it.",
          "The charging current should be evaluated against the manufacturer's cell specification and the complete pack's thermal and electrical design.",
          "Fast-charging protocols that push close to a cell's maximum rated charge current can noticeably shorten cycle life compared with a more conservative charge rate, particularly at temperature extremes. Where product requirements allow, offering a standard and a fast-charge mode — rather than defaulting every charge to the maximum rate — can meaningfully extend service life."
        ]
      },
      {
        heading: "How does temperature affect charging?",
        paragraphs: [
          "Charging at very low or very high temperatures can be significantly more damaging to a lithium-ion cell than discharging under similar conditions, and in some chemistries, charging below a certain temperature threshold is explicitly prohibited by the manufacturer regardless of current level.",
          "A robust charging system should incorporate temperature feedback — either from the BMS or from dedicated sensors — and should reduce or halt charging current outside the manufacturer's approved temperature window, rather than relying on the user to charge only in appropriate conditions."
        ]
      },
      {
        heading: "Can a BMS replace a properly specified charger?",
        paragraphs: [
          "No. The BMS provides protection and management functions, but it should not be treated as a substitute for a correctly specified charger. The charger establishes the intended charging voltage and current profile, while the BMS provides protection when operating conditions move outside allowed limits.",
          "Relying on the BMS to compensate for an incorrectly specified charger — for example, using a charger with the wrong voltage and expecting the BMS to simply cut off at the right point — places the pack in a protection-triggered state routinely rather than occasionally, which is not the intended operating mode for most BMS protection circuitry."
        ]
      },
      {
        heading: "Professional questions to ask about a charging system",
        bullets: [
          "What is the charger's exact output voltage at full charge, and does it match the cell manufacturer's specified maximum charge voltage for this chemistry?",
          "What termination current or termination condition does the charger use to end the constant-voltage stage?",
          "Does the charger reduce or halt current outside a defined temperature window, and how is temperature communicated to it?",
          "What is the charger's behavior if it loses communication with the BMS mid-charge?",
          "Is there a fast-charge mode, and what is its expected impact on cycle life compared with standard charging?",
          "What certifications does the charger carry for the intended market, and are they compatible with the battery pack's own certifications?",
          "How does the charger indicate a fault condition to the user or host system?"
        ]
      }
    ]
  },

  {
    slug: "battery-sizing-guide",
    kind: "Battery Technology",
    title: "Battery Sizing Guide: Voltage, Capacity, Energy and Runtime",
    excerpt:
      "A practical engineering framework for sizing battery capacity from load power, operating time, discharge limits, efficiency and system conditions.",
    imageLabel: "Battery sizing and energy calculation",
    art: "generic",
    body: [
      "Battery sizing should start from the actual load profile. Simply matching a battery's amp-hour value to a load current can produce misleading results because runtime depends on voltage, energy demand, usable capacity, efficiency, temperature and discharge conditions.",
      "A reliable sizing process converts the application's load requirement into required electrical energy and then determines an appropriate cell configuration.",
      "Undersizing a battery leads to reduced runtime, more frequent charge cycles, and accelerated aging from operating closer to the cells' limits; oversizing increases cost, weight and volume unnecessarily. A disciplined sizing process aims to land close to the actual requirement plus a deliberate, documented margin, rather than a large but unexamined safety factor."
    ],
    sections: [
      {
        heading: "How do you calculate required battery energy?",
        paragraphs: [
          "For a simplified constant-load calculation, required energy can be estimated by multiplying load power by operating time. If a system consumes 500 W for 4 hours, the basic energy requirement is approximately 2,000 Wh before accounting for system losses and usable-depth-of-discharge limitations.",
          "For loads that vary over time rather than remaining constant, energy should be calculated by integrating power over the actual duty cycle — for example, summing the energy used during each distinct operating phase — rather than using a single average power figure, which can understate peak-heavy profiles."
        ]
      },
      {
        heading: "How do you convert energy requirements into Ah?",
        paragraphs: [
          "Approximate battery capacity in amp-hours can be calculated by dividing required watt-hours by nominal battery voltage. The result must then be adjusted for efficiency, usable depth of discharge, temperature and other application-specific factors.",
          "It is common practice to apply a combined derating factor that accounts for inverter or converter efficiency, wiring losses, temperature effects and aging margin, rather than treating each factor as a separate, precise multiplier — in early-stage sizing, a single conservative combined factor is often more practical and appropriately cautious."
        ]
      },
      {
        heading: "Why should usable energy be different from nominal energy?",
        paragraphs: [
          "A battery should not necessarily be operated across its entire theoretical capacity. BMS limits, voltage cutoffs, load behavior, temperature and required service life can reduce the energy that is practically available to the application.",
          "Sizing should therefore include an engineering margin rather than assuming that 100% of nominal capacity will always be usable.",
          "For chemistries and applications where cycle life is closely tied to depth of discharge, deliberately limiting usable capacity to a defined percentage of nominal capacity — for example, reserving a margin at both the top and bottom of the state-of-charge range — is a well-established technique for extending service life at the cost of some usable energy."
        ]
      },
      {
        heading: "What happens when the load is variable?",
        paragraphs: [
          "Variable loads should be evaluated using a load profile rather than only an average current. Peak power may determine the cell and BMS current requirements, while average energy consumption determines much of the required capacity.",
          "For equipment with motors, compressors, pumps or other dynamic loads, startup and transient current should be considered separately.",
          "Where a detailed load profile is not yet available, a reasonable engineering approach is to build a worst-case duty-cycle estimate from known operating phases (idle, normal operation, peak events) and their expected duration, then validate that estimate against measured data once a prototype exists."
        ]
      },
      {
        heading: "How should safety and design margins be applied in sizing?",
        bullets: [
          "Apply a margin for conversion and wiring efficiency losses.",
          "Reserve capacity at both ends of the state-of-charge range if extended cycle life is required.",
          "Add margin for expected capacity fade over the product's service life, not just day-one capacity.",
          "Size current capability for worst-case peak or startup current, not average current.",
          "Consider a temperature-based capacity derating margin for outdoor or unconditioned environments.",
          "Document each margin explicitly so it can be revisited if requirements change."
        ]
      },
      {
        heading: "Professional questions to ask during battery sizing",
        bullets: [
          "Is the load profile based on measured data, or is it an early-stage estimate that should be validated later?",
          "What efficiency losses (inverter, wiring, connector) have been included in the sizing calculation, and are they measured or assumed?",
          "What depth-of-discharge assumption underlies the required cycle-life figure?",
          "Has capacity fade over the expected service life been included as a distinct margin, separate from day-one usable capacity?",
          "What is the worst-case peak or inrush current, and does it drive the sizing more than the average load?",
          "How does expected ambient temperature affect the usable capacity margin that should be applied?",
          "If requirements grow in the future, is there margin in the physical envelope to accommodate a larger pack?"
        ]
      }
    ]
  },

  {
    slug: "battery-components-guide",
    kind: "Components & Reliability",
    title: "Battery Components Guide: Materials That Build a Reliable Pack",
    excerpt:
      "A technical guide to interconnects, insulation, cell holders, BMS hardware, connectors, enclosures and other supporting battery-pack components.",
    imageLabel: "Battery pack components",
    art: "nickel-strip",
    body: [
      "Battery cells are only one part of a finished pack. Interconnect materials, insulation, mechanical supports, connectors, wiring and protective electronics all contribute to pack performance and reliability.",
      "Component selection should consider electrical loading, mechanical conditions, temperature, compatibility with the manufacturing process and expected service life.",
      "In practice, a disproportionate share of field failures in battery packs originate not in the cells themselves but in the supporting components — a fatigued weld, an under-rated connector, insulation that abrades over time from vibration. Treating these components with the same engineering rigor as cell selection is essential for a reliable product."
    ],
    sections: [
      {
        heading: "What determines the correct interconnect material?",
        paragraphs: [
          "Interconnect selection depends on current, resistance, welding process, thickness, mechanical design and material properties. Nickel and nickel-plated materials are commonly used in cylindrical-cell pack construction, but their electrical and welding characteristics differ.",
          "For higher-current designs, the complete current path should be evaluated rather than choosing strip material based only on appearance or thickness.",
          "Pure nickel offers good weldability and corrosion resistance but higher resistivity than copper, while nickel-plated copper offers lower resistance at the cost of more demanding weld-process control. The choice often comes down to the specific current requirement per interconnect and the welding equipment and process capability available in production."
        ]
      },
      {
        heading: "What role does insulation play in a battery pack?",
        bullets: [
          "Prevents accidental electrical contact",
          "Protects against abrasion",
          "Separates conductive surfaces",
          "Provides additional isolation around cell terminals",
          "Helps prevent short circuits caused by mechanical movement",
          "Supports consistent pack assembly",
          "Contributes to the pack's overall dielectric withstand rating",
          "Can provide a degree of thermal isolation between adjacent cells or groups"
        ]
      },
      {
        heading: "Why are cell holders and mechanical supports important?",
        paragraphs: [
          "Cell holders maintain spacing and reduce unwanted movement between cells. Mechanical stability is particularly important in applications exposed to vibration, impact or repeated handling.",
          "Mechanical components should be evaluated alongside the cell dimensions and enclosure geometry.",
          "Cell holders also play a role in thermal management, since the spacing they create between cells often doubles as the air or thermal-gap-filler pathway used for cooling. Holder geometry should therefore be reviewed jointly by mechanical and thermal engineers rather than in isolation."
        ]
      },
      {
        heading: "What should be considered when selecting connectors and cables?",
        bullets: [
          "Continuous current",
          "Peak current",
          "Voltage rating",
          "Contact resistance",
          "Temperature rise",
          "Mechanical locking",
          "Cable gauge",
          "Strain relief",
          "Mating-cycle requirements",
          "Available installation space",
          "Environmental sealing (IP rating) if used outdoors or in wet conditions",
          "Compatibility with existing connectors on mating equipment"
        ]
      },
      {
        heading: "How should component qualification and testing be approached?",
        paragraphs: [
          "Components such as connectors, wiring and interconnect materials are frequently qualified only by the cell or BMS supplier's general specifications, without independent verification for the specific application. Where a component sits in a high-current or safety-relevant position in the pack, it is worth requesting the component manufacturer's own test data and, where practical, performing an incoming verification test rather than relying solely on a datasheet rating.",
          "Temperature-rise testing under the actual expected current — not just a review of the printed current rating — is one of the most informative and cost-effective qualification steps for connectors and interconnects."
        ]
      },
      {
        heading: "Professional questions to ask about pack components",
        bullets: [
          "What is the measured temperature rise of this connector or interconnect at the pack's actual continuous and peak current?",
          "What welding or joining process is used for the interconnects, and has weld strength been verified through pull testing?",
          "What is the dielectric withstand rating of the insulation system used between conductors at different potentials?",
          "Are cell holders qualified for the vibration and shock profile the finished product will experience?",
          "What environmental sealing rating do the connectors carry, and is it appropriate for the intended use environment?",
          "Is there supplier traceability and batch documentation for interconnect and insulation materials, not just for the cells?",
          "How many mating cycles are the connectors rated for, and does that match the expected service or replacement frequency?"
        ]
      }
    ]
  },

  {
    slug: "battery-safety-guide",
    kind: "Safety & Reliability",
    title: "Battery Safety Guide: Electrical, Thermal and Mechanical Protection",
    excerpt:
      "A professional overview of battery safety considerations covering electrical protection, thermal behavior, short-circuit prevention, mechanical integrity and handling.",
    imageLabel: "Battery safety and protection",
    art: "generic",
    body: [
      "Battery safety is a system-level responsibility. A safe design combines appropriate cells with correct protection electronics, mechanical construction, electrical isolation, charging controls and suitable operating conditions.",
      "No single component should be considered a complete safety solution. The cell, BMS, charger, interconnects, enclosure and application must be evaluated together.",
      "A useful mental model is layered protection: each layer (cell-level internal protection, BMS thresholds, fusing, mechanical containment, enclosure design, user-facing warnings) is assumed to be imperfect on its own, and safety emerges from the combination of layers rather than from any single one being infallible."
    ],
    sections: [
      {
        heading: "What are the main battery-pack safety risks?",
        bullets: [
          "Overcharge",
          "Over-discharge",
          "Excessive current",
          "Short circuit",
          "Excessive temperature",
          "Mechanical damage",
          "Poor insulation",
          "Incorrect charging",
          "Improper assembly",
          "Cell imbalance",
          "Contamination or moisture ingress during assembly or use",
          "Use of counterfeit or non-conforming cells introduced through an unqualified supply chain"
        ]
      },
      {
        heading: "Why is short-circuit protection important?",
        paragraphs: [
          "Lithium battery cells can deliver substantial current when a low-resistance path is created. A short circuit can therefore produce rapid heating and damage to conductors or cells.",
          "Protection should consider the BMS, fusing where appropriate, conductor sizing, insulation, enclosure design and physical prevention of accidental contact.",
          "A fuse or other current-limiting device, sized appropriately for the pack's normal operating current, provides a layer of protection that is independent of the BMS's electronic switching — this independence matters because it means a single point of failure in the BMS does not remove all short-circuit protection from the pack."
        ]
      },
      {
        heading: "How should thermal behavior be evaluated?",
        paragraphs: [
          "Heat can be generated by cells, interconnects, BMS components, connectors and cables. Thermal performance depends on current, resistance, ambient conditions, enclosure design and duty cycle.",
          "For higher-power applications, thermal analysis should be performed using the actual operating profile rather than assuming that nominal current represents the complete thermal load.",
          "Thermal runaway — a self-sustaining, rapidly escalating heat-generation event within a cell — is a distinct and more severe failure mode than ordinary overheating, and its prevention relies heavily on staying within the cell manufacturer's voltage, current and temperature limits at every stage of charge and discharge, combined with mechanical protection against cell damage."
        ]
      },
      {
        heading: "How does mechanical protection contribute to overall safety?",
        paragraphs: [
          "Mechanical damage to a cell — from crush, penetration, or severe impact — can create an internal short circuit that bypasses external protection electronics entirely. Enclosure design, cell placement, and impact-absorbing structure are therefore part of the electrical safety system, not purely a mechanical or cosmetic consideration.",
          "Applications exposed to vibration, transport handling or potential impact should be evaluated against a relevant mechanical test standard, and cell placement should avoid locating cells at the most exposed structural locations where practical."
        ]
      },
      {
        heading: "What should be checked before releasing a pack for production?",
        bullets: [
          "Correct cell configuration",
          "Correct BMS installation",
          "Insulation integrity",
          "Polarity verification",
          "Pack voltage verification",
          "BMS protection verification",
          "Charging behavior",
          "Connector polarity",
          "Mechanical integrity",
          "Final inspection and traceability",
          "Verification that fusing, if used, is correctly sized and installed",
          "Confirmation that all cells originate from a qualified, traceable supply chain"
        ]
      },
      {
        heading: "Professional questions to ask during a safety review",
        bullets: [
          "Does each protection function (BMS, fuse, mechanical) act independently, so that a single failure does not remove all layers of protection?",
          "Have voltage, current and temperature thresholds been verified against the specific cell manufacturer's absolute maximum ratings, with margin?",
          "What mechanical test standard, if any, has the enclosure and cell layout been evaluated against?",
          "Is there a documented process for verifying cell authenticity and supply-chain traceability for every batch received?",
          "What happens if the BMS itself fails in a way that removes protection — is there a secondary, independent safeguard?",
          "Has the pack been evaluated for its behavior under a single-point mechanical damage scenario, such as puncture or crush?",
          "What warning labeling, documentation or user instructions accompany the finished product regarding safe charging, storage and disposal?"
        ]
      }
    ]
  },

  {
    slug: "battery-troubleshooting-guide",
    kind: "Service & Diagnostics",
    title: "Battery Troubleshooting Guide: Diagnosing Pack-Level Problems",
    excerpt:
      "A structured diagnostic guide for voltage imbalance, charging faults, BMS protection events, unexpected shutdowns, reduced runtime and abnormal pack behavior.",
    imageLabel: "Battery pack testing and diagnostics",
    art: "bms",
    body: [
      "Battery troubleshooting should follow a structured diagnostic process. Replacing components without measuring the system can hide the actual cause of a fault and create additional problems.",
      "Start with basic safety and visual inspection, then move toward pack-level measurements, individual series-group measurements, BMS status and charger behavior.",
      "A disciplined troubleshooting approach isolates variables one at a time — measuring at rest before measuring under load, measuring the whole pack before measuring individual groups — rather than jumping directly to component replacement based on a hunch. This both resolves the immediate issue faster and produces useful data if the fault recurs."
    ],
    sections: [
      {
        heading: "What should be checked when a battery does not power the load?",
        bullets: [
          "Measure total pack voltage.",
          "Check connector continuity and polarity.",
          "Check whether the BMS is in protection mode.",
          "Measure individual series-group voltages where appropriate.",
          "Inspect visible wiring and interconnects.",
          "Check for abnormal temperature or physical damage.",
          "Verify that the load is within the BMS and battery current capability.",
          "Confirm whether the fault is present with a known-good alternate load, to rule out a load-side fault.",
          "Check for any fault codes or history logged by the BMS, if available."
        ]
      },
      {
        heading: "Why can a battery show normal total voltage but still fail under load?",
        paragraphs: [
          "A pack's open-circuit voltage does not necessarily indicate its ability to deliver the required current. High internal resistance, weak cells, poor interconnects, connector resistance or BMS current limits can cause significant voltage drop under load.",
          "Testing under a controlled load can therefore provide information that a simple open-circuit voltage measurement cannot.",
          "A useful diagnostic technique is to measure voltage at the pack terminals both at rest and under a known, controlled load, and compare the voltage drop against what would be expected from the cell manufacturer's internal-resistance specification for the pack's configuration — a drop significantly larger than expected points toward a resistance problem somewhere in the current path rather than a capacity problem."
        ]
      },
      {
        heading: "What causes series-group voltage imbalance?",
        bullets: [
          "Cell variation",
          "Different states of charge",
          "Capacity mismatch",
          "Unequal resistance",
          "Balancing limitations",
          "Temperature differences",
          "Aging or damaged cells",
          "Connection resistance",
          "A failed or degraded balancing circuit on one specific group",
          "Uneven thermal exposure across the pack during charging or operation"
        ]
      },
      {
        heading: "Why might a BMS repeatedly disconnect the load?",
        paragraphs: [
          "Repeated BMS shutdowns can result from over-current, short-circuit detection, low cell voltage, high cell voltage, temperature protection or other configured thresholds.",
          "The correct diagnostic approach is to identify which protection condition is being triggered rather than repeatedly resetting the BMS.",
          "If the BMS provides any status output, fault code or communication interface, retrieving the specific trip reason before further investigation can save significant diagnostic time compared with inferring the cause from symptoms alone."
        ]
      },
      {
        heading: "How should reduced runtime be diagnosed?",
        paragraphs: [
          "Reduced runtime can result from genuine capacity loss (cell aging), from a change in load behavior (a component drawing more current than before), from a change in operating temperature, or from a battery that is no longer reaching full charge due to a charging-system issue.",
          "A structured approach measures actual delivered capacity under a controlled discharge test and compares it against the pack's original rated capacity, rather than relying on estimated runtime alone, which can be affected by several of these factors simultaneously."
        ]
      },
      {
        heading: "What diagnostic equipment and records are useful for effective troubleshooting?",
        bullets: [
          "A calibrated multimeter capable of accurate voltage measurement under load",
          "A controlled, adjustable electronic load for capacity and voltage-sag testing",
          "Access to BMS fault logs or diagnostic output, where supported",
          "The original pack specification and BMS threshold documentation for comparison",
          "A record of the pack's charge and discharge history, if available",
          "The cell manufacturer's datasheet for reference internal-resistance and voltage-sag figures"
        ]
      },
      {
        heading: "Professional questions to ask during troubleshooting",
        bullets: [
          "Was the fault observed at rest, under load, or specifically during charging?",
          "Does the BMS provide a specific fault code or trip reason, and has it been retrieved?",
          "How does the voltage drop under a controlled load compare with the expected drop from the cell manufacturer's resistance specification?",
          "Is the imbalance isolated to a single series group, or spread across the pack?",
          "Has the load itself been ruled out as the source of the fault using a known-good alternate load?",
          "What was the ambient and cell temperature at the time the fault occurred?",
          "Has actual delivered capacity been measured under a controlled discharge, or is runtime being estimated only from user experience?"
        ]
      }
    ]
  },

  {
    slug: "battery-faq",
    kind: "Technical Reference",
    title: "Battery Engineering FAQ: Practical Questions for Pack Specification",
    excerpt:
      "A deeper technical FAQ covering cell selection, pack configuration, BMS, charging, capacity, current capability, testing and procurement decisions.",
    imageLabel: "Battery engineering reference",
    art: "generic",
    body: [
      "Battery specifications often appear straightforward until the application requirements are examined in detail. The questions below address common engineering decisions that arise during battery-pack specification and sourcing.",
      "The purpose of this guide is not to replace manufacturer datasheets or application-specific engineering validation. It provides a structured starting point for technical discussions.",
      "Many of the questions below recur across very different applications — from consumer electronics to industrial equipment — because they address fundamental relationships between voltage, capacity, resistance and system design rather than application-specific details."
    ],
    sections: [
      {
        heading: "Can two batteries with the same voltage and Ah rating perform differently?",
        paragraphs: [
          "Yes. The same nominal voltage and capacity can hide differences in cell chemistry, internal resistance, discharge capability, BMS current limits, temperature performance, usable energy and construction quality.",
          "This is one of the most common sources of disappointment during procurement: a quotation that matches on voltage and Ah alone provides no guarantee of matching real-world performance, and a side-by-side load test is often the only reliable way to confirm equivalence."
        ]
      },
      {
        heading: "Does a higher Ah rating always mean longer runtime?",
        paragraphs: [
          "Not necessarily. Runtime depends on actual energy delivered to the load, system efficiency, discharge conditions, temperature and the load profile. Voltage must also be considered when comparing batteries.",
          "Comparing two batteries by Ah rating alone is only meaningful if both operate at the same voltage; otherwise comparing Wh (energy) is the more reliable metric."
        ]
      },
      {
        heading: "Can cells with different capacities be mixed in one pack?",
        paragraphs: [
          "Cells should not be mixed casually. Series-parallel pack design depends on cells having suitable and sufficiently consistent electrical characteristics. Mixing different cell types or substantially different characteristics can create imbalance and reduce predictable pack performance.",
          "Even cells of the same nominal model but from different production batches can differ enough in capacity and resistance to warrant matching before assembly into the same parallel group, particularly for higher-current applications."
        ]
      },
      {
        heading: "Why can a battery become weaker even if it still reaches full voltage?",
        paragraphs: [
          "Voltage alone does not describe remaining capacity or internal resistance. Aging can reduce capacity and increase resistance while the cell still reaches its normal charging voltage.",
          "This is why capacity and internal-resistance testing, rather than a simple voltage check, are the appropriate methods for assessing a cell's true remaining health."
        ]
      },
      {
        heading: "Should BMS current rating equal the motor or load rating?",
        paragraphs: [
          "The BMS should be selected based on the actual continuous and peak electrical demand of the system, including startup and transient conditions. Motor nameplate power alone may not represent instantaneous battery current.",
          "Startup or stall current for motor-driven loads can substantially exceed the motor's rated running current, and this transient should be measured or estimated explicitly rather than inferred from the nameplate rating."
        ]
      },
      {
        heading: "What is the difference between a datasheet's nominal capacity and its rated capacity under test conditions?",
        paragraphs: [
          "Nominal capacity is typically a rounded, representative figure, while the datasheet's detailed test conditions (discharge current, temperature, cutoff voltage) describe exactly how that figure was measured. A cell can have a lower usable capacity at higher discharge currents or outside the stated test temperature, so it is worth reviewing the test conditions rather than relying on the headline number alone."
        ]
      },
      {
        heading: "How much does temperature realistically affect available capacity?",
        paragraphs: [
          "The effect varies by chemistry and cell design, but it can be substantial — a cell operating well below its rated temperature range can deliver noticeably less usable capacity and power than the same cell at room temperature. Applications expected to operate in cold environments should request the manufacturer's capacity-versus-temperature curve rather than assuming room-temperature figures apply."
        ]
      },
      {
        heading: "What technical documents should be requested from a supplier?",
        bullets: [
          "Cell datasheet",
          "Cell model and chemistry confirmation",
          "Electrical specifications",
          "Applicable test reports",
          "BMS specifications",
          "Charger specifications where supplied",
          "Inspection or quality documentation",
          "Batch or lot traceability information",
          "Relevant compliance documentation",
          "Capacity and internal-resistance test data at the specific current and temperature relevant to the application",
          "Cycle-life and calendar-life test conditions and results"
        ]
      },
      {
        heading: "Additional professional questions worth asking a supplier",
        bullets: [
          "Can you provide capacity and internal-resistance data at our specific application current and temperature, not just standard test conditions?",
          "What is your process for verifying cell authenticity and preventing counterfeit material from entering the supply chain?",
          "Can you supply a sample batch for independent validation before committing to a production order?",
          "What is your typical lead time, and how does it change with order volume?",
          "How do you handle non-conforming material identified during our incoming inspection?",
          "What warranty or replacement policy applies to cells or packs that fail within the expected service life?",
          "Are there any known field issues or design changes for this specific cell or pack model that we should be aware of?"
        ]
      }
    ]
  },

  {
    slug: "battery-calculators",
    kind: "Engineering Tools",
    title: "Battery Calculators: Core Engineering Calculations",
    excerpt:
      "A reference for calculating series-parallel configuration, nominal energy, approximate runtime, current demand and other common battery-pack parameters.",
    imageLabel: "Battery engineering calculations",
    art: "generic",
    body: [
      "Battery calculations provide an initial engineering estimate. Final pack specifications should always be checked against the actual cell datasheet, BMS limits, charger specifications, operating conditions and application load profile.",
      "The following formulas cover common calculations used during early-stage battery-pack design.",
      "These calculations are most useful for narrowing a design space quickly during concept development. As the design matures, each estimate should be replaced or validated with measured data from prototypes and, where available, from the specific cell manufacturer's datasheet under application-relevant conditions."
    ],
    sections: [
      {
        heading: "How do you calculate the number of cells in series?",
        paragraphs: [
          "Approximate series count can be determined by dividing the required nominal pack voltage by the cell nominal voltage. The result must be an appropriate whole number and should then be checked against the application's actual minimum, nominal and maximum voltage requirements.",
          "It is worth calculating and reviewing the pack's minimum and maximum voltage at the chosen series count against the downstream electronics' actual operating window — rounding the series count up or down by one can shift both bounds meaningfully, particularly at lower series counts."
        ],
        bullets: [
          "Series count = Required nominal pack voltage ÷ Cell nominal voltage"
        ]
      },
      {
        heading: "How do you calculate parallel cell count?",
        paragraphs: [
          "Parallel count is primarily determined by required capacity and current capability.",
          "For capacity-based sizing, parallel count can be estimated by dividing required Ah by the capacity of one cell.",
          "Where current capability rather than capacity is the limiting requirement — for example, in a high-power, short-runtime application — parallel count should instead be calculated by dividing the required peak or continuous current by the maximum current rating of a single cell, and the larger of the two resulting parallel counts (capacity-driven or current-driven) should be used."
        ],
        bullets: [
          "Parallel count (capacity-driven) = Required capacity ÷ Cell capacity",
          "Parallel count (current-driven) = Required current ÷ Cell max continuous current"
        ]
      },
      {
        heading: "How do you calculate nominal battery energy?",
        bullets: [
          "Energy (Wh) ≈ Nominal voltage × Capacity (Ah)",
          "Example: 48 V × 30 Ah ≈ 1,440 Wh"
        ]
      },
      {
        heading: "How do you estimate runtime?",
        paragraphs: [
          "For a simplified constant-power load, runtime can be estimated by dividing usable battery energy by load power. Real-world runtime will vary because of efficiency, discharge rate, temperature, battery aging and changing load conditions.",
          "For a variable load, a more accurate estimate sums the energy consumed during each distinct phase of the duty cycle and divides the total usable energy by that combined figure, rather than applying a single average-power calculation."
        ],
        bullets: [
          "Runtime (hours) ≈ Usable energy (Wh) ÷ Load power (W)"
        ]
      },
      {
        heading: "How do you estimate charging time?",
        paragraphs: [
          "For a simplified constant-current charge stage, charging time can be estimated by dividing the amount of charge to be replaced (in Ah) by the charging current, then adding additional time for the constant-voltage taper stage, which delivers a smaller proportion of total capacity but can take a disproportionate share of total charge time as current tapers toward the termination threshold."
        ],
        bullets: [
          "Approximate CC-stage time (hours) ≈ Ah to be replaced ÷ Charging current (A)",
          "Total charge time = CC-stage time + CV-stage taper time (varies by charger and termination settings)"
        ]
      },
      {
        heading: "What margins should be included in battery calculations?",
        bullets: [
          "Conversion efficiency",
          "Usable depth of discharge",
          "Temperature effects",
          "Battery aging",
          "Peak current requirements",
          "Manufacturing variation",
          "Future load changes",
          "Required service-life margin",
          "Balancing and imbalance losses over time",
          "Margin between calculated series/parallel count and next standard configuration, where cell format constraints apply"
        ]
      },
      {
        heading: "Professional questions to ask when reviewing calculated specifications",
        bullets: [
          "Which of these figures are based on manufacturer datasheet values, and which are engineering estimates or assumptions?",
          "What combined derating factor has been applied, and does it adequately cover efficiency, temperature and aging together?",
          "Is the parallel count driven by capacity or by current, and has the more restrictive of the two been used?",
          "Has the minimum and maximum pack voltage at the chosen series count been checked against the downstream electronics' actual operating window?",
          "Have these calculated figures been validated against prototype test data yet, or are they still first-pass estimates?",
          "What happens to these calculations if the required runtime or peak current changes by 20% later in the program?"
        ]
      }
    ]
  },

  {
    slug: "battery-buying-guide",
    kind: "Procurement",
    title: "Battery Buying Guide: How to Evaluate Cells, Packs and Components",
    excerpt:
      "A procurement-focused guide covering technical specifications, supplier evaluation, quality documentation, consistency, traceability and commercial considerations.",
    imageLabel: "Battery sourcing and procurement",
    art: "generic",
    body: [
      "Battery procurement should be based on technical suitability and repeatability rather than price alone. A low-cost component that produces inconsistent performance can create significantly higher costs during assembly, testing, warranty and field service.",
      "A structured procurement process should evaluate the actual component specification, supplier capability, quality controls and suitability for the intended application.",
      "Procurement decisions for battery components carry more downstream risk than procurement for many other commodity parts, because inconsistency can manifest as safety issues rather than purely as quality or performance issues. This warrants a more rigorous supplier-evaluation process than might be applied to a lower-risk component category."
    ],
    sections: [
      {
        heading: "What should be specified before requesting a quotation?",
        bullets: [
          "Cell chemistry",
          "Cell format",
          "Nominal capacity",
          "Voltage configuration",
          "Required quantity",
          "Discharge requirements",
          "Charging requirements",
          "BMS requirements",
          "Dimensions",
          "Connector requirements",
          "Application and operating environment",
          "Required documentation",
          "Expected annual volume and delivery schedule",
          "Acceptable lead time and any critical program milestones dependent on delivery"
        ]
      },
      {
        heading: "How should two suppliers be compared?",
        paragraphs: [
          "Compare suppliers using the same technical specification. Price should be considered alongside cell consistency, documentation, traceability, lead time, packaging, quality controls, replacement policy and technical support.",
          "A quotation should not be evaluated solely from the headline unit price when the technical specification is not identical.",
          "A structured comparison matrix — listing each technical, quality and commercial criterion in rows and each supplier in columns — makes it far easier to identify where quotations are genuinely equivalent and where they differ in ways that matter, rather than relying on an overall impression."
        ]
      },
      {
        heading: "Why is cell consistency important for battery packs?",
        paragraphs: [
          "Cells connected in a series-parallel configuration operate together. Significant differences in capacity, resistance or state of charge can contribute to imbalance and reduce predictable pack behavior.",
          "For production applications, incoming inspection and supplier consistency become increasingly important as volume increases.",
          "Consistency also affects manufacturing yield: a supplier whose cells fall within a tight distribution of capacity and resistance makes automated matching and sorting for parallel groups faster and more reliable than a supplier with wide batch-to-batch variation, even if both suppliers meet the same nominal specification on average."
        ]
      },
      {
        heading: "What should be checked during incoming inspection?",
        bullets: [
          "Part number and chemistry",
          "Quantity",
          "Physical dimensions",
          "Visible damage",
          "Terminal condition",
          "Open-circuit voltage where appropriate",
          "Internal resistance where appropriate",
          "Capacity verification using defined test procedures",
          "Batch identification",
          "Packaging condition",
          "Documentation and traceability",
          "Sample-based statistical verification against the supplier's stated distribution, for larger orders"
        ]
      },
      {
        heading: "How should ongoing supplier performance be monitored after the first order?",
        paragraphs: [
          "A supplier's performance on the first sample order does not guarantee consistent performance across all future production batches. Tracking incoming-inspection pass rates, measured capacity and resistance distributions, and any field-return data over time allows early detection of a supplier drifting outside acceptable tolerances, well before it becomes a widespread field issue.",
          "Where volumes justify it, periodic re-qualification of a supplier — repeating a subset of the original qualification tests on a current production batch — is a useful safeguard against undocumented process or material changes at the supplier's factory."
        ]
      },
      {
        heading: "What questions should be asked before placing a production order?",
        bullets: [
          "Is the exact cell model fixed and traceable?",
          "Can the same specification be supplied consistently?",
          "What quality checks are performed before shipment?",
          "What documentation accompanies the shipment?",
          "What is the expected lead time?",
          "How are batches identified?",
          "What happens if incoming inspection identifies non-conforming material?",
          "Can samples be validated before a larger production order?",
          "What is the supplier's process for notifying customers of a material, process or specification change?",
          "What is the expected long-term availability of this exact cell model, and is there a qualified second-source option?"
        ]
      },
      {
        heading: "Professional questions for the broader procurement strategy",
        bullets: [
          "Is there a qualified second-source supplier for critical components, in case the primary supplier faces a supply disruption?",
          "How does the total cost of ownership (including incoming inspection, rework, warranty and field-service costs) compare across suppliers, not just unit price?",
          "What contractual terms exist regarding specification changes, discontinuation notice, and minimum order quantities?",
          "Is there a documented process for escalating and resolving a quality issue discovered after a batch has already been used in production?",
          "How does the supplier's quality-management system align with the certifications required for the target market?",
          "What visibility does the supplier provide into their own upstream raw-material supply chain?"
        ]
      }
    ]
  }
];

export function getResource(slug: string) {
  return resources.find((resource) => resource.slug === slug);
}

