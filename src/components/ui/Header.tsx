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
      <header className="z-50 backdrop-blur-lg sm:backdrop-blur-xs fixed top-0 left-0 right-0 flex flex-col gap-5 items-center justify-between py-5 text-white/70 px-sectionX-m md:px-sectionX h-[104px] sm:h-[72px]">
        <div className="w-full flex items-center justify-between gap-5 h-full">
          <div className="relative h-full w-auto aspect-square">
            <Image
              src={brandmark}
              alt="Ethera Brandmark"
              className="w-full h-full max-w-[32px] max-h-[32px] sm:max-h-[64px] sm:max-w-[64px] object-cover"
            />
          </div>

          <div className="flex items-center gap-5">
            <FlipTextOnHover
              text={`Cart (${cart?.cartItems?.length || 0})`}
              onClick={() => setDisplayCart(true)}
            />

            <FlipTextOnHover text="Menu" onClick={() => setIsMenuOpen(true)} />
          </div>
        </div>

        <p className="static sm:absolute sm:left-1/2 sm:top-1/2 sm:-translate-1/2 uppercase">
          Use discount code <span className="font-bold">Ethera</span> for 20%
          off!
        </p>
      </header>

      <Menu
        products={products}
        visible={isMenuOpen}
        setVisible={setIsMenuOpen}
      />
    </>
  );
}
