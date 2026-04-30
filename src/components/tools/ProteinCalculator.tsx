"use client";

import { useMemo, useState } from "react";

type Unit = "kg" | "lb";
type Goal = "maintain" | "build" | "cut";
type Activity = "sedentary" | "active" | "athlete";

const LB_PER_KG = 2.20462;
const SCOOP_G = 25;

const GOAL_RANGE: Record<Goal, [number, number]> = {
  maintain: [1.2, 1.6],
  build: [1.6, 2.2],
  cut: [1.8, 2.4],
};

const ACTIVITY_MULT: Record<Activity, number> = {
  sedentary: 0.85,
  active: 1.0,
  athlete: 1.1,
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export default function ProteinCalculator() {
  const [weight, setWeight] = useState("75");
  const [unit, setUnit] = useState<Unit>("kg");
  const [goal, setGoal] = useState<Goal>("build");
  const [activity, setActivity] = useState<Activity>("active");

  const result = useMemo(() => {
    const raw = parseFloat(weight);
    if (!isFinite(raw) || raw <= 0) return null;

    const kg = clamp(unit === "kg" ? raw : raw / LB_PER_KG, 30, 200);
    const [low, high] = GOAL_RANGE[goal];
    const mult = ACTIVITY_MULT[activity];
    const lowDaily = Math.round(kg * low * mult);
    const highDaily = Math.round(kg * high * mult);
    const target = Math.round((lowDaily + highDaily) / 2);
    const scoops = Math.round((target / SCOOP_G) * 10) / 10;
    const perMeal4 = Math.round(target / 4);

    return { lowDaily, highDaily, target, scoops, perMeal4 };
  }, [weight, unit, goal, activity]);

  return (
    <div className="border border-black/10 bg-white rounded-lg p-6 md:p-8 my-10">
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="font-display uppercase text-xl md:text-2xl font-bold">
          Calculator
        </h2>
        <span className="text-xs uppercase tracking-widest text-neutral-500">
          Live
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-xs uppercase tracking-widest text-neutral-600 mb-2">
            Bodyweight
          </label>
          <div className="flex">
            <input
              type="number"
              inputMode="decimal"
              min={30}
              max={500}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="flex-1 min-w-0 border border-black/15 bg-stone-50 px-3 py-3 rounded-l-md text-lg focus:outline-none focus:border-black/60"
              aria-label="Bodyweight"
            />
            <div className="flex border border-l-0 border-black/15 rounded-r-md overflow-hidden">
              {(["kg", "lb"] as Unit[]).map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => setUnit(u)}
                  className={`px-4 text-sm uppercase tracking-widest transition ${
                    unit === u
                      ? "bg-black text-white"
                      : "bg-stone-50 text-neutral-700 hover:bg-stone-100"
                  }`}
                  aria-pressed={unit === u}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-neutral-600 mb-2">
            Activity
          </label>
          <div className="flex border border-black/15 rounded-md overflow-hidden">
            {(
              [
                ["sedentary", "Sedentary"],
                ["active", "Active"],
                ["athlete", "Athlete"],
              ] as [Activity, string][]
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setActivity(key)}
                className={`flex-1 px-3 py-3 text-xs sm:text-sm uppercase tracking-widest transition ${
                  activity === key
                    ? "bg-black text-white"
                    : "bg-stone-50 text-neutral-700 hover:bg-stone-100"
                }`}
                aria-pressed={activity === key}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs uppercase tracking-widest text-neutral-600 mb-2">
            Goal
          </label>
          <div className="grid grid-cols-3 border border-black/15 rounded-md overflow-hidden">
            {(
              [
                ["maintain", "Maintain"],
                ["build", "Build muscle"],
                ["cut", "Cut / lean"],
              ] as [Goal, string][]
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setGoal(key)}
                className={`px-3 py-3 text-xs sm:text-sm uppercase tracking-widest transition ${
                  goal === key
                    ? "bg-black text-white"
                    : "bg-stone-50 text-neutral-700 hover:bg-stone-100"
                }`}
                aria-pressed={goal === key}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {result ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <ResultCard
            label="Daily target"
            value={`${result.target} g`}
            sub={`Range: ${result.lowDaily}–${result.highDaily} g`}
            emphasis
          />
          <ResultCard
            label="Per meal (×4)"
            value={`${result.perMeal4} g`}
            sub="Spread across the day"
          />
          <ResultCard
            label="Whey scoops"
            value={`~${result.scoops}`}
            sub={`If only from ${SCOOP_G}g scoops`}
          />
        </div>
      ) : (
        <p className="text-neutral-500">Enter bodyweight to see your target.</p>
      )}
    </div>
  );
}

function ResultCard({
  label,
  value,
  sub,
  emphasis = false,
}: {
  label: string;
  value: string;
  sub: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`p-5 rounded-md border ${
        emphasis ? "bg-black text-white border-black" : "bg-stone-50 border-black/10"
      }`}
    >
      <p
        className={`text-xs uppercase tracking-widest mb-2 ${
          emphasis ? "text-white/60" : "text-neutral-500"
        }`}
      >
        {label}
      </p>
      <p className="font-display text-3xl md:text-4xl font-bold leading-none mb-2">
        {value}
      </p>
      <p
        className={`text-xs ${
          emphasis ? "text-white/70" : "text-neutral-600"
        }`}
      >
        {sub}
      </p>
    </div>
  );
}
