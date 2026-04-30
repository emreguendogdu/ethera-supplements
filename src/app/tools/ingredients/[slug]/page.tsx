import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getIngredient, ingredients } from "@/lib/ingredients";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ingredients.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const ing = getIngredient(slug);
  if (!ing) return { title: "Ingredient not found | Ethera" };

  return {
    title: `${ing.name} — Dose, Timing, Mechanism | Ethera`,
    description: `${ing.tagline} ${ing.tldr}`,
    alternates: { canonical: `/tools/ingredients/${ing.slug}` },
    openGraph: {
      title: `${ing.name} | Ethera`,
      description: ing.tagline,
      type: "article",
    },
  };
}

export default async function IngredientPage({ params }: PageProps) {
  const { slug } = await params;
  const ing = getIngredient(slug);
  if (!ing) notFound();

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${ing.name}: Dose, Timing, Mechanism`,
    description: ing.tldr,
    author: { "@type": "Organization", name: "Ethera Research" },
    publisher: { "@type": "Organization", name: "Ethera Supplements" },
    datePublished: "2026-04-27",
    dateModified: "2026-04-27",
  };

  const substanceLd = {
    "@context": "https://schema.org",
    "@type": "DietarySupplement",
    name: ing.name,
    description: ing.tldr,
    activeIngredient: ing.name,
    recommendedIntake: ing.dose,
    targetPopulation: ing.bestFor.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(substanceLd) }}
      />

      <main className="px-sectionX-m md:px-sectionX py-16 md:py-24 max-w-3xl mx-auto">
        <nav className="text-xs uppercase tracking-widest text-neutral-500 mb-6">
          <Link href="/tools" className="hover:text-neutral-900 transition">
            Tools
          </Link>
          <span className="mx-2">/</span>
          <Link
            href="/tools/ingredients"
            className="hover:text-neutral-900 transition"
          >
            Ingredients
          </Link>
          <span className="mx-2">/</span>
          <span>{ing.name}</span>
        </nav>

        <article>
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs uppercase tracking-widest px-2 py-1 rounded bg-neutral-200 text-neutral-800">
                {ing.category}
              </span>
              <span
                className={`text-xs uppercase tracking-widest px-2 py-1 rounded ${
                  ing.evidence === "Strong"
                    ? "bg-black text-white"
                    : ing.evidence === "Moderate"
                    ? "bg-neutral-200 text-neutral-800"
                    : "bg-stone-100 text-neutral-600 border border-black/10"
                }`}
              >
                {ing.evidence} evidence
              </span>
            </div>

            <h1 className="font-display uppercase text-4xl md:text-6xl font-bold tracking-tight leading-[0.9] mb-4">
              {ing.name}
            </h1>
            <p className="text-lg md:text-xl text-neutral-700 mb-6">
              {ing.tagline}
            </p>

            <div className="border-l-2 border-black pl-4 py-1">
              <p className="text-xs uppercase tracking-widest text-neutral-500 mb-1">
                TL;DR
              </p>
              <p className="text-base md:text-lg text-neutral-800">{ing.tldr}</p>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            <InfoCard label="Dose" value={ing.dose} />
            <InfoCard label="Timing" value={ing.timing} />
          </div>

          <Section title="How it works">
            <p className="text-neutral-700 leading-relaxed">{ing.mechanism}</p>
          </Section>

          <Section title="Best for">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ing.bestFor.map((b) => (
                <li
                  key={b}
                  className="px-3 py-2 bg-stone-50 border border-black/10 rounded-md text-sm"
                >
                  {b}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Interactions & cautions">
            <ul className="space-y-2">
              {ing.interactions.map((x) => (
                <li
                  key={x}
                  className="text-neutral-700 leading-relaxed flex gap-2 before:content-['—'] before:text-neutral-400"
                >
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Sources">
            <ul className="space-y-2 text-sm">
              {ing.sources.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:no-underline text-neutral-700"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </Section>

          <section className="mt-16 p-6 md:p-8 bg-black text-white rounded-lg">
            <h3 className="font-display uppercase text-2xl md:text-3xl font-bold mb-4">
              Build your full stack
            </h3>
            <p className="text-white/80 mb-6">
              Use the stack builder to combine {ing.name.toLowerCase()} with
              the rest of your supplements.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link
                href="/tools/stack"
                className="px-5 py-3 bg-white text-black uppercase text-sm tracking-widest rounded hover:bg-stone-200 transition"
              >
                Stack builder
              </Link>
              <Link
                href="/tools/ingredients"
                className="px-5 py-3 border border-white/40 uppercase text-sm tracking-widest rounded hover:bg-white/10 transition"
              >
                All ingredients
              </Link>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-5 border border-black/10 bg-white rounded-md">
      <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2">
        {label}
      </p>
      <p className="text-neutral-900">{value}</p>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="font-display uppercase text-2xl md:text-3xl font-bold mb-4">
        {title}
      </h2>
      {children}
    </section>
  );
}
