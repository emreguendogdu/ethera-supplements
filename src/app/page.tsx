import Hero from "@/components/landing/Hero"
import Products from "@/components/landing/Products"
import BuyBundle from "@/components/ui/BuyBundle"

// import Info from "@/components/landing/Info"
import Reviews from "@/components/landing/Reviews"
// import PreLoader from "@/components/ui/PreLoader"

export default function Home() {
  return (
    <>
      {/* <PreLoader /> */}
      <Hero />
      <Products />
      <BuyBundle />
      {/* <Info /> */}
      <Reviews />
    </>
  )
}
