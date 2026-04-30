import type { Metadata } from "next";
import Link from "next/link";

import CaffeineCalculator from "@/components/tools/CaffeineCalculator";

export const metadata: Metadata = {
  title:
    "Caffeine Cutoff Calculator — When Should I Stop Drinking Coffee? | Ethera",
  description:
    "Calculate the latest you can drink coffee without wrecking sleep. Half-life math (5 hours). Free, no signup.",
  alternates: { canonical: "/tools/caffeine" },
  openGraph: {
    title: "Caffeine Cutoff Calculator | Ethera",
    description:
      "Half-life math for your last coffee. Find your safe cutoff time.",
    type: "article",
  },
};

const faq = [
  {
    q: "When should I stop drinking coffee before bed?",
    a: "At least 6–8 hours before bedtime for most people. Caffeine has a half-life of about 5 hours, so a 200 mg coffee at 2 PM still leaves ~50 mg in your system by 10 PM — enough to delay sleep onset and reduce deep sleep.",
  },
  {
    q: "How long does caffeine stay in your system?",
    a: "Half-life averages 5 hours in healthy adults but ranges from 1.5 to 9.5 hours depending on genetics, liver enzymes, smoking, pregnancy, and certain medications. Slow metabolizers feel coffee for much longer.",
  },
  {
    q: "Does caffeine still affect sleep if you don't feel it?",
    a: "Yes. Studies show caffeine consumed even 6 hours before bed reduces total sleep time and slow-wave sleep — even when subjects report 'feeling fine.' Subjective alertness and objective sleep quality decouple.",
  },
  {
    q: "What is a safe daily caffeine intake?",
    a: "Up to 400 mg per day is considered safe for most healthy adults (FDA, EFSA). Pregnant individuals should stay under 200 mg. Sensitivity varies — some adults feel anxiety or sleep disruption at 100 mg.",
  },
  {
    q: "How much caffeine is in common drinks?",
    a: "Drip coffee (8 oz): ~95 mg. Espresso (1 shot): ~64 mg. Energy drink (8 oz): 80–200 mg. Black tea (8 oz): ~47 mg. Pre-workout: 150–400 mg per serving.",
  },
];

const articleLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Caffeine Cutoff Calculator: When to Stop Drinking Coffee",
  description: "Personalized caffeine cutoff time using half-life math.",
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

export default function CaffeinePage() {
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
          <span>Caffeine Cutoff</span>
        </nav>

        <article>
          <header className="mb-10">
            <h1 className="font-display uppercase text-4xl md:text-6xl font-bold tracking-tight leading-[0.9] mb-6">
              When should I
              <br />
              stop drinking coffee?
            </h1>
            <div className="border-l-2 border-black pl-4 py-1 mb-6">
              <p className="text-xs uppercase tracking-widest text-neutral-500 mb-1">
                TL;DR
              </p>
              <p className="text-base md:text-lg text-neutral-800">
                <strong>~6–8 hours before bed.</strong> Caffeine half-life is
                ~5 hrs. A 200 mg coffee at 2 PM still leaves 50 mg in your
                system by 10 PM. Calculator gives you a personalized cutoff.
              </p>
            </div>
            <p className="text-neutral-700 leading-relaxed">
              Math uses standard pharmacokinetics: 5-hour half-life, 50 mg sleep
              threshold based on{" "}
              <a
                href="https://pubmed.ncbi.nlm.nih.gov/24235903/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:no-underline"
              >
                Drake et al., J Clin Sleep Med (2013)
              </a>
              .
            </p>
          </header>

          <CaffeineCalculator />

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
                Drake C, et al.{" "}
                <em>
                  Caffeine effects on sleep taken 0, 3, or 6 hours before going
                  to bed.
                </em>{" "}
                J Clin Sleep Med, 2013.{" "}
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/24235903/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  PubMed
                </a>
              </li>
              <li>
                FDA. <em>Spilling the Beans: How Much Caffeine is Too Much?</em>{" "}
                <a
                  href="https://www.fda.gov/consumers/consumer-updates/spilling-beans-how-much-caffeine-too-much"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Link
                </a>
              </li>
            </ul>
          </section>

          <section className="mt-16 p-6 md:p-8 bg-black text-white rounded-lg">
            <h3 className="font-display uppercase text-2xl md:text-3xl font-bold mb-4">
              Need cleaner energy?
            </h3>
            <p className="text-white/80 mb-6">
              Smart pre-workouts dose caffeine by serving and pair with
              L-theanine to smooth the curve.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link
                href="/products/pre-workout"
                className="px-5 py-3 bg-white text-black uppercase text-sm tracking-widest rounded hover:bg-stone-200 transition"
              >
                Shop pre-workout
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
