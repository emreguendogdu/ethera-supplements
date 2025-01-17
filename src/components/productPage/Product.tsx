"use client"

import Stars from "@/components/ui/Stars"
import { useContext, useState, ChangeEvent } from "react"
import CartContext, { CartContextType } from "@/context/CartContext"
import Image from "next/image"

interface ProductProps {
  product: {
    id: string
    slug: string
    name: string
    description: string
    image: string
    flavor: string[]
    size: string[]
    price: number
    salePrice: number
    reviewsLength: number
  }
}

export default function Product({ product }: ProductProps) {
  const { setDisplayCart, addItemToCart } = useContext(
    CartContext
  ) as CartContextType
  const [flavor, setFlavor] = useState(product.flavor[0])
  const [size, setSize] = useState(product.size[0])

  const handleFlavorChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFlavor(event.target.value)
  }

  const handleSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSize(event.target.value)
  }

  const handleAddToCart = () => {
    addItemToCart({
      slug: product.slug,
      id: `${product.slug}-${flavor.toLowerCase()}-${size}`,
      name: product.name,
      price: product.price,
      flavor: flavor,
      size: size,
      salePrice: product.salePrice,
    })

    setDisplayCart(true)
  }

  return (
    <>
      <section id="hero" className="min-h-screen flex gap-8 md:gap-16">
        <div className="flex-1">
          <Image
            src={product.image}
            alt={product.name}
            width={200}
            height={200}
            className="w-full h-auto"
          />
        </div>
        <div className="flex-1 flex flex-col gap-8">
          <div>
            <Stars reviewsLength={product.reviewsLength} />
            <h1>{product.name}</h1>
            <p className="subheading block">{product.description}</p>
          </div>
          <div className="flex flex-col gap-4">
            <div id="flavor">
              <h3>Flavor</h3>
              <select
                className="select"
                value={flavor}
                onChange={handleFlavorChange}
              >
                {product.flavor.map((flavor, i) => (
                  <option key={`flavor-${i}`} value={flavor}>
                    {flavor}
                  </option>
                ))}
              </select>
            </div>
            <div id="size">
              <h3>Size</h3>
              <select
                className="select"
                value={size}
                onChange={handleSizeChange}
              >
                {product.size.map((size, i) => (
                  <option key={`size-${i}`} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <p className="line-through text-gray-500">${product.price}</p>
            <p className="h2 leading-relaxed">${product.salePrice}</p>
          </div>
          <button className="button w-full" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <div id="benefits">
            <h3>Benefits</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laboriosam ipsam accusantium odio eius consequuntur quaerat sunt
              molestiae quod unde placeat facere eos, veniam obcaecati quas
              autem odit!
            </p>
            <br />
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea eos
              excepturi quo soluta cum. Quod error sint assumenda pariatur alias
              architecto doloremque necessitatibus veniam tempora!
            </p>
            <br />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint odit
              error ad atque voluptatem voluptas? Incidunt itaque id voluptatum,
              voluptatem quae non autem ullam ipsum ipsa beatae.
            </p>
          </div>
          <div id="nutrition-facts">
            <h3>Nutrition Facts</h3>
            <h4>Amino Acid </h4>
          </div>
          <div id="how-to-use">
            <h3>How to Use</h3>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
            aspernatur expedita voluptatum autem amet tenetur nam, ratione nobis
            ipsa. Sit odio consequuntur suscipit neque officiis.
          </div>
        </div>
      </section>
      <section id="reviews" className="flex flex-col gap-4 md:gap-8">
        <div className="heading text-center flex flex-col items-center gap-2">
          <h2>Reviews</h2>
          <Stars rating={4.5} reviewsLength={product.reviewsLength} />
        </div>
        <ul className="flex flex-col gap-8">
          {Array.from({ length: 5 }).map((_, index) => {
            return (
              <li
                key={index}
                className="px-8 py-4 pb-6 border border-custom-gray rounded-lg flex flex-col gap-2"
              >
                <div className="flex justify-between">
                  <div className="flex gap-4 items-center font-medium">
                    <Stars rating={5} reviewsLength={undefined} />
                    <p>John Doe</p>
                  </div>
                  <span className="block text-gray-500 text-sm">11/01/25</span>
                </div>
                <h3>Best product!</h3>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Possimus magni, id quam eveniet illo dolorum.
                </p>
              </li>
            )
          })}
        </ul>
        <div className="flex justify-center gap-2">
          {Array.from({ length: Math.ceil(product.reviewsLength / 5) }).map(
            (_, index) => {
              if (index > 4) return null
              return (
                <button
                  key={index}
                  className=""
                  onClick={() => console.log("Load more reviews")}
                >
                  {index + 1}
                </button>
              )
            }
          )}
        </div>
      </section>
    </>
  )
}
