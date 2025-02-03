// import type { Metadata } from "next"
import { Inter, Jost } from "next/font/google"
import "./index.css"

import Header from "@/components/ui/Header"
import Footer from "@/components/ui/Footer"
import Cart from "@/components/ui/Cart"

import GlobalProvider from "@/provider/GlobalProvider"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
})

// export const metadata: Metadata = {
//   title: "Ethera Supplements",
//   description:
//     "Ethera is the number one supplement brand for futurist bodybuilders.",
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jost.variable} text-smooth relative bg-background text-text font-inter m-0`}
      >
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
