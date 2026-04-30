import type { Metadata } from "next";
import Link from "next/link";

import ProteinCalculator from "@/components/tools/ProteinCalculator";

export const metadata: Metadata = {
  title:
    "Protein Intake Calculator — How Much Protein Do I Need Per Day? | Ethera",
  description:
    "Calculate your daily protein target by bodyweight, goal, and activity. Converts to grams, scoops, and meals. Based on ISSN guidelines.",
  alternates: { canonical: "/tools/protein" },
  openGraph: {
    title: "Protein Intake Calculator | Ethera",
    description:
      "Daily protein target by bodyweight, goal, and activity. Free, no signup.",
    type: "article",
  },
};

const faq = [
  {
    q: "How much protein do I need per day?",
    a: "For active adults, 1.6–2.2 g per kg of bodyweight per day supports muscle growth and recovery. Sedentary adults need ~0.8–1.2 g/kg. Cutters benefit from a slightly higher range (1.8–2.4 g/kg) to preserve lean mass during a deficit.",
  },
  {
    q: "Can you eat too much protein?",
    a: "Healthy adults tolerate intakes up to ~3.0 g/kg/day with no documented harm. Very high intakes are simply unnecessary — once muscle protein synthesis is maxed out, extra protein is oxidized for energy.",
  },
  {
    q: "Do I need protein from supplements?",
    a: "No. Whole-food protein (meat, eggs, dairy, legumes) is sufficient. Whey or plant protein powders are convenient when you can't hit your target through meals — especially around training.",
  },
  {
    q: "How much protein per meal?",
    a: "20–40 g per meal, spread across 3–5 meals, maximizes muscle protein synthesis. Larger doses still get used, but per-meal returns diminish past ~40 g.",
  },
  {
    q: "Does protein timing matter?",
    a: "Total daily intake matters most. Within that, distributing protein evenly across the day and including a serving within ~2 hours post-training is the strongest evidence-based recommendation.",
  },
];

const articleLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How Much Protein Do I Need Per Day? Daily Intake Calculator",
  description:
    "Personalized daily protein target by bodyweight, goal, and activity.",
  author: { "@type": "Organization", name: "Ethera Research" },
  publisher: { "@type": "Organization", name: "Ethera Supplements" },
  datePublished: "2026-04-27",
  dateModified: "2026-04-27",
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function ProteinPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <main className="px-sectionX-m md:px-sectionX py-16 md:py-24 max-w-3xl mx-auto">
        <nav className="text-xs uppercase tracking-widest text-neutral-500 mb-6">
          <Link href="/tools" className="hover:text-neutral-900 transition">
            Tools
          </Link>
          <span className="mx-2">/</span>
          <span>Protein Calculator</span>
        </nav>

        <article>
          <header className="mb-10">
            <h1 className="font-display uppercase text-4xl md:text-6xl font-bold tracking-tight leading-[0.9] mb-6">
              How much protein
              <br />
              do I need?
            </h1>
            <div className="border-l-2 border-black pl-4 py-1 mb-6">
              <p className="text-xs uppercase tracking-widest text-neutral-500 mb-1">
                TL;DR
              </p>
              <p className="text-base md:text-lg text-neutral-800">
                <strong>1.6–2.2 g per kg of bodyweight per day</strong> for
                active adults building muscle. Sedentary: 0.8–1.2 g/kg. Cutting:
                1.8–2.4 g/kg. Spread across 3–5 meals at 20–40 g per meal.
              </p>
            </div>
            <p className="text-neutral-700 leading-relaxed">
              Calculator factors in your goal, activity level, and bodyweight,
              following the{" "}
              <a
                href="https://jissn.biomedcentral.com/articles/10.1186/s12970-017-0177-8"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:no-underline"
              >
                ISSN protein position stand
              </a>
              .
            </p>
          </header>

          <ProteinCalculator />

          <section className="mt-16">
            <h2 className="font-display uppercase text-2xl md:text-4xl font-bold mb-6">
              FAQ
            </h2>
            <div className="space-y-6">
              {faq.map((f) => (
                <div
                  key={f.q}
                  className="border-b border-black/10 pb-6 last:border-0"
                >
                  <h3 className="font-bold text-lg md:text-xl mb-2">{f.q}</h3>
                  <p className="text-neutral-700 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-16">
            <h2 className="font-display uppercase text-2xl md:text-4xl font-bold mb-6">
              Sources
            </h2>
            <ul className="space-y-2 text-sm text-neutral-700">
              <li>
                Jäger R, et al.{" "}
                <em>
                  International Society of Sports Nutrition Position Stand:
                  Protein and Exercise.
                </em>{" "}
                JISSN, 2017.{" "}
                <a
                  href="https://jissn.biomedcentral.com/articles/10.1186/s12970-017-0177-8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Link
                </a>
              </li>
              <li>
                Morton RW, et al.{" "}
                <em>
                  A systematic review, meta-analysis and meta-regression of the
                  effect of protein supplementation on resistance training-
                  induced gains in muscle mass and strength in healthy adults.
                </em>{" "}
                Br J Sports Med, 2018.
              </li>
            </ul>
          </section>

          <section className="mt-16 p-6 md:p-8 bg-black text-white rounded-lg">
            <h3 className="font-display uppercase text-2xl md:text-3xl font-bold mb-4">
              Hit your number with Ethera Whey
            </h3>
            <div className="flex gap-4 flex-wrap">
              <Link
                href="/products/whey-isolate"
                className="px-5 py-3 bg-white text-black uppercase text-sm tracking-widest rounded hover:bg-stone-200 transition"
              >
                Shop whey
              </Link>
              <Link
                href="/tools"
                className="px-5 py-3 border border-white/40 uppercase text-sm tracking-widest rounded hover:bg-white/10 transition"
              >
                More tools
              </Link>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}
