"use client";

import { useCartContext } from "@/context/CartContext";
import { Product } from "@/types/product";
import Image from "next/image";
import brandmark from "@/../public/images/brandmark.png";
import { useState } from "react";
import Menu from "../menu/Menu";
import { FlipTextOnHover } from "./FlipTextOnHover";

interface HeaderProps {
  products: Product[];
}

export default function Header({ products }: HeaderProps) {
  const cartContext = useCartContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!cartContext) {
    throw new Error("Header must be used within a CartProvider");
  }

  const { cart, setDisplayCart } = cartContext;

  return (
    <>
      <header className="z-50 backdrop-blur-xs fixed top-0 left-0 right-0 flex items-center justify-between py-5 text-white/70 px-sectionX-m md:px-sectionX h-[72px]">
        {/* <Logo /> */}

        <div className="relative h-full w-auto aspect-square">
          <Image
            src={brandmark}
            alt="Ethera Brandmark"
            className="w-full h-full object-cover"
          />
        </div>

        <p className="absolute left-1/2 top-1/2 -translate-1/2">
          FREE SHIPPING ON WARRIOR BUNDLES — LIMITED TIME ONLY.
        </p>
        <div className="flex items-center gap-8">
          <FlipTextOnHover
            text={`CART (${cart?.cartItems?.length || 0})`}
            onClick={() => setIsMenuOpen(true)}
            className="flex gap-2 items-center group cursor-pointer focus:outline-none subheading text-current group-hover:opacity-50 transition-all border border-current px-5 rounded-full"
          />

          <FlipTextOnHover
            text="Menu"
            onClick={() => setIsMenuOpen(true)}
            className="uppercase border border-current px-5 rounded-full focus:outline-none cursor-pointer"
          />
        </div>
      </header>

      <Menu
        products={products}
        visible={isMenuOpen}
        setVisible={setIsMenuOpen}
      />
    </>
  );
}
