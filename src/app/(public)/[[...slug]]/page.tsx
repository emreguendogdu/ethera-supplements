import LandingPage from "@/components/landing/LandingPage";
import { getPublicDiscountCode } from "@/lib/discount";
import { getAllProducts } from "@/lib/products";

export default async function Home() {
  const products = await getAllProducts();
  const discountCode = await getPublicDiscountCode();

  return (
    <>
      <LandingPage initialProducts={products} discountCode={discountCode} />
    </>
  );
}
