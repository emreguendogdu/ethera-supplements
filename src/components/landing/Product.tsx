"use client";

import { useRef, useMemo, Dispatch, SetStateAction } from "react";
import useLandingProductAnimation from "@/hooks/useLandingProductAnimation";
import { Html } from "@react-three/drei";
import { Tub } from "@/components/3d/Tub";
import Button from "@/components/ui/Button";
import { Product } from "@/types/product";
import useLandingProductInitialYAnimation from "@/hooks/useLandingProductInitialYAnimation";
import useLandingProductHover from "@/hooks/useLandingProductHover";
import useDeviceSize from "@/hooks/useDeviceSize";
import { desktopCFG, mobileCFG } from "@/config/productAnimationConfig";
import { Group } from "three";

type PositionKey = "center" | "left" | "right";

const getPositionKey = (
  i: number,
  selected: boolean,
  selectedItem: number,
  totalProducts: number
): PositionKey => {
  if (selected) return "center";
  if (i === (selectedItem + 1) % totalProducts) return "right";
  return "left";
};

interface ItemProps {
  product: Product;
  i: number;
  selectedItem: number;
  setSelectedItem: Dispatch<SetStateAction<number>>;
  isSectionInView: boolean;
  totalProducts?: number;
}

const Item = ({
  product,
  i,
  selectedItem,
  setSelectedItem,
  isSectionInView,
  totalProducts = 3,
}: ItemProps) => {
  const ref = useRef<Group>(null!);
  const { isMobile } = useDeviceSize();
  const selected = selectedItem === i;

  const CFG = useMemo(() => (isMobile ? mobileCFG : desktopCFG), [isMobile]);

  const positionKey = getPositionKey(i, selected, selectedItem, totalProducts);

  const { initialPositionY, hasAnimatedIn } =
    useLandingProductInitialYAnimation({
      positionKey,
      isInView: isSectionInView,
    });

  const { hovered, handlePointerOver, handlePointerOut } =
    useLandingProductHover(selected, isMobile);

  // Convert CFG to the format expected by the hook
  const animationCFG = useMemo(() => {
    const converted: Record<
      string,
      { position: [number, number, number]; scale: number }
    > = {};
    Object.keys(CFG).forEach((key) => {
      converted[key] = {
        position: CFG[key as keyof typeof CFG].position as [
          number,
          number,
          number
        ],
        scale: CFG[key as keyof typeof CFG].scale,
      };
    });
    return converted;
  }, [CFG]);

  useLandingProductAnimation({
    ref,
    CFG: animationCFG,
    positionKey,
    selected,
    hovered,
    shouldAnimate: hasAnimatedIn && isSectionInView,
  });

  const handleClick = () => {
    setSelectedItem(i);
  };

  return (
    <>
      <group
        ref={ref}
        position={
          hasAnimatedIn
            ? undefined
            : [
                CFG[positionKey].position[0],
                initialPositionY,
                CFG[positionKey].position[2],
              ]
        }
        scale={
          hasAnimatedIn
            ? undefined
            : [
                CFG[positionKey].scale,
                CFG[positionKey].scale,
                CFG[positionKey].scale,
              ]
        }
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
        castShadow
        receiveShadow
      >
        <Tub slug={product.slug} glbUrl={product.glbUrl} />
      </group>
      {selected && (
        <Html
          center
          position={[
            CFG[positionKey].position[0],
            -0.85,
            CFG[positionKey].position[2],
          ]}
        >
          <div className="w-[250px] flex flex-col items-center justify-center text-center">
            {/* Product Name Title */}
            <h2 className="select-none">{product.name}</h2>
            {/* Price */}
            <p className="flex gap-2 items-center my-2">
              <span className="line-through text-neutral-500 leading-none">
                ${product.product_stock[0].price}
              </span>
              <span className="font-bold leading-none">
                ${product.product_stock[0].sale_price}
              </span>
            </p>
            {/* Button */}
            <div>
              <Button
                href={`/products/${product.slug}`}
                text="View Product"
                wrapperClassName="mt-2 md:mt-4"
                className="w-fit h-fit"
              />
            </div>
          </div>
        </Html>
      )}
    </>
  );
};

export default Item;
