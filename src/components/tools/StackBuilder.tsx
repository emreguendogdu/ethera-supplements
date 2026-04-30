"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type GoalKey = "muscle" | "energy" | "focus" | "sleep" | "recovery" | "endurance";
type TrainingKey = "lifting" | "endurance" | "mixed" | "none";
type DietKey = "omnivore" | "vegan" | "lowcarb";
type SleepKey = "good" | "okay" | "bad";

interface Recommendation {
  name: string;
  dose: string;
  timing: string;
  reason: string;
  productSlug?: string;
}

const ALL: Record<string, Recommendation> = {
  whey: {
    name: "Whey isolate",
    dose: "25–40 g",
    timing: "Post-workout or any meal short on protein",
    reason: "Fastest, most complete protein source. Hits leucine threshold for MPS.",
    productSlug: "whey-isolate",
  },
  creatine: {
    name: "Creatine monohydrate",
    dose: "5 g/day",
    timing: "Anytime, daily",
    reason: "Most-studied legal performance supplement. ~5–10% strength gains.",
    productSlug: "creatine",
  },
  preworkout: {
    name: "Pre-workout (caffeine + citrulline)",
    dose: "1 scoop, 30 min pre",
    timing: "Before training",
    reason: "Acute performance boost. Skip if training within 8 hrs of bed.",
    productSlug: "pre-workout",
  },
  caffeine: {
    name: "Caffeine",
    dose: "100–200 mg",
    timing: "Morning or pre-training",
    reason: "Improves alertness, output, and pain tolerance.",
  },
  ltheanine: {
    name: "L-theanine",
    dose: "100–200 mg",
    timing: "With caffeine",
    reason: "Smooths caffeine curve. Reduces jitter without dulling output.",
  },
  magnesium: {
    name: "Magnesium glycinate",
    dose: "200–400 mg",
    timing: "1 hr before bed",
    reason: "Most adults under-consume. Glycinate is calm, gut-friendly.",
  },
  ashwagandha: {
    name: "Ashwagandha (KSM-66)",
    dose: "300–600 mg",
    timing: "Daily, with food",
    reason: "Lowers cortisol, modest sleep + recovery improvement.",
  },
  beta_alanine: {
    name: "Beta-alanine",
    dose: "3–6 g/day",
    timing: "Daily, split doses",
    reason: "Buffers lactic acid in 1–4 min efforts. Endurance + high-rep work.",
  },
  citrulline: {
    name: "Citrulline malate",
    dose: "6–8 g",
    timing: "30 min pre-training",
    reason: "Boosts NO, reduces soreness, supports endurance.",
  },
  vitamin_d: {
    name: "Vitamin D3",
    dose: "2000–4000 IU",
    timing: "Daily, with fat-containing meal",
    reason: "Most adults are deficient. Affects strength, mood, immunity.",
  },
  omega3: {
    name: "Omega-3 (EPA/DHA)",
    dose: "2–3 g combined EPA+DHA",
    timing: "Daily, with food",
    reason: "Reduces inflammation, supports recovery + brain function.",
  },
  b12: {
    name: "Vitamin B12",
    dose: "500 mcg–1 mg",
    timing: "Daily",
    reason: "Vegans + low-meat eaters at risk of deficiency.",
  },
};

function buildStack(input: {
  goals: Set<GoalKey>;
  training: TrainingKey;
  diet: DietKey;
  sleep: SleepKey;
}): Recommendation[] {
  const picks = new Set<string>();

  if (input.goals.has("muscle")) {
    picks.add("whey");
    picks.add("creatine");
  }
  if (input.goals.has("energy") || input.goals.has("focus")) {
    picks.add("caffeine");
    picks.add("ltheanine");
  }
  if (input.goals.has("sleep") || input.sleep !== "good") {
    picks.add("magnesium");
    if (input.sleep === "bad") picks.add("ashwagandha");
  }
  if (input.goals.has("recovery")) {
    picks.add("omega3");
    picks.add("ashwagandha");
  }
  if (input.goals.has("endurance")) {
    picks.add("beta_alanine");
    picks.add("citrulline");
  }
  if (input.training === "lifting") {
    picks.add("creatine");
    picks.add("whey");
  }
  if (input.training === "endurance") {
    picks.add("citrulline");
  }
  if (input.training !== "none") {
    picks.add("creatine");
  }
  if (input.diet === "vegan") {
    picks.add("b12");
    picks.add("omega3");
    picks.add("vitamin_d");
  }
  picks.add("vitamin_d");

  return Array.from(picks).map((k) => ALL[k]);
}

const GOAL_OPTIONS: { key: GoalKey; label: string }[] = [
  { key: "muscle", label: "Build muscle" },
  { key: "energy", label: "More energy" },
  { key: "focus", label: "Mental focus" },
  { key: "sleep", label: "Better sleep" },
  { key: "recovery", label: "Faster recovery" },
  { key: "endurance", label: "Endurance" },
];

export default function StackBuilder() {
  const [goals, setGoals] = useState<Set<GoalKey>>(new Set(["muscle"]));
  const [training, setTraining] = useState<TrainingKey>("lifting");
  const [diet, setDiet] = useState<DietKey>("omnivore");
  const [sleep, setSleep] = useState<SleepKey>("okay");
  const [submitted, setSubmitted] = useState(false);

  const stack = useMemo(
    () => buildStack({ goals, training, diet, sleep }),
    [goals, training, diet, sleep]
  );

  function toggleGoal(g: GoalKey) {
    setGoals((prev) => {
      const next = new Set(prev);
      if (next.has(g)) next.delete(g);
      else next.add(g);
      return next;
    });
  }

  return (
    <div className="border border-black/10 bg-white rounded-lg p-6 md:p-8 my-10">
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="font-display uppercase text-xl md:text-2xl font-bold">
          Your inputs
        </h2>
        <span className="text-xs uppercase tracking-widest text-neutral-500">
          Live
        </span>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-xs uppercase tracking-widest text-neutral-600 mb-3">
            Goals (pick 1+)
          </label>
          <div className="flex flex-wrap gap-2">
            {GOAL_OPTIONS.map((g) => {
              const active = goals.has(g.key);
              return (
                <button
                  key={g.key}
                  type="button"
                  onClick={() => toggleGoal(g.key)}
                  className={`px-4 py-2 rounded-full border text-sm uppercase tracking-widest transition ${
                    active
                      ? "bg-black text-white border-black"
                      : "bg-stone-50 border-black/15 text-neutral-700 hover:border-black/40"
                  }`}
                  aria-pressed={active}
                >
                  {g.label}
                </button>
              );
            })}
          </div>
        </div>

        <FieldGroup
          label="Training"
          value={training}
          onChange={(v) => setTraining(v as TrainingKey)}
          options={[
            ["lifting", "Lifting"],
            ["endurance", "Endurance"],
            ["mixed", "Mixed"],
            ["none", "None"],
          ]}
        />

        <FieldGroup
          label="Diet"
          value={diet}
          onChange={(v) => setDiet(v as DietKey)}
          options={[
            ["omnivore", "Omnivore"],
            ["vegan", "Vegan"],
            ["lowcarb", "Low carb"],
          ]}
        />

        <FieldGroup
          label="Sleep quality"
          value={sleep}
          onChange={(v) => setSleep(v as SleepKey)}
          options={[
            ["good", "Good"],
            ["okay", "Okay"],
            ["bad", "Bad"],
          ]}
        />

        <button
          type="button"
          onClick={() => setSubmitted(true)}
          className="w-full py-4 bg-black text-white uppercase tracking-widest text-sm font-bold rounded-md hover:bg-neutral-800 transition"
        >
          Build my stack
        </button>
      </div>

      {submitted && goals.size > 0 && (
        <div className="mt-10">
          <h3 className="font-display uppercase text-2xl md:text-3xl font-bold mb-2">
            Your stack
          </h3>
          <p className="text-sm text-neutral-600 mb-6">
            {stack.length} recommended supplements based on your inputs.
          </p>
          <ul className="space-y-3">
            {stack.map((s) => (
              <li
                key={s.name}
                className="border border-black/10 bg-stone-50 rounded-md p-4 md:p-5"
              >
                <div className="flex items-baseline justify-between gap-3 flex-wrap mb-1">
                  <h4 className="font-display uppercase text-lg md:text-xl font-bold">
                    {s.name}
                  </h4>
                  <span className="text-sm font-bold">{s.dose}</span>
                </div>
                <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2">
                  {s.timing}
                </p>
                <p className="text-sm text-neutral-700">{s.reason}</p>
                {s.productSlug && (
                  <Link
                    href={`/products/${s.productSlug}`}
                    className="inline-block mt-3 text-xs uppercase tracking-widest font-bold underline"
                  >
                    Shop in Ethera store →
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function FieldGroup({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: [string, string][];
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-neutral-600 mb-3">
        {label}
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 border border-black/15 rounded-md overflow-hidden">
        {options.map(([key, lbl]) => (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className={`px-3 py-3 text-xs sm:text-sm uppercase tracking-widest transition ${
              value === key
                ? "bg-black text-white"
                : "bg-stone-50 text-neutral-700 hover:bg-stone-100"
            }`}
            aria-pressed={value === key}
          >
            {lbl}
          </button>
        ))}
      </div>
    </div>
  );
}
