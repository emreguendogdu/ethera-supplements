import Image from "next/image"
import { Fragment } from "react"

const qualities = [
  {
    text: "Precision-formulated with no fluff—every gram in Ethera serves a purpose. No artificial dyes, fillers, or empty promises. Just clinically-backed doses and clean performance.",
  },
  {
    text: "Tested. Trusted. Transparent. All products are 3rd-party lab verified and manufactured in GMP-certified facilities. Because what you put in your body should never be a question mark.",
  },
  {
    text: "Built for the few who train in silence and rise in the dark. Our formulas support high-performance output without the crash—no hype, just results.",
  },
]

export default function Info() {
  return (
    <section
      id="info"
      className="flex flex-col items-center justify-center bg-black text-white p-section-m md:p-section w-full relative"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl mb-12">
        <div className="relative h-[300px] w-full md:h-auto">
          <Image
            src="/images/info.webp"
            alt="Supplement bottles"
            className="w-full h-full md:h-auto rounded-lg object-cover md:object-contain object-center brightness-110"
            fill
          />
        </div>

        <div className="flex flex-col justify-center gap-12 order-1 md:order-2 py-16">
          <div className="flex flex-col items-center gap-4">
            <p className="uppercase">192 COMMENTS, 5 stars</p>

            <div className="flex gap-8">
              {[1, 2, 3, 4, 5].map((star, i) => (
                <Fragment key={`istrs-${i}`}>
                  <Image
                    src={`/images/icons/star.webp`}
                    alt="Star"
                    className="relative w-12 h-12 z-10"
                    width={48}
                    height={48}
                  />
                </Fragment>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-8">
            {qualities.map((item, i) => (
              <div key={i} className="flex gap-4 items-center py-8">
                <div className="relative w-24 h-24 flex-shrink-0 flex items-center justify-center">
                  <Image
                    src={`/images/icons/quality-${i + 1}.webp`}
                    alt="Icon"
                    className={`w-full h-full p-2 ${i === 0 && "-scale-x-100"}`}
                    fill
                  />
                </div>
                <div>
                  <p className="">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
