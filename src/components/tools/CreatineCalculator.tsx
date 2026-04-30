"use client";

import { useMemo, useState } from "react";

type Unit = "kg" | "lb";

const LB_PER_KG = 2.20462;

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function round(n: number, decimals = 1) {
  const f = Math.pow(10, decimals);
  return Math.round(n * f) / f;
}

export default function CreatineCalculator() {
  const [weight, setWeight] = useState<string>("75");
  const [unit, setUnit] = useState<Unit>("kg");
  const [loading, setLoading] = useState<boolean>(false);

  const result = useMemo(() => {
    const raw = parseFloat(weight);
    if (!isFinite(raw) || raw <= 0) return null;

    const kg = unit === "kg" ? raw : raw / LB_PER_KG;
    const clampedKg = clamp(kg, 30, 200);

    // Maintenance: 0.1 g/kg/day per JISSN 2021 (Antonio et al.). Floor 3g.
    // Ceiling 10g — ISSN 2017 notes larger athletes may need 5–10 g/day; past
    // muscle saturation (~150–160 mmol/kg dry weight) excess is excreted.
    const maintenanceRaw = 0.1 * clampedKg;
    const maintenance = round(clamp(maintenanceRaw, 3, 10), 1);

    // Loading: 0.3 g/kg/day for 5–7 days. Cap 25g/day.
    const loadingDose = round(clamp(0.3 * clampedKg, 15, 25), 0);

    // Days to saturation (no loading): ~28 days at maintenance.
    const daysToSaturationNoLoad = 28;
    const daysToSaturationLoad = 7;

    return {
      maintenance,
      loadingDose,
      daysToSaturationNoLoad,
      daysToSaturationLoad,
    };
  }, [weight, unit]);

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
            Loading phase
          </label>
          <button
            type="button"
            role="switch"
            aria-checked={loading}
            onClick={() => setLoading((v) => !v)}
            className={`w-full flex items-center justify-between border border-black/15 px-4 py-3 rounded-md transition ${
              loading ? "bg-black text-white" : "bg-stone-50 text-neutral-900"
            }`}
          >
            <span className="text-sm uppercase tracking-widest">
              {loading ? "Enabled" : "Disabled"}
            </span>
            <span
              className={`relative w-10 h-5 rounded-full transition ${
                loading ? "bg-white/30" : "bg-neutral-300"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition ${
                  loading ? "translate-x-5 bg-white" : "translate-x-0 bg-white"
                }`}
              />
            </span>
          </button>
          <p className="text-xs text-neutral-500 mt-2">
            Optional. Saturates muscle creatine in ~7 days vs ~28.
          </p>
        </div>
      </div>

      {result ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {loading ? (
            <>
              <ResultCard
                label="Loading dose"
                value={`${result.loadingDose} g`}
                sub="Per day for 5–7 days"
                emphasis
              />
              <ResultCard
                label="Then maintenance"
                value={`${result.maintenance} g`}
                sub="Per day, ongoing"
              />
              <ResultCard
                label="Saturated in"
                value={`~${result.daysToSaturationLoad} days`}
                sub="Muscle creatine peak"
              />
            </>
          ) : (
            <>
              <ResultCard
                label="Daily dose"
                value={`${result.maintenance} g`}
                sub="Creatine monohydrate"
                emphasis
              />
              <ResultCard
                label="Saturated in"
                value={`~${result.daysToSaturationNoLoad} days`}
                sub="Without loading phase"
              />
              <ResultCard
                label="Timing"
                value="Anytime"
                sub="Consistency > timing"
              />
            </>
          )}
        </div>
      ) : (
        <p className="text-neutral-500">Enter bodyweight to see your dose.</p>
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
