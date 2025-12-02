import { getAllProducts } from "@/lib/products";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { ScrollProvider } from "@/context/ScrollContext";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const products = await getAllProducts();

  return (
    <ScrollProvider>
      <Header products={products} />
      {children}
      <Footer products={products} />
    </ScrollProvider>
  );
}

export const revalidate = 604800;
