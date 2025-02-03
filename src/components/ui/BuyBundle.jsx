import { products } from "@/data"

export default function BuyBundle() {
  return (
    <section
      id="buy-bundle"
      className="flex flex-col gap-2 items-center justify-center text-center py-0"
    >
      <p className="subheading custom-border">Most Popular</p>
      <h2>
        <span className="h1">Buy Bundle</span> <br /> Save
        <span className="text-green-500"> 25% more</span>
      </h2>
      <p>
        <span className="line-through text-neutral-500">
          ${Object.values(products).reduce((sum, item) => sum + item.price, 0)}
        </span>
        <span className="h2">
          $
          {Math.floor(
            Object.values(products).reduce(
              (sum, item) => sum + item.salePrice,
              0
            ) * 0.75
          )}
        </span>
      </p>
      <button className="button">Add to Cart</button>
    </section>
  )
}
