import type { Metadata } from "next";
import Link from "next/link";

import { ingredients } from "@/lib/ingredients";

export const metadata: Metadata = {
  title: "Supplement Ingredient Glossary | Ethera",
  description:
    "Plain-language breakdowns of the most-used supplement ingredients. Mechanism, dose, timing, interactions, and sources.",
  alternates: { canonical: "/tools/ingredients" },
  openGraph: {
    title: "Supplement Ingredient Glossary | Ethera",
    description:
      "Mechanism, dose, timing, and sources for popular supplement ingredients.",
    type: "website",
  },
};

const itemListLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Ethera Ingredient Glossary",
  itemListElement: ingredients.map((i, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    name: i.name,
    url: `/tools/ingredients/${i.slug}`,
  })),
};

const CATEGORIES = [
  "Performance",
  "Recovery",
  "Cognition",
  "Sleep",
  "Foundation",
] as const;

export default function IngredientsIndex() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />

      <main className="px-sectionX-m md:px-sectionX py-16 md:py-24 max-w-5xl mx-auto">
        <nav className="text-xs uppercase tracking-widest text-neutral-500 mb-6">
          <Link href="/tools" className="hover:text-neutral-900 transition">
            Tools
          </Link>
          <span className="mx-2">/</span>
          <span>Ingredients</span>
        </nav>

        <header className="mb-12 md:mb-16">
          <h1 className="font-display uppercase text-4xl md:text-7xl font-bold tracking-tight leading-[0.9] mb-6">
            Ingredient
            <br />
            Glossary
          </h1>
          <p className="text-lg md:text-xl text-neutral-700 max-w-2xl">
            Plain-language breakdowns of what each ingredient does, how to dose
            it, when to take it, and what the research says.
          </p>
        </header>

        {CATEGORIES.map((cat) => {
          const items = ingredients.filter((i) => i.category === cat);
          if (items.length === 0) return null;
          return (
            <section key={cat} className="mb-12">
              <h2 className="font-display uppercase text-2xl md:text-3xl font-bold mb-4">
                {cat}
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {items.map((i) => (
                  <li key={i.slug}>
                    <Link
                      href={`/tools/ingredients/${i.slug}`}
                      className="block p-5 border border-black/10 bg-white rounded-md hover:border-black/40 hover:-translate-y-0.5 transition-all"
                    >
                      <div className="flex items-baseline justify-between mb-2 gap-2">
                        <h3 className="font-display uppercase text-lg md:text-xl font-bold">
                          {i.name}
                        </h3>
                        <EvidenceBadge level={i.evidence} />
                      </div>
                      <p className="text-sm text-neutral-700">{i.tagline}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </main>
    </>
  );
}

function EvidenceBadge({ level }: { level: "Strong" | "Moderate" | "Emerging" }) {
  const styles =
    level === "Strong"
      ? "bg-black text-white"
      : level === "Moderate"
      ? "bg-neutral-200 text-neutral-800"
      : "bg-stone-100 text-neutral-600 border border-black/10";
  return (
    <span
      className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded ${styles}`}
    >
      {level}
    </span>
  );
}
