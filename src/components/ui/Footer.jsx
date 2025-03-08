import Link from "next/link"

import {
  StripeLogo,
  MastercardLogo,
  VisaLogo,
  GooglePayLogo,
  ApplePayLogo,
} from "@/components/ui/icons"
import { products } from "@/data"

export default function Footer() {
  return (
    <footer className="relative flex flex-col gap-8 md:gap-16 px-sectionX-m md:px-sectionX py-sectionY-m pb-4">
      <div className="absolute inset-0 bg-black opacity-50 md:opacity-70 -z-10" />
      <div className="flex flex-wrap justify-center md:flex-nowrap gap-8 md:gap-0 md:justify-between">
        <div className="relative md:w-1/3">
          <p className="text-2xl font-light">
            <Link href="/" className="font-bold uppercase">
              Ethera{" "}
            </Link>
            is a fictional brand <br />
            brought to life by{" "}
            <Link
              href="https://linkedin.com/in/emregnd/"
              className="font-bold"
              target="_blank"
            >
              emregnd.
            </Link>
            <br />
            &copy; 2025 — All rights reserved.
          </p>
        </div>
        <div>
          <h3 className="border-b border-neutral-700 w-fit leading-none pb-1 mb-2">
            Products
          </h3>
          <nav className="flex flex-col gap-2 justify-center md:justify-normal">
            {products.map((product, i) => (
              <Link key={`fp__${i}`} href={`/products/${product.slug}`}>
                {product.name}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <h3 className="border-b border-neutral-700 w-fit leading-none pb-1 mb-2">
            Tools
          </h3>
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
      <div>
        <Link
          className="font-bold text-center uppercase [&>span]:block"
          href="/"
        >
          <span className="text-3xl md:text-[9rem] tracking-tight leading-[0.8] text-transparent bg-clip-text bg-gradient-to-b from-[hsl(0,0%,85%)] to-[hsl(0,0%,50%)]">
            Ethera
          </span>
          <span className="text-2xl md:text-4xl tracking-[10%] text-transparent bg-clip-text bg-gradient-to-b from-[hsl(0,0%,50%)] via-[hsl(0,0%,35%)] to-[hsl(0,0%,7.5%)] ">
            Supplements®
          </span>
        </Link>
      </div>
    </footer>
  )
}
