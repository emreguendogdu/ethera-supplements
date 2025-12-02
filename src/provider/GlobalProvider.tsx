import { CartProvider } from "@/context/CartContext"

interface GlobalProviderProps {
  children: React.ReactNode
}

export default function GlobalProvider({ children }: GlobalProviderProps) {
  return <CartProvider>{children}</CartProvider>
}
