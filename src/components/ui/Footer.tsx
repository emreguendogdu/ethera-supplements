import Link from "next/link"

import {
  StripeLogo,
  MastercardLogo,
  VisaLogo,
  GooglePayLogo,
  ApplePayLogo,
} from "@/components/ui/Icons"
import { products } from "@/data"

export default function Footer() {
  return (
    <footer className="relative flex flex-col gap-8 md:gap-16 p-section-m md:p-section">
      <div className="absolute inset-0 bg-black opacity-50 md:opacity-75 -z-10" />
      <div className="flex flex-wrap justify-center md:flex-nowrap gap-8 md:gap-0 md:justify-between">
        <div className="md:w-1/3">
          <p className="text-neutral-200">
            <Link href="/" className="uppercase font-bold">
              Ethera{" "}
            </Link>
            is a fictional supplement brand <br />
            designed and developed by{" "}
            <Link
              href="https://linkedin.com/in/emregnd/"
              className="font-bold"
              target="_blank"
            >
              emregnd
            </Link>
            .
            <br />
            &copy; 2025 — All rights reserved.
          </p>
        </div>
        <div>
          <p className="border-b border-neutral-700 w-fit leading-none pb-1 mb-2 uppercase">
            Products
          </p>
          <nav className="flex flex-col gap-2 justify-center md:justify-normal">
            {products.map((product, i) => (
              <Link key={`fp__${i}`} href={`/products/${product.slug}`}>
                {product.name}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <p className="border-b border-neutral-700 w-fit leading-none pb-1 mb-2 uppercase">
            Tools
          </p>
          <nav className="flex flex-col gap-2 justify-center md:justify-normal">
            <p className="select-none">Upcoming</p>
          </nav>
        </div>
      </div>
      <div className="flex gap-8 justify-center text-lg md:text-3xl items-center brightness-90">
        <VisaLogo />
        <MastercardLogo />
        <ApplePayLogo />
        <GooglePayLogo />
        <StripeLogo />
      </div>
    </footer>
  )
}
