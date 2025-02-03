import Image from "next/image"

export default function Info() {
  return (
    <section className="flex flex-col gap-8 p-section-m md:p-section md:gap-16 w-full bg-black">
      <h2 className="text-center">
        <span className="h1">Built for the Elite.</span>
        <br />
        <span>Engineered for the best results.</span>
      </h2>
      <ul className="relative w-full flex flex-col items-center gap-4 md:gap-16 [&>li]:flex [&>li]:items-center [&>li>div]:max-w-screen-sm [&>li>div]:text-justify [&>li>div>h2]:my-4">
        <li>
          <Image
            src="/images/badge.webp"
            width={400}
            height={400}
            alt="Badge"
          />
          <div>
            <p className="subheading custom-border">Minimal</p>
            <h2>Maximum Efficacy, Zero Fluff</h2>
            <p>
              Forget the noise. Ethera delivers only what works: Whey Isolate,
              Creatine, and Pre Workout. No fillers, no BS—just pure
              performance.
            </p>
          </div>
        </li>
        <li>
          <Image
            src="/images/dart-board.webp"
            width={400}
            height={400}
            alt="Dart board"
            className="order-2"
          />
          <div>
            <p className="subheading custom-border">Potent</p>
            <h2>Ultra-Pure, Zero Compromise</h2>
            <p>
              • No underdosed formulas – Full clinical potency in every scoop
              <br />• No filler junk – Every ingredient serves a purpose
              <br />• No BS marketing – Just real science, real results
            </p>
          </div>
        </li>
        <li>
          <Image
            src="/images/trophy.webp"
            width={400}
            height={400}
            alt="Trophy"
          />
          <div>
            <p className="subheading custom-border">Special</p>
            <h2>For the Committed, Not the Casual</h2>
            <p>
              Ethera isn’t for everyone. It’s for those who push past limits,
              who train with intent, and who demand the absolute best from their
              bodies and supplements.
            </p>
          </div>
        </li>
      </ul>
    </section>
  )
}
