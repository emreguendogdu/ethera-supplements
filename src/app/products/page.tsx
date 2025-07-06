import { products } from "@/data"
import Image from "next/image"
import Link from "next/link"

const allProducts = [...products]

export default function page() {
  return (
    <main className="relative h-screen flex justify-center items-center text-center bg-black px-sectionX-m py-sectionY-m md:py-sectionY md:px-sectionX">
      <section className="relative w-full flex justify-center gap-16">
        {Object.values(allProducts).map((product, index) => (
          <Link
            href={`/products/${product.slug}/`}
            key={`p__${index}`}
            className="group"
          >
            <article className="relative h-full flex flex-col justify-between gap-16">
              <figure className="relative flex justify-center h-[250px] w-full max-w-[250px] max-h-[300px]">
                <Image
                  src={`/images/${product.slug}-tub.webp`}
                  alt={product.name}
                  fill
                  className="object-scale-down group-hover:scale-110 transition-all"
                />
              </figure>
              <header>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <div className="flex gap-2 justify-center items-center mt-2">
                  <p className="line-through text-neutral-500">
                    ${product.stockData[0].price}
                  </p>
                  <p className="h3">${product.stockData[0].salePrice}</p>
                </div>
              </header>
            </article>
          </Link>
        ))}
      </section>
    </main>
  )
}
