import { AnimatePresence } from "motion/react";
import Logo from "../ui/Logo";
import Link from "next/link";
import { Product } from "@/types/product";

interface MenuProps {
  products: Product[];
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

// TODO: Remove the prop drilling here.
export default function Menu({ products, visible, setVisible }: MenuProps) {
  if (!visible) return null;
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-999999 bg-black w-full h-full flex flex-col justify-between px-sectionX-m md:px-sectionX py-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <Logo className="text-neutral-500" />
          <button
            className="uppercase tracking-widest cursor-pointer text-neutral-500 select-none"
            onClick={() => setVisible(false)}
          >
            Close
          </button>
        </div>

        {/* Main */}
        <div className="w-full flex items-center justify-between">
          {/* 3D */}
          <div className="flex-1 w-full"></div>
          {/* Menu */}
          <ul className="w-fit">
            <Link
              href="/"
              className="h1 text-neutral-500 hover:text-neutral-200 transition-all uppercase"
            >
              <li>Home</li>
            </Link>

            {products.map((product, i) => (
              <Link
                key={`hp__${i}`}
                href={`/products/${product.slug}`}
                className="h1 text-neutral-500 hover:text-neutral-200 transition-all uppercase"
              >
                <li>{product.name}</li>
              </Link>
            ))}
          </ul>
        </div>
        {/* Footer */}
        <div className="flex justify-between items-center">
          <p className="text-neutral-500 uppercase tracking-widest">Emregnd</p>
          <p className="text-neutral-500">
            &copy; 2025 Ethera. All rights reserved.
          </p>
        </div>
      </div>
    </AnimatePresence>
  );
}
