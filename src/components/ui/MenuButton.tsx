import React, { useState } from "react";
import Menu from "../menu/Menu";
import { Product } from "@/types/product";

interface MenuButtonProps {
  products: Product[];
}

export default function MenuButton({ products }: MenuButtonProps) {
  const [visible, setVisible] = useState(false);
  return (
    <>
    
    </>
  );
}
