import Hero from "@/components/landing/Hero"
import Info from "@/components/landing/Info"
import Products from "@/components/landing/Products"
import Reviews from "@/components/landing/Reviews"
import BuyBundle from "@/components/ui/BuyBundle"
import { CanvasProvider } from "@/context/CanvasContext"
export default function Home() {
  return (
    <>
      {/* <CanvasProvider>
        <Hero />
      </CanvasProvider> */}
      <Products />
      <BuyBundle />
      <Info />
      <Reviews />
    </>
  )
}
