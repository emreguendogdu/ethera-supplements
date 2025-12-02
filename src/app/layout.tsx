import { Inter } from "next/font/google";
import "./index.css";

import Header from "@/components/ui/Header";

import GlobalProvider from "@/provider/GlobalProvider";
import { Metadata } from "next";
import { lazy } from "react";
import { getAllProducts } from "@/lib/products";
import Footer from "@/components/ui/Footer";

const Cart = lazy(() => import("@/components/ui/Cart"));

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ethera Supplements",
  description:
    "Ethera is the number one supplement brand for the best bodybuilders in the game.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const products = await getAllProducts();

  return (
    <html lang="en">
      <body className={`${inter.variable} font-main text-smooth relative`}>
        <GlobalProvider>
          <Header products={products} />
          {children}
          <Footer products={products} />
          <Cart />
        </GlobalProvider>
      </body>
    </html>
  );
}
