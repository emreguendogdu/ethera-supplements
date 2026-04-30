"use client";

import { useMemo, useState } from "react";

const HALF_LIFE_HOURS = 5;
const SLEEP_THRESHOLD_MG = 50;

function parseTimeToMinutes(t: string): number | null {
  const m = /^(\d{1,2}):(\d{2})$/.exec(t);
  if (!m) return null;
  const h = parseInt(m[1], 10);
  const min = parseInt(m[2], 10);
  if (h < 0 || h > 23 || min < 0 || min > 59) return null;
  return h * 60 + min;
}

function minutesToTime(min: number): string {
  const m = ((min % 1440) + 1440) % 1440;
  const h = Math.floor(m / 60);
  const mm = m % 60;
  return `${String(h).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

function caffeineRemaining(mgInitial: number, hours: number): number {
  return mgInitial * Math.pow(0.5, hours / HALF_LIFE_HOURS);
}

export default function CaffeineCalculator() {
  const [mg, setMg] = useState("200");
  const [drankAt, setDrankAt] = useState("14:00");
  const [bedtime, setBedtime] = useState("23:00");

  const result = useMemo(() => {
    const mgNum = parseFloat(mg);
    const drank = parseTimeToMinutes(drankAt);
    const bed = parseTimeToMinutes(bedtime);
    if (!isFinite(mgNum) || mgNum <= 0 || drank === null || bed === null) {
      return null;
    }

    let diff = bed - drank;
    if (diff < 0) diff += 1440;
    const hoursToBed = diff / 60;

    const mgAtBed = caffeineRemaining(mgNum, hoursToBed);

    const hoursToThreshold =
      mgNum > SLEEP_THRESHOLD_MG
        ? Math.log(SLEEP_THRESHOLD_MG / mgNum) /
          Math.log(0.5) *
          HALF_LIFE_HOURS
        : 0;
    const safeCutoffMin = bed - hoursToThreshold * 60;
    const safeCutoff = minutesToTime(Math.round(safeCutoffMin));

    return {
      hoursToBed: Math.round(hoursToBed * 10) / 10,
      mgAtBed: Math.round(mgAtBed),
      hoursToThreshold: Math.round(hoursToThreshold * 10) / 10,
      safeCutoff,
      isSafe: mgAtBed <= SLEEP_THRESHOLD_MG,
    };
  }, [mg, drankAt, bedtime]);

  return (
    <div className="border border-black/10 bg-white rounded-lg p-6 md:p-8 my-10">
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="font-display uppercase text-xl md:text-2xl font-bold">
          Cutoff Timer
        </h2>
        <span className="text-xs uppercase tracking-widest text-neutral-500">
          Live
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div>
          <label className="block text-xs uppercase tracking-widest text-neutral-600 mb-2">
            Caffeine (mg)
          </label>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            max={1000}
            value={mg}
            onChange={(e) => setMg(e.target.value)}
            className="w-full border border-black/15 bg-stone-50 px-3 py-3 rounded-md text-lg focus:outline-none focus:border-black/60"
            aria-label="Caffeine in mg"
          />
          <p className="text-xs text-neutral-500 mt-2">
            Coffee ~95mg, espresso ~64mg, energy drink ~80–200mg
          </p>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-neutral-600 mb-2">
            Drink time
          </label>
          <input
            type="time"
            value={drankAt}
            onChange={(e) => setDrankAt(e.target.value)}
            className="w-full border border-black/15 bg-stone-50 px-3 py-3 rounded-md text-lg focus:outline-none focus:border-black/60"
            aria-label="Time consumed"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-neutral-600 mb-2">
            Bedtime
          </label>
          <input
            type="time"
            value={bedtime}
            onChange={(e) => setBedtime(e.target.value)}
            className="w-full border border-black/15 bg-stone-50 px-3 py-3 rounded-md text-lg focus:outline-none focus:border-black/60"
            aria-label="Bedtime"
          />
        </div>
      </div>

      {result ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <ResultCard
            label="At bedtime"
            value={`${result.mgAtBed} mg`}
            sub={`After ${result.hoursToBed} hrs`}
            emphasis
            tone={result.isSafe ? "ok" : "warn"}
          />
          <ResultCard
            label="Safe cutoff"
            value={result.safeCutoff}
            sub={`Last drink ${result.hoursToThreshold} hrs before bed`}
          />
          <ResultCard
            label="Threshold"
            value={`${SLEEP_THRESHOLD_MG} mg`}
            sub="Below this = minimal sleep impact"
          />
        </div>
      ) : (
        <p className="text-neutral-500">
          Fill in caffeine, drink time, and bedtime.
        </p>
      )}
    </div>
  );
}

function ResultCard({
  label,
  value,
  sub,
  emphasis = false,
  tone,
}: {
  label: string;
  value: string;
  sub: string;
  emphasis?: boolean;
  tone?: "ok" | "warn";
}) {
  const bg = emphasis
    ? tone === "warn"
      ? "bg-black text-white border-black"
      : "bg-black text-white border-black"
    : "bg-stone-50 border-black/10";

  return (
    <div className={`p-5 rounded-md border ${bg}`}>
      <p
        className={`text-xs uppercase tracking-widest mb-2 flex items-center gap-2 ${
          emphasis ? "text-white/60" : "text-neutral-500"
        }`}
      >
        {label}
        {tone === "warn" && (
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white text-black">
            Over
          </span>
        )}
        {tone === "ok" && emphasis && (
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white text-black">
            OK
          </span>
        )}
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
