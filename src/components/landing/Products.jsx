export default function Products() {
  return (
    <section className="flex flex-col gap-8 md:gap-32 items-center justify-center text-center">
      <h2>
        <span className="h1">Built for the Elite.</span>
        <br />
        <span>Engineered for the best results.</span>
      </h2>
      <ul className="relative max-w-screen-sm flex flex-col gap-4 md:gap-16">
        <li>
          <h3>Maximum Efficacy, Zero Fluff</h3>
          <p>
            Forget the noise. Ethera delivers only what works: Whey Isolate,
            Creatine, and Pre Workout. No fillers, no BS—just pure performance.
          </p>
        </li>
        <li>
          <h3>Ultra-Pure, Zero Compromise</h3>
          <p>
            • No underdosed formulas – Full clinical potency in every scoop
            <br />• No filler junk – Every ingredient serves a purpose
            <br />• No BS marketing – Just real science, real results
          </p>
        </li>
        <li>
          <h3>For the Committed, Not the Casual</h3>
          <p>
            Ethera isn’t for everyone. It’s for those who push past limits, who
            train with intent, and who demand the absolute best from their
            bodies and supplements.
          </p>
        </li>
      </ul>
    </section>
  )
}
