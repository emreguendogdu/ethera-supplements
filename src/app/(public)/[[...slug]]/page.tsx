import LandingPage from "@/components/landing/LandingPage";
import { getPublicDiscountCode } from "@/lib/discount";
import { getAllProducts } from "@/lib/products";

export const revalidate = 604800;

export default async function Home() {
  const products = await getAllProducts();
  const discountCode = await getPublicDiscountCode();
  const skipPreloader = process.env.SKIP_PRELOADER === "true";

  return (
    <>
      <LandingPage
        initialProducts={products}
        discountCode={discountCode}
        skipPreloader={skipPreloader}
      />
    </>
  );
}
