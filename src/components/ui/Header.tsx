"use client";

import { useCartContext } from "@/context/CartContext";
import Link from "next/link";
import { CartIcon } from "@/components/ui/Icons";
import { Product } from "@/types/product";
import MenuButton from "./MenuButton";
import Logo from "./Logo";

interface HeaderProps {
  products: Product[];
}

export default function Header({ products }: HeaderProps) {
  const cartContext = useCartContext();

  if (!cartContext) {
    throw new Error("Header must be used within a CartProvider");
  }

  const { cart, setDisplayCart } = cartContext;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 flex items-center justify-between py-4 bg-black text-neutral-500 z-50 px-sectionX-m md:px-sectionX">
        <Logo />
        <div className="flex items-center gap-8">
          <button
            className="flex gap-2 items-center group cursor-pointer focus:outline-none"
            onClick={() => setDisplayCart(true)}
          >
            <span className="subheading text-neutral-500 group-hover:text-neutral-200 transition-all border border-neutral-500 px-4 py-1 rounded-full">
              CART ({cart?.cartItems?.length || 0})
            </span>

            <MenuButton products={products} />
          </button>
        </div>
      </header>
    </>
  );
}
