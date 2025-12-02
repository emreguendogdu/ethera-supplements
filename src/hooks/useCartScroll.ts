import { useEffect } from "react";
import { useScrollContext } from "@/context/ScrollContext";

export const useCartScroll = (displayCart: boolean) => {
  const { setAllowScroll } = useScrollContext();

  useEffect(() => {
    setAllowScroll(!displayCart);
  }, [displayCart, setAllowScroll]);
};


