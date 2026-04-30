import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Supplement Tools & Calculators | Ethera",
  description:
    "Free, science-backed supplement calculators. Creatine dosage, protein intake, caffeine cutoff, stack builder. No signup. Built by Ethera.",
  alternates: { canonical: "/tools" },
  openGraph: {
    title: "Free Supplement Tools & Calculators | Ethera",
    description:
      "Free, science-backed supplement calculators. Creatine dosage, protein intake, caffeine cutoff, stack builder.",
    type: "website",
  },
};

type Tool = {
  slug: string;
  title: string;
  blurb: string;
  status: "live" | "soon";
};

const tools: Tool[] = [
  {
    slug: "creatine",
    title: "Creatine Dosage Calculator",
    blurb:
      "Bodyweight-based daily dose for creatine monohydrate. Optional loading phase. Based on JISSN guidelines.",
    status: "live",
  },
  {
    slug: "protein",
    title: "Protein Intake Calculator",
    blurb:
      "Daily protein target by bodyweight, goal, and activity. Converts to scoops and meals.",
    status: "live",
  },
  {
    slug: "caffeine",
    title: "Caffeine Cutoff Timer",
    blurb:
      "Half-life math for your last coffee. Find the latest you can drink without wrecking sleep.",
    status: "live",
  },
  {
    slug: "stack",
    title: "Stack Builder",
    blurb:
      "Pick goals, get a personalized supplement stack with timing and doses.",
    status: "live",
  },
  {
    slug: "ingredients",
    title: "Ingredient Glossary",
    blurb:
      "Plain-language breakdowns: mechanism, dose, timing, interactions, sources.",
    status: "live",
  },
];

const itemListLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Ethera Supplement Tools",
  itemListElement: tools.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: t.title,
    url: `/tools/${t.slug}`,
  })),
};

export default function ToolsIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      <main className="px-sectionX-m md:px-sectionX py-16 md:py-24 max-w-5xl mx-auto">
        <header className="mb-12 md:mb-16">
          <p className="subheading text-neutral-500 mb-4">Ethera / Tools</p>
          <h1 className="font-display uppercase text-4xl md:text-7xl font-bold tracking-tight leading-[0.9] mb-6">
            Free Supplement
            <br />
            Tools &amp; Calculators
          </h1>
          <p className="text-lg md:text-xl text-neutral-700 max-w-2xl">
            Science-backed math, no fluff. Built for people who&apos;d rather
            run the numbers than read another influencer thread.
          </p>
        </header>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {tools.map((tool) => {
            const isLive = tool.status === "live";
            const card = (
              <article
                className={`group relative h-full p-6 md:p-8 border border-black/10 bg-white rounded-lg transition-all ${
                  isLive
                    ? "hover:border-black/40 hover:-translate-y-0.5"
                    : "opacity-60"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <span
                    className={`text-xs uppercase tracking-widest px-2 py-1 rounded ${
                      isLive
                        ? "bg-black text-white"
                        : "bg-neutral-200 text-neutral-700"
                    }`}
                  >
                    {isLive ? "Live" : "Soon"}
                  </span>
                  {isLive && (
                    <span className="text-xl group-hover:translate-x-1 transition-transform">
                      &rarr;
                    </span>
                  )}
                </div>
                <h2 className="font-display uppercase text-2xl md:text-3xl font-bold mb-2 leading-tight">
                  {tool.title}
                </h2>
                <p className="text-neutral-700 text-sm md:text-base">
                  {tool.blurb}
                </p>
              </article>
            );

            return (
              <li key={tool.slug}>
                {isLive ? (
                  <Link href={`/tools/${tool.slug}`} className="block h-full">
                    {card}
                  </Link>
                ) : (
                  <div className="h-full cursor-not-allowed">{card}</div>
                )}
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
}
