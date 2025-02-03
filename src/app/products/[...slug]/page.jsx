// /src/app/products/[...slug]/page.jsx
import Product from "@/components/productPage/Product"
import { products } from "@/data"
import ProductPreloader from "@/components/ui/ProductPreloader"

export default async function page({ params }) {
  // Await params before using its properties
  const { slug } = await params
  // Get the product data based on slug
  const product = products.find((p) => p.slug === slug[0])

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <>
      <ProductPreloader />
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
