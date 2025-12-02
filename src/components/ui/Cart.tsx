"use client";

import { useState } from "react";
import { useCartContext } from "@/context/CartContext";
import { CartContextType } from "@/types/cart";
import { AnimatePresence, motion } from "motion/react";
import { easeIn, easeOut } from "motion";
import Checkout from "./Checkout";
import { useCartPrices } from "@/hooks/useCartPrices";
import { useCartScroll } from "@/hooks/useCartScroll";
import { useDiscountInput } from "@/hooks/useDiscountInput";
import { useCartQuantity } from "@/hooks/useCartQuantity";
import { CartOverlay } from "./CartOverlay";
import { CartHeader } from "./CartHeader";
import { CartItemsList } from "./CartItemsList";
import { CartEmpty } from "./CartEmpty";
import { CartFooter } from "./CartFooter";

const cartVariants = {
  hidden: { x: "100%" },
  visible: { x: 0, transition: { duration: 0.5, ease: easeOut } },
  exit: { width: 0, transition: { duration: 0.5, ease: easeIn } },
};

export default function Cart() {
  const { cart, displayCart, setDisplayCart } =
    useCartContext() as CartContextType;
  const [showCheckout, setShowCheckout] = useState(false);

  useCartScroll(displayCart);

  const { salePrice, totalDiscount } = useCartPrices({
    cartItems: cart?.cartItems,
  });

  const { updateQuantity } = useCartQuantity();

  const {
    displayDiscountInput,
    discountCode,
    showDiscountInput,
    hideDiscountInput,
    handleDiscountCodeChange,
  } = useDiscountInput();

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handleCloseCheckout = () => {
    setShowCheckout(false);
  };

  const handleCloseCart = () => {
    setDisplayCart(false);
  };

  const cartItemsCount = cart?.cartItems?.length || 0;

  return (
    <AnimatePresence>
      <aside
        className={`fixed inset-0 h-screen z-50 transition-all duration-300 overflow-hidden ${
          displayCart ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        aria-hidden={!displayCart}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        aria-describedby="cart-description"
      >
        <CartOverlay onClose={handleCloseCart} />
        <motion.section
          className="fixed right-0 w-screen sm:w-[45vw] h-full max-h-screen z-60 bg-black px-8 md:px-16 py-8 flex flex-col items-center justify-between gap-8 md:gap-16 border-l border-l-neutral-950 backdro-blur-2xl"
          initial="hidden"
          variants={cartVariants}
          animate={displayCart ? "visible" : "hidden"}
          exit="exit"
          role="region"
          aria-label="Shopping cart"
        >
          <CartHeader onClose={handleCloseCart} />
          <main
            className="flex flex-col relative w-full flex-1 overflow-y-auto"
            id="cart-content"
            style={{
              maxHeight: "calc(100vh - 300px)",
              overscrollBehavior: "contain",
            }}
            role="main"
            aria-label="Cart items"
          >
            <p id="cart-description" className="sr-only">
              Your shopping cart contains {cartItemsCount} items. Use the
              quantity controls to adjust amounts or remove items.
            </p>
            <CartItemsList
              cartItems={cart?.cartItems}
              onQuantityChange={updateQuantity}
            />
          </main>
          <CartEmpty hasItems={cartItemsCount > 0} />
          <CartFooter
            totalDiscount={totalDiscount}
            salePrice={salePrice}
            displayDiscountInput={displayDiscountInput}
            discountCode={discountCode}
            onShowDiscountInput={showDiscountInput}
            onHideDiscountInput={hideDiscountInput}
            onDiscountCodeChange={handleDiscountCodeChange}
            onCheckout={handleCheckout}
          />
          <Checkout showCheckout={showCheckout} onClose={handleCloseCheckout} />
        </motion.section>
      </aside>
    </AnimatePresence>
  );
}
