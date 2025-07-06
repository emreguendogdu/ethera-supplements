"use client"

import { motion } from "motion/react"
import { easeOut } from "motion"
import Image from "next/image"
import Link from "next/link"
import Button from "./Button"

interface CheckoutProps {
  showCheckout: boolean
  onClose: () => void
}

export default function Checkout({ showCheckout, onClose }: CheckoutProps) {
  if (!showCheckout) return null

  return (
    <motion.section
      className="absolute inset-0 h-full w-full flex flex-col gap-8 justify-between bg-black z-70  px-8 md:px-16 py-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5, ease: easeOut }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-title"
      aria-describedby="checkout-description"
    >
      <header className="w-full flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="text-2xl h2 h-fit text-white hover:text-neutral-300 transition-colors"
          aria-label="Close checkout and return to cart"
        >
          ×
        </button>
      </header>

      <motion.main
        className="w-full flex flex-col gap-8 md:gap-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeOut, delay: 0.2 }}
        role="main"
        aria-label="Checkout information"
      >
        <motion.h2
          id="checkout-title"
          className="h2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOut, delay: 0.3 }}
        >
          This is Where the Journey Ends (For Now!)
        </motion.h2>

        <motion.p
          id="checkout-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOut, delay: 0.4 }}
        >
          You&apos;ve reached the final destination of this demo experience!
          This e-commerce platform is a showcase of modern web development
          techniques and interactive design. Enjoyed exploring the features?
          I&apos;d love to discuss how we can bring similar innovations to your
          next project. Reach out through the links below or drop me a line at:{" "}
          <Link
            href="mailto:hello@emregnd.com"
            aria-label="Send email to emregnd"
            className="underline"
          >
            hello@emregnd.com
          </Link>
        </motion.p>

        <motion.nav
          className="flex gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOut, delay: 0.5 }}
          role="navigation"
          aria-label="Contact options"
        >
          <Button
            text="LinkedIn"
            type="link"
            href="https://www.linkedin.com/in/emregnd/"
          />
          <Button text="Portfolio" type="link" href="https://emregnd.com" />
        </motion.nav>
      </motion.main>

      <motion.figure
        className="relative h-[300px] w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: easeOut, delay: 0.6 }}
        role="img"
        aria-label="Portfolio project showcase image"
      >
        <Image
          src="/images/info.webp"
          alt="Premium supplement bottles showcasing front-end development work"
          className="rounded-lg object-cover object-center brightness-110"
          fill
        />
      </motion.figure>
    </motion.section>
  )
}
