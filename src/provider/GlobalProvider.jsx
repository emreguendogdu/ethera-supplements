import { CartProvider } from "@/context/CartContext"
import { ScrollProvider } from "@/context/ScrollContext"

export default function GlobalProvider({ children }) {
  return (
    <ScrollProvider>
      <CartProvider>{children}</CartProvider>
    </ScrollProvider>
  )
}
