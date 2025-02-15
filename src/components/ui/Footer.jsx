import Link from "next/link"
import { LogosStripe } from "@/components/icons/Stripe"
import { LogosMastercard } from "@/components/icons/Mastercard"
import { LogosVisa } from "@/components/icons/Visa"
import { LogosGooglePay } from "@/components/icons/GooglePay"
import { LogosApplePay } from "@/components/icons/ApplePay"
import { products, tools } from "@/data"

export default function Footer() {
  return (
    <footer className="relative flex flex-col gap-8 md:gap-16 px-sectionX-m md:px-sectionX py-sectionY-m pb-4">
      <div className="absolute inset-0 bg-black opacity-90 -z-10" />
      <div className="flex flex-wrap md:flex-nowrap gap-8 md:gap-0 md:justify-between">
        <div className="relative md:w-1/3">
          <p className="text-2xl font-light">
            <Link href="/" className="font-bold uppercase">
              Ethera{" "}
            </Link>
            is a fictional brand <br />
            brought to life by{" "}
            <Link
              href="https://linkedin.com/in/osmangund"
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
          <nav className="flex flex-col gap-2">
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
          <nav className="flex flex-col gap-2">
            {/* {tools.map((tool, i) => (
              <Link key={`fp__${i}`} href={`/tools/${tool.slug}`}>
                {tool.name}
              </Link>
            ))} */}
            <p className='select-none'>Upcoming</p>
          </nav>
        </div>
      </div>
      <div className="flex gap-8 md:justify-center text-lg md:text-3xl items-center brightness-90">
        <LogosVisa />
        <LogosMastercard />
        <LogosApplePay />
        <LogosGooglePay />
        <LogosStripe />
      </div>
      <div>
        <Link
          className="font-bold text-center uppercase [&>span]:block"
          href="/"
        >
          <span className="text-3xl md:text-[9rem] tracking-tight leading-[0.8] bg-gradient-to-b from-[hsl(0,0%,85%)] to-[hsl(0,0%,50%)] text-transparent bg-clip-text">
            Ethera
          </span>
          <span className="text-2xl md:text-4xl tracking-[10%] bg-gradient-to-b from-[hsl(0,0%,50%)] via-[hsl(0,0%,35%)] to-[hsl(0,0%,7.5%)] text-transparent bg-clip-text">
            Supplements®
          </span>
        </Link>
        {/* <Link
          className="text-6xl md:text-9xl w-full text-center bg-gradient-to-b from-[hsl(0,0%,50%)] via-[hsl(0,0%,35%)] to-[hsl(0,0%,7.5%)] text-transparent bg-clip-text"
          href="/"
        >
          Ethera Supplements®
        </Link> */}
      </div>
    </footer>
  )
}
