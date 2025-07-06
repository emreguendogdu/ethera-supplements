import { Inter } from "next/font/google"
import "./index.css"

import Header from "@/components/ui/Header"

import GlobalProvider from "@/provider/GlobalProvider"
import { Metadata } from "next"
import { lazy } from "react"

const Cart = lazy(() => import("@/components/ui/Cart"))
const Footer = lazy(() => import("@/components/ui/Footer"))

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Ethera Supplements",
  description:
    "Ethera is the number one supplement brand for the best bodybuilders in the game.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-main text-smooth relative`}>
        <GlobalProvider>
          <Header />
          {children}
          <Footer />
          <Cart />
        </GlobalProvider>
      </body>
    </html>
  )
}
