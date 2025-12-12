import { getAllProducts } from "@/lib/products";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const products = await getAllProducts();

  return (
    <>
      <Header products={products} />
      {children}
      <Footer products={products} />
    </>
  );
}

export const revalidate = 604800;
