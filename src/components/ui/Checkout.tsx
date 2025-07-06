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
        <motion.h1
          id="checkout-title"
          className="h2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOut, delay: 0.3 }}
        >
          Thank you for your interest—but you can&apos;t go further :(
        </motion.h1>

        <motion.p
          id="checkout-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOut, delay: 0.4 }}
        >
          This website is just the concept work done by Moyra— a premium digital
          lab. If you like this project and would like to outsource something
          similar, don&apos;t hesitate to contact us. Click the below button or
          use our email:{" "}
          <Link href="mailto:hello@moyra.co" aria-label="Send email to Moyra">
            hello@moyra.co
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
            href="https://www.linkedin.com/company/moyra-co/"
          />
          <Button text="Email" type="link" href="mailto:hello@moyra.co" />
        </motion.nav>
      </motion.main>

      <motion.figure
        className="relative h-[300px] w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: easeOut, delay: 0.6 }}
        role="img"
        aria-label="Moyra company showcase image"
      >
        <Image
          src="/images/info.webp"
          alt="Premium supplement bottles showcasing Moyra's digital design work"
          className="rounded-lg object-cover object-center brightness-110"
          fill
        />
      </motion.figure>
    </motion.section>
  )
}
