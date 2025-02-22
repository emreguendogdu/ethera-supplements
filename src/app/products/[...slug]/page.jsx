// /src/app/products/[...slug]/page.jsx
import Product from "@/components/productPage/Product"
import { products } from "@/data"
import ProductIntro from "@/components/ui/ProductIntro"
import Button from "@/components/ui/Button"

export default async function page({ params }) {
  // Await params before using its properties
  const { slug } = await params
  // Get the product data based on slug
  const product = products.find((p) => p.slug === slug[0])

  if (!product) {
    return (
      <div className="h-screen flex flex-col gap-8 justify-center items-center">
        Product not found.
        <div>
          <Button href="/" text="Back to Home" />
        </div>
      </div>
    )
  }

  return (
    <>
      <ProductIntro slug={slug} />
      <Product product={product} />
    </>
  )
}

// Optional: Generate static params for better performance
export async function generateStaticParams() {
  return products.map((product) => ({
    slug: [product.slug],
  }))
}
