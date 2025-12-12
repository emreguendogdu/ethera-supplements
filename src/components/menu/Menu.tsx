"use client";

import { useEffect, useState, useCallback } from "react";
import Logo from "../ui/Logo";
import Link from "next/link";
import { Product } from "@/types/product";
import MenuCanvas from "@/components/3d/MenuCanvas";
import { useScrollContext } from "@/context/ScrollContext";

interface MenuProps {
  products: Product[];
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

// TODO: Remove the prop drilling here.
export default function Menu({ products, visible, setVisible }: MenuProps) {
  const [renderCanvas, setRenderCanvas] = useState(visible);
  const { setAllowScroll } = useScrollContext();

  useEffect(() => {
    if (visible) {
      setAllowScroll(false);
      setRenderCanvas(true);
    } else {
      const timer = setTimeout(() => {
        setRenderCanvas(false);
        setAllowScroll(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [visible, setAllowScroll]);

  const handleCloseMenu = useCallback(() => {
    setVisible(false);
    setRenderCanvas(false);
    setAllowScroll(true);
  }, [setVisible, setAllowScroll]);

  useEffect(() => {
    if (!visible) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Esc") {
        handleCloseMenu();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [visible, handleCloseMenu]);

  return (
    <div
      className={`fixed h-svh inset-0 z-999 bg-black w-full flex flex-col justify-between px-sectionX-m md:px-sectionX py-4 transition-opacity duration-500 ${
        visible
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Header */}
      <div className="relative flex justify-between items-center z-1000">
        <Logo className="text-neutral-500" />
        <button
          className="uppercase tracking-widest cursor-pointer text-neutral-500 select-none"
          onClick={handleCloseMenu}
        >
          Close
        </button>
      </div>

      {/* Main */}
      <div className="w-full flex items-end sm:items-center justify-end flex-1 h-full py-8">
        {/* 3D */}
        {renderCanvas && <MenuCanvas inView={visible} />}
        {/* Menu */}
        <ul className="relative w-fit z-1000 select-none flex flex-col justify-end sm:justify-start">
          <Link
            href="/"
            className="h1 text-white text-right sm:text-left sm:text-neutral-500 hover:text-neutral-200 transition-all uppercase select-none"
            onClick={handleCloseMenu}
          >
            <li className="whitespace-nowrap">Home</li>
          </Link>

          {products.map((product, i) => (
            <Link
              key={`hp__${i}`}
              href={`/products/${product.slug}`}
              className="h1 text-white text-right sm:text-left sm:text-neutral-500 hover:text-neutral-200 transition-all uppercase select-none"
              onClick={handleCloseMenu}
            >
              <li className="whitespace-nowrap">{product.name}</li>
            </Link>
          ))}

          <Link
            href="/admin"
            className="h1 text-white text-right sm:text-left sm:text-neutral-500 hover:text-neutral-200 transition-all uppercase select-none whitespace-nowrap"
            onClick={handleCloseMenu}
          >
            Admin
          </Link>
        </ul>
      </div>
      {/* Footer */}
      <div className="relative flex justify-between items-center z-1000">
        <Link href="https://emregnd.com" target="_blank">
          <p className="text-neutral-500 uppercase tracking-widest">emregnd</p>
        </Link>
        <p className="text-neutral-500 text-right">
          &copy; 2025 - Ethera.{" "}
          <span className="inline sm:hidden">
            <br />
          </span>
          All rights reserved.
        </p>
      </div>
    </div>
  );
}
