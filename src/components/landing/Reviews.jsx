import Image from "next/image"
import Stars from "@/components/ui/Stars"

export default function Reviews() {
  return (
    <section className="flex flex-col gap-4 md:gap-8 items-center justify-center p-section-m md:p-section">
      <div className="flex flex-col justify-center items-center">
        <h2 className="h1">Don’t take our word for it.</h2>
        <Stars reviewsLength={324} />
      </div>
      <ul className="flex gap-2 rounded-xl">
        {[...Array(4)].map((_, index) => (
          <li>
            <Image
              key={`rv__${index}`}
              src={`/images/influencer-${index + 1}.webp`}
              alt={`Influencer ${index + 1}`}
              width={375}
              height={250}
              className="object-fill rounded-xl"
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
