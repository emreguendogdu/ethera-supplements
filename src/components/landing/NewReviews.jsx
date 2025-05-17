import Image from "next/image"
import StarHolder from "@/components/icons/StarHolder"

const SVGImage = ({ src, alt, className }) => {
  return (
    <div className={`w-1/4 h-[300px] absolute ${className}`}>
      <Image src={src} alt={alt} className={`opacity-40`} fill />
    </div>
  )
}

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

export default function NewReviews() {
  return (
    <section
      id="info"
      className="flex flex-col items-center justify-center bg-black text-white p-section-m md:p-section w-full relative"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl mb-12">
        <div className="relative order-2 md:order-1">
          <Image
            src="/images/real_photo.png"
            alt="Supplement bottles"
            className="w-full h-auto rounded-lg object-cover"
            objectPosition="right"
            fill
          />
        </div>

        <div className="flex flex-col justify-center gap-8 order-1 md:order-2">
          <div className="flex flex-col gap-8">
            {qualities.map((item, i) => (
              <div key={i} className="flex gap-4 items-center py-8">
                <div className="relative w-24 h-24 flex-shrink-0 flex items-center justify-center">
                  {/* {item.icon} */}
                  <Image
                    src={`/images/icons/quality-${i + 1}.webp`}
                    alt="Icon"
                    className={`w-full h-full p-2 ${i === 2 && "-scale-x-100"}`}
                    fill
                  />
                </div>
                <div>
                  <p className="subheading text-neutral-200">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <div
                  key={star}
                  className="flex items-center justify-center p-1.5 relative"
                >
                  {/* <Star className="relative w-16 h-16 z-10" /> */}
                  <Image
                    src={`/images/icons/star.webp`}
                    alt="Star"
                    className="relative w-12 h-12 z-10"
                    width={48}
                    height={48}
                  />
                  <StarHolder className="w-12 h-12 absolute -bottom-2 text-neutral-400" />
                </div>
              ))}
            </div>
            <p className="subheading text-neutral-200">92 COMMENTS</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function UnnecessaryTexts() {
  return (
    <div className="w-full flex flex-col justify-between items-center p-section-m md:p-section gap-32">
      {/* SVGS and first title */}
      <div className="w-full relative">
        {/* Left statue */}
        <SVGImage
          src="/images/illustrations/greek-statue-1.svg"
          alt="Greek statue"
          className="left-0 top-full -translate-x-[27.5%]"
        />

        <div className="px-sectionX-m md:px-sectionX">
          <h2 className="h1 uppercase">Top notch ingredients.</h2>
          {/* <h2 className="h1 uppercase indent-12 md:indent-24">
              ingredients.
            </h2> */}
        </div>

        {/* Right statue */}
        {/* <SVGImage
            src="/images/illustrations/greek-statue-2.svg"
            alt="Greek statue with trident"
            className="right-0 -top-1/2 translate-x-[25%]"
          /> */}
      </div>

      {/* Second title */}
      <div className="relative flex flex-col w-full py-sectionY-m md:py-sectionY">
        <h2 className="h1 uppercase indent-16 md:indent-32">
          Thousands of satisfied
        </h2>
        <h2 className="h1 uppercase">customers.</h2>
      </div>
    </div>
  )
}
