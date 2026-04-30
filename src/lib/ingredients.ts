export interface Ingredient {
  slug: string;
  name: string;
  category: "Performance" | "Recovery" | "Cognition" | "Sleep" | "Foundation";
  tagline: string;
  tldr: string;
  mechanism: string;
  dose: string;
  timing: string;
  evidence: "Strong" | "Moderate" | "Emerging";
  interactions: string[];
  bestFor: string[];
  sources: { title: string; url: string }[];
}

export const ingredients: Ingredient[] = [
  {
    slug: "creatine-monohydrate",
    name: "Creatine Monohydrate",
    category: "Performance",
    tagline: "Most-studied legal performance supplement.",
    tldr:
      "5 g/day improves strength, power, and lean mass. Saturates muscle creatine stores in ~28 days (or 1 week with loading).",
    mechanism:
      "Increases phosphocreatine in muscle, regenerating ATP faster during high-intensity efforts. Also draws water into muscle cells, signaling growth.",
    dose: "3–5 g per day (or 0.03 g/kg). Optional loading: 20–25 g/day for 5–7 days.",
    timing:
      "Anytime, daily. Consistency matters far more than timing. Pair with carbs/protein for marginal uptake boost.",
    evidence: "Strong",
    interactions: [
      "Caffeine: no meaningful interference at normal doses.",
      "Kidney disease: consult clinician before use.",
    ],
    bestFor: ["Lifting", "Sprinting", "Team sports", "Cognitive performance under stress"],
    sources: [
      {
        title: "JISSN Position Stand 2017",
        url: "https://jissn.biomedcentral.com/articles/10.1186/s12970-017-0173-z",
      },
      {
        title: "Mayo Clinic — Creatine",
        url: "https://www.mayoclinic.org/drugs-supplements-creatine/art-20347591",
      },
    ],
  },
  {
    slug: "l-theanine",
    name: "L-Theanine",
    category: "Cognition",
    tagline: "The chill that pairs with caffeine.",
    tldr:
      "Amino acid from tea leaves. 100–200 mg with caffeine reduces jitter while maintaining alertness. Mild relaxation without sedation.",
    mechanism:
      "Increases alpha-wave activity, modulates GABA, glutamate, and dopamine. Effect synergizes with caffeine on attention.",
    dose: "100–200 mg per dose, up to 400 mg/day.",
    timing: "Alongside caffeine, or 30 min before focused work.",
    evidence: "Moderate",
    interactions: [
      "Caffeine: synergistic, classic 1:2 (caffeine:theanine) stack.",
      "Blood pressure medication: may amplify effect — consult clinician.",
    ],
    bestFor: ["Focus sessions", "Studying", "Caffeine-sensitive users"],
    sources: [
      {
        title: "Owen et al. The combined effects of L-theanine and caffeine",
        url: "https://pubmed.ncbi.nlm.nih.gov/18681988/",
      },
    ],
  },
  {
    slug: "ashwagandha",
    name: "Ashwagandha (KSM-66)",
    category: "Recovery",
    tagline: "Adaptogen for stress and recovery.",
    tldr:
      "300–600 mg/day of a standardized extract (KSM-66 or Sensoril) modestly lowers cortisol, improves sleep onset, and supports recovery in trained populations.",
    mechanism:
      "Adaptogenic herb. Modulates HPA axis, reducing cortisol response to stressors.",
    dose: "300–600 mg of standardized extract daily (KSM-66 or Sensoril).",
    timing: "Daily, with food. Effects build over 4–8 weeks.",
    evidence: "Moderate",
    interactions: [
      "Thyroid medication: may amplify effects — monitor with clinician.",
      "Pregnancy: avoid.",
      "Immunosuppressants: theoretical interaction.",
    ],
    bestFor: ["High-stress periods", "Sleep onset issues", "Recovery from heavy training"],
    sources: [
      {
        title: "Lopresti et al. Stress, depression, and ashwagandha",
        url: "https://pubmed.ncbi.nlm.nih.gov/31517876/",
      },
    ],
  },
  {
    slug: "magnesium-glycinate",
    name: "Magnesium Glycinate",
    category: "Sleep",
    tagline: "Calm magnesium that doesn't tank your gut.",
    tldr:
      "Magnesium bound to glycine. High bioavailability, low GI distress, mildly sedating. Good evening supplement at 200–400 mg elemental Mg.",
    mechanism:
      "Cofactor for 300+ enzymes. Glycine itself has mild calming effects on the CNS. Most adults under-consume magnesium.",
    dose: "200–400 mg elemental magnesium, 1 hr before bed.",
    timing: "Evening. Splitting doses (AM + PM) reduces side effects further.",
    evidence: "Moderate",
    interactions: [
      "Antibiotics (tetracyclines, quinolones): take 2 hrs apart.",
      "Kidney disease: consult clinician — magnesium clears via kidneys.",
    ],
    bestFor: ["Sleep onset", "Muscle cramps", "Stress / anxiety"],
    sources: [
      {
        title: "NIH ODS — Magnesium Fact Sheet",
        url: "https://ods.od.nih.gov/factsheets/Magnesium-HealthProfessional/",
      },
    ],
  },
  {
    slug: "caffeine",
    name: "Caffeine",
    category: "Performance",
    tagline: "The original ergogenic aid.",
    tldr:
      "3–6 mg/kg taken 30–60 min pre-training reliably improves endurance, strength, and reaction time. Half-life ~5 hrs.",
    mechanism:
      "Adenosine receptor antagonist. Blocks fatigue signaling, increases catecholamines.",
    dose: "100–400 mg per dose, up to 400 mg/day for healthy adults.",
    timing: "30–60 min pre-training. Avoid within 6–8 hrs of bedtime.",
    evidence: "Strong",
    interactions: [
      "L-theanine: smooths the curve.",
      "Stimulant medications: additive — use caution.",
      "Pregnancy: limit to <200 mg/day.",
    ],
    bestFor: ["Pre-workout", "Endurance events", "Morning alertness"],
    sources: [
      {
        title: "ISSN Position Stand: Caffeine and Exercise",
        url: "https://jissn.biomedcentral.com/articles/10.1186/s12970-020-00383-4",
      },
      {
        title: "FDA — Spilling the Beans",
        url: "https://www.fda.gov/consumers/consumer-updates/spilling-beans-how-much-caffeine-too-much",
      },
    ],
  },
  {
    slug: "beta-alanine",
    name: "Beta-Alanine",
    category: "Performance",
    tagline: "Buffers lactic acid in 1–4 minute efforts.",
    tldr:
      "3–6 g/day raises muscle carnosine, improving endurance in 1–4 min high-intensity work. Causes harmless skin tingling (paresthesia).",
    mechanism:
      "Rate-limiting precursor for carnosine synthesis. Carnosine buffers H+ ions in muscle, delaying acidosis.",
    dose: "3–6 g/day, split into 0.8–1.6 g doses to reduce tingling.",
    timing: "Daily. Effects build over 4–8 weeks of saturation.",
    evidence: "Strong",
    interactions: ["No clinically meaningful interactions documented."],
    bestFor: ["CrossFit", "400–1500m running", "High-rep lifting"],
    sources: [
      {
        title: "ISSN Position Stand: Beta-Alanine",
        url: "https://jissn.biomedcentral.com/articles/10.1186/s12970-015-0090-y",
      },
    ],
  },
  {
    slug: "citrulline-malate",
    name: "Citrulline Malate",
    category: "Performance",
    tagline: "Pump and reduced soreness.",
    tldr:
      "6–8 g taken 30–60 min pre-training boosts nitric oxide, improves endurance, and reduces next-day soreness in resistance training.",
    mechanism:
      "Converts to arginine more efficiently than supplemental arginine. Increases NO synthesis → vasodilation → 'pump' and improved O2 delivery.",
    dose: "6–8 g citrulline malate (or 3–5 g L-citrulline).",
    timing: "30–60 min pre-training.",
    evidence: "Moderate",
    interactions: ["Blood pressure medication: may amplify effect — monitor."],
    bestFor: ["Lifting volume", "Endurance training", "Reducing DOMS"],
    sources: [
      {
        title: "Pérez-Guisado & Jakeman 2010",
        url: "https://pubmed.ncbi.nlm.nih.gov/20386132/",
      },
    ],
  },
  {
    slug: "vitamin-d3",
    name: "Vitamin D3",
    category: "Foundation",
    tagline: "The deficiency hiding in plain sight.",
    tldr:
      "2000–4000 IU/day supports strength, mood, and immunity. Most adults are deficient — get a 25(OH)D blood test if unsure.",
    mechanism:
      "Steroid hormone precursor. Affects 1000+ genes, including muscle protein synthesis and immune regulation.",
    dose: "2000–4000 IU/day (target 25(OH)D blood level 30–50 ng/mL).",
    timing: "Daily, with a fat-containing meal for absorption.",
    evidence: "Strong",
    interactions: [
      "Thiazide diuretics: can elevate calcium — monitor.",
      "Take with vitamin K2 to direct calcium to bones, not arteries.",
    ],
    bestFor: ["Indoor workers", "Northern latitudes", "Dark skin tones"],
    sources: [
      {
        title: "NIH ODS — Vitamin D Fact Sheet",
        url: "https://ods.od.nih.gov/factsheets/VitaminD-HealthProfessional/",
      },
    ],
  },
  {
    slug: "omega-3",
    name: "Omega-3 (EPA + DHA)",
    category: "Foundation",
    tagline: "Inflammation control + brain support.",
    tldr:
      "2–3 g combined EPA+DHA daily reduces inflammation, supports recovery, brain function, and cardiovascular health. Most diets are short on it.",
    mechanism:
      "EPA and DHA incorporate into cell membranes, modulating inflammatory eicosanoid production.",
    dose: "2–3 g combined EPA+DHA per day (read the label — fish oil ≠ EPA+DHA mg).",
    timing: "Daily, with food. Refrigerate to slow oxidation.",
    evidence: "Strong",
    interactions: [
      "Anticoagulants (warfarin): increased bleeding risk — consult clinician.",
    ],
    bestFor: ["Recovery", "Cognitive aging", "Cardiovascular health", "Vegan diets (use algal oil)"],
    sources: [
      {
        title: "NIH ODS — Omega-3 Fact Sheet",
        url: "https://ods.od.nih.gov/factsheets/Omega3FattyAcids-HealthProfessional/",
      },
    ],
  },
  {
    slug: "rhodiola-rosea",
    name: "Rhodiola Rosea",
    category: "Cognition",
    tagline: "Anti-fatigue adaptogen.",
    tldr:
      "200–600 mg/day of standardized extract (3% rosavins, 1% salidroside) reduces mental fatigue and improves performance under stress.",
    mechanism:
      "Adaptogen affecting serotonin, dopamine, and HPA axis. Improves stress tolerance and reduces fatigue perception.",
    dose: "200–600 mg/day of standardized extract.",
    timing: "Morning or early afternoon (can be stimulating). Cycle 6 weeks on, 2 off.",
    evidence: "Moderate",
    interactions: [
      "Antidepressants (SSRIs, MAOIs): potential serotonergic interaction — consult clinician.",
    ],
    bestFor: ["Burnout", "Mental fatigue", "Endurance under sleep deprivation"],
    sources: [
      {
        title: "Ishaque et al. Rhodiola rosea systematic review",
        url: "https://pubmed.ncbi.nlm.nih.gov/22643043/",
      },
    ],
  },
];

export function getIngredient(slug: string) {
  return ingredients.find((i) => i.slug === slug);
}
