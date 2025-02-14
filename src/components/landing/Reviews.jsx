import Image from "next/image"
import Stars from "@/components/ui/Stars"
import Button from "../ui/Button"

export default function Reviews() {
  return (
    <section className="relative flex flex-col items-center gap-4 md:gap-8 p-section-m md:p-section md:pt-0">
      <div className="absolute inset-0 bg-black opacity-90 -z-10" />
      <div className="flex flex-col justify-center items-center">
        <h2 className="h1">Don’t take our word for it.</h2>
        <Stars reviewsLength={324} />
      </div>
      <ul className="relative w-full flex justify-center flex-wrap md:flex-nowrap gap-2 rounded-xl">
        {[...Array(4)].map((_, index) => (
          <li
            className="relative w-[40%] md:w-1/4 h-[200px]"
            key={`rv__${index}`}
          >
            <Image
              src={`/images/influencer-${index + 1}.webp`}
              alt={`Influencer ${index + 1}`}
              className="object-cover rounded-xl"
              fill
            />
          </li>
        ))}
      </ul>
      <div className="flex justify-center items-center">
        <Button />
      </div>
    </section>
  )
}
