import type { Metadata } from "next";
import Link from "next/link";

import StackBuilder from "@/components/tools/StackBuilder";

export const metadata: Metadata = {
  title: "Supplement Stack Builder — Personalized Stack Quiz | Ethera",
  description:
    "Pick your goals, training, diet, and sleep — get a science-backed supplement stack with doses and timing. Free, no signup.",
  alternates: { canonical: "/tools/stack" },
  openGraph: {
    title: "Supplement Stack Builder | Ethera",
    description:
      "Personalized supplement stack with doses and timing in under 30 seconds.",
    type: "article",
  },
};

const faq = [
  {
    q: "What is a supplement stack?",
    a: "A stack is a deliberate combination of supplements taken together to support a specific goal — building muscle, sleeping better, improving endurance, etc. The point is that ingredients work together (e.g., creatine + protein for muscle, magnesium + glycine for sleep) rather than being taken at random.",
  },
  {
    q: "How do I know which supplements to take?",
    a: "Start with goals, then layer in support for known deficiencies (vitamin D, omega-3, magnesium are common). Pick supplements with the strongest evidence — creatine, whey, caffeine, vitamin D — before adding anything trendy.",
  },
  {
    q: "Can I take all these together?",
    a: "Most stacks built by this tool are safe to combine. Avoid taking iron with calcium or zinc (absorption competition). Talk to a clinician if you take prescription medication or have a chronic condition.",
  },
  {
    q: "How long until I see results?",
    a: "Creatine and caffeine work within days. Protein effects compound over weeks. Adaptogens (ashwagandha, rhodiola) and vitamin D need 4–8 weeks to show measurable change.",
  },
];

const articleLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Personalized Supplement Stack Builder",
  description:
    "Build a personalized supplement stack from goals, training, diet, and sleep.",
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

export default function StackPage() {
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
          <span>Stack Builder</span>
        </nav>

        <article>
          <header className="mb-10">
            <h1 className="font-display uppercase text-4xl md:text-6xl font-bold tracking-tight leading-[0.9] mb-6">
              Build your
              <br />
              supplement stack
            </h1>
            <div className="border-l-2 border-black pl-4 py-1 mb-6">
              <p className="text-xs uppercase tracking-widest text-neutral-500 mb-1">
                TL;DR
              </p>
              <p className="text-base md:text-lg text-neutral-800">
                Pick your <strong>goals, training, diet, and sleep quality</strong>.
                Get a personalized stack with doses and timing in under 30
                seconds. No signup. Educational only — not medical advice.
              </p>
            </div>
            <p className="text-neutral-700 leading-relaxed">
              Recommendations follow ISSN, NIH ODS, and EFSA dosing guidance.
              Adjust based on your tolerance and consult a clinician if you
              take prescription medication.
            </p>
          </header>

          <StackBuilder />

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

          <section className="mt-16 p-6 md:p-8 bg-black text-white rounded-lg">
            <h3 className="font-display uppercase text-2xl md:text-3xl font-bold mb-4">
              Ready to build it?
            </h3>
            <div className="flex gap-4 flex-wrap">
              <Link
                href="/"
                className="px-5 py-3 bg-white text-black uppercase text-sm tracking-widest rounded hover:bg-stone-200 transition"
              >
                Shop Ethera
              </Link>
              <Link
                href="/tools/ingredients"
                className="px-5 py-3 border border-white/40 uppercase text-sm tracking-widest rounded hover:bg-white/10 transition"
              >
                Ingredient glossary
              </Link>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}
