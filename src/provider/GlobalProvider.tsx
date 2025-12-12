import { CartProvider } from "@/context/CartContext";
import { ScrollProvider } from "@/context/ScrollContext";

interface GlobalProviderProps {
  children: React.ReactNode;
}

export default function GlobalProvider({ children }: GlobalProviderProps) {
  return (
    <ScrollProvider>
      <CartProvider>{children}</CartProvider>
    </ScrollProvider>
  );
}
