import Link from "next/link"
import { LogosStripe } from "@/components/icons/Stripe"
import { LogosMastercard } from "@/components/icons/Mastercard"
import { LogosVisa } from "@/components/icons/Visa"
import { LogosGooglePay } from "@/components/icons/GooglePay"
import { LogosApplePay } from "@/components/icons/ApplePay"
import { products } from "@/data"

export default function Footer() {
  return (
    <footer className="flex flex-col gap-8 md:gap-16 px-sectionX-m md:px-sectionX">
      <div className="flex justify-between">
        <div className="relative w-1/3">
          <p className="text-2xl font-light">
            <Link href="/" className="font-display font-bold uppercase">
              Ethera{" "}
            </Link>
            is a fictional brand <br />
            made up by{" "}
            <Link
              href="https://osmangund.tech"
              className="font-bold"
              target="_blank"
            >
              osmangund.
            </Link>
            <br />
            &copy; 2025 — All rights reserved.
          </p>
        </div>
        <div>
          <h3>Products</h3>
          <nav className="flex flex-col gap-2">
            {products.map((product, i) => (
              <Link key={`fp__${i}`} href={product.href}>
                {product.name}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <h3>Tools</h3>
          <nav className="flex flex-col gap-2">
            <Link href="/tools/bmi-calculator/">BMI Calculator</Link>
            <Link href="/tools/body-fat-calculator/">Body Fat Calculator</Link>
            <Link href="/tools/daily-calorie-calculator/">
              Daily Calorie Calculator
            </Link>
          </nav>
        </div>
      </div>
      <div className="flex gap-8 justify-center text-3xl items-center brightness-90">
        <LogosVisa />
        <LogosMastercard />
        <LogosApplePay />
        <LogosGooglePay />
        <LogosStripe />
      </div>
      <div>
        <Link
          href="/"
          className="font-display font-bold text-center uppercase [&>span]:block"
        >
          <span className="text-[9rem] tracking-[20%] leading-none bg-gradient-to-b from-[hsl(0,0%,45%)] to-[hsl(0,0%,25%)] text-transparent bg-clip-text">
            Ethera
          </span>
          <span className="text-4xl tracking-[10%] bg-gradient-to-b from-[hsl(0,0%,35%)] to-[hsl(0,0%,15%)] text-transparent bg-clip-text">
            Supplements<sup>®</sup>
          </span>
        </Link>
      </div>
    </footer>
  )
}
