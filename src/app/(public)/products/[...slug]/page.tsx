import Product from "@/components/productPage/Product";
import ProductIntro from "@/components/3d/ProductIntro";
import Button from "@/components/ui/Button";
import { getProductBySlug, getAllProducts } from "@/lib/products";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function page({ params }: PageProps) {
  const { slug } = await params;
  const [product, allProducts] = await Promise.all([
    getProductBySlug(slug[0]),
    getAllProducts(),
  ]);

  if (!product) {
    return (
      <div className="h-screen flex flex-col gap-8 justify-center items-center">
        Product not found.
        <div>
          <Button href="/" text="Back to Home" />
        </div>
      </div>
    );
  }

  return (
    <>
      <ProductIntro slug={slug[0]} glbUrl={product.glbUrl} />
      <Product product={product} allProducts={allProducts} />
    </>
  );
}

export const revalidate = 604800;

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({
    slug: [product.slug],
  }));
}
