import { getAllProducts } from "@/lib/products";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import localFont from "next/font/local";

const panchang = localFont({
  src: [
    {
      path: "../../../public/fonts/Panchang-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Panchang-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-display",
});

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const products = await getAllProducts();

  return (
    <div className={panchang.variable}>
      <Header products={products} />
      {children}
      <Footer products={products} />
    </div>
  );
}

export const revalidate = 604800;
