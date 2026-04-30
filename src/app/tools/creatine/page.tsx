import type { Metadata } from "next";
import Link from "next/link";

import CreatineCalculator from "@/components/tools/CreatineCalculator";

export const metadata: Metadata = {
  title: "Creatine Dosage Calculator — How Much Creatine Should I Take? | Ethera",
  description:
    "Calculate your daily creatine monohydrate dose by bodyweight. Optional loading phase. Based on JISSN guidelines and Mayo Clinic dosage. Free, no signup.",
  alternates: { canonical: "/tools/creatine" },
  openGraph: {
    title: "Creatine Dosage Calculator | Ethera",
    description:
      "Daily creatine dose by bodyweight. Loading phase optional. Based on JISSN.",
    type: "article",
  },
};

const faq = [
  {
    q: "How much creatine should I take per day?",
    a: "For most adults, 3–5 g of creatine monohydrate per day is the evidence-based maintenance dose. Scale by bodyweight at ~0.1 g/kg — heavier athletes (80–100+ kg) typically need 8–10 g/day to keep muscle stores saturated. Past full saturation, additional creatine is simply excreted.",
  },
  {
    q: "Do I need a loading phase?",
    a: "No. A loading phase (20–25 g/day for 5–7 days) saturates muscle creatine faster, but taking 3–5 g daily reaches the same saturation in roughly 28 days with no loss of long-term benefit.",
  },
  {
    q: "When is the best time to take creatine?",
    a: "Timing has a small effect compared to consistency. Taking it daily — pre- or post-workout, or with any meal — is what matters. Pair with carbs or protein to slightly improve uptake.",
  },
  {
    q: "Which form of creatine is best?",
    a: "Creatine monohydrate is the most studied, most effective, and cheapest form. Other forms (HCl, ethyl ester, buffered) have not shown clinically meaningful advantages.",
  },
  {
    q: "Is creatine safe?",
    a: "Creatine is one of the most studied sports supplements and is considered safe at the recommended doses for healthy adults. Consult a clinician if you have kidney disease or take prescription medication.",
  },
];

const articleLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How Much Creatine Should I Take? Daily Dose Calculator",
  description:
    "Bodyweight-based daily creatine monohydrate dose with optional loading phase.",
  author: {
    "@type": "Organization",
    name: "Ethera Research",
    url: "https://ethera.example/about",
  },
  publisher: {
    "@type": "Organization",
    name: "Ethera Supplements",
  },
  datePublished: "2026-04-26",
  dateModified: "2026-04-26",
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

const howToLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Calculate Your Daily Creatine Dose",
  step: [
    {
      "@type": "HowToStep",
      name: "Enter bodyweight",
      text: "Enter your bodyweight in kilograms or pounds.",
    },
    {
      "@type": "HowToStep",
      name: "Choose loading or maintenance",
      text: "Optionally enable the loading phase to saturate faster.",
    },
    {
      "@type": "HowToStep",
      name: "Take consistently",
      text: "Take your daily dose with water or any meal. Consistency outweighs timing.",
    },
  ],
};

export default function CreatinePage() {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
      />

      <main className="px-sectionX-m md:px-sectionX py-16 md:py-24 max-w-3xl mx-auto">
        <nav className="text-xs uppercase tracking-widest text-neutral-500 mb-6">
          <Link href="/tools" className="hover:text-neutral-900 transition">
            Tools
          </Link>
          <span className="mx-2">/</span>
          <span>Creatine Calculator</span>
        </nav>

        <article>
          <header className="mb-10">
            <h1 className="font-display uppercase text-4xl md:text-6xl font-bold tracking-tight leading-[0.9] mb-6">
              How much creatine
              <br />
              should I take?
            </h1>
            <div className="border-l-2 border-black pl-4 py-1 mb-6">
              <p className="text-xs uppercase tracking-widest text-neutral-500 mb-1">
                TL;DR
              </p>
              <p className="text-base md:text-lg text-neutral-800">
                <strong>3–5 g of creatine monohydrate per day</strong> for most
                adults, scaled by bodyweight at ~0.1 g/kg (heavier athletes need
                up to 8–10 g/day). Loading phase (20–25 g/day for 5–7 days) is
                optional — it saturates muscles faster but reaches the same end
                state as 4 weeks of maintenance.
              </p>
            </div>
            <p className="text-neutral-700 leading-relaxed">
              Use the calculator below to get a personalized daily dose by
              bodyweight. The math follows the{" "}
              <a
                href="https://jissn.biomedcentral.com/articles/10.1186/s12970-021-00412-w"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:no-underline"
              >
                International Society of Sports Nutrition position stand
              </a>{" "}
              and{" "}
              <a
                href="https://www.mayoclinic.org/drugs-supplements-creatine/art-20347591"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:no-underline"
              >
                Mayo Clinic dosage guidance
              </a>
              .
            </p>
          </header>

          <CreatineCalculator />

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
                Antonio J, et al.{" "}
                <em>
                  Common questions and misconceptions about creatine
                  supplementation.
                </em>{" "}
                JISSN, 2021.{" "}
                <a
                  href="https://jissn.biomedcentral.com/articles/10.1186/s12970-021-00412-w"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Link
                </a>
              </li>
              <li>
                Mayo Clinic. <em>Creatine — Drugs &amp; Supplements.</em>{" "}
                <a
                  href="https://www.mayoclinic.org/drugs-supplements-creatine/art-20347591"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Link
                </a>
              </li>
              <li>
                Kreider RB, et al.{" "}
                <em>
                  ISSN exercise &amp; sports nutrition review update: research
                  &amp; recommendations.
                </em>{" "}
                JISSN, 2018.
              </li>
            </ul>
          </section>

          <section className="mt-16 p-6 md:p-8 bg-black text-white rounded-lg">
            <p className="text-xs uppercase tracking-widest text-white/60 mb-3">
              Next up
            </p>
            <h3 className="font-display uppercase text-2xl md:text-3xl font-bold mb-4">
              Need a creatine supplement?
            </h3>
            <p className="text-white/80 mb-6">
              Ethera&apos;s lineup is in development. Browse the store or
              explore other tools.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link
                href="/"
                className="px-5 py-3 bg-white text-black uppercase text-sm tracking-widest rounded hover:bg-stone-200 transition"
              >
                Shop
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
