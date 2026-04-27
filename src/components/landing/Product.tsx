"use client";

import {
  useRef,
  useMemo,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import useLandingProductAnimation from "@/hooks/useLandingProductAnimation";
import { Html } from "@react-three/drei";
import { Tub } from "@/components/3d/Tub";
import Button from "@/components/ui/Button";
import { Product } from "@/types/product";
import useLandingProductInitialYAnimation from "@/hooks/useLandingProductInitialYAnimation";
import useLandingProductHover from "@/hooks/useLandingProductHover";
import useDeviceSize from "@/hooks/useDeviceSize";
import {
  desktopCFG,
  desktopSpreadCFG,
  mobileCFG,
  mobileSpreadCFG,
  SPREAD_INFO_THRESHOLD,
  SPREAD_PROGRESS_RANGE,
} from "@/config/productAnimationConfig";
import { Group } from "three";
import { motion, type MotionValue } from "motion/react";

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
  scrollProgress?: MotionValue<number>;
}

const Item = ({
  product,
  i,
  selectedItem,
  setSelectedItem,
  isSectionInView,
  totalProducts = 3,
  scrollProgress,
}: ItemProps) => {
  const ref = useRef<Group>(null!);
  const { isMobile } = useDeviceSize();
  const selected = selectedItem === i;

  const CFG = useMemo(() => (isMobile ? mobileCFG : desktopCFG), [isMobile]);
  const spreadCFG = useMemo(
    () => (isMobile ? mobileSpreadCFG : desktopSpreadCFG),
    [isMobile]
  );

  const positionKey = getPositionKey(i, selected, selectedItem, totalProducts);

  const spreadPosition = useMemo<[number, number, number]>(() => {
    const offset = i - (totalProducts - 1) / 2;
    return [offset * spreadCFG.spacing, spreadCFG.y, spreadCFG.z];
  }, [i, totalProducts, spreadCFG]);

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
    scrollProgress,
    spreadPosition,
    spreadScale: spreadCFG.scale,
    spreadProgressRange: SPREAD_PROGRESS_RANGE,
  });

  const [spreadActive, setSpreadActive] = useState(false);
  useEffect(() => {
    if (!scrollProgress) return;
    const update = (latest: number) => {
      const next = latest >= SPREAD_INFO_THRESHOLD;
      setSpreadActive((prev) => (prev === next ? prev : next));
    };
    update(scrollProgress.get());
    return scrollProgress.on("change", update);
  }, [scrollProgress]);

  const handleClick = () => {
    if (spreadActive) return;
    setSelectedItem(i);
  };

  const showSelectedInfo = selected && !spreadActive;

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
      {showSelectedInfo && (
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
      {spreadActive && (
        <Html
          center
          position={[spreadPosition[0], -0.85, spreadPosition[2]]}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-[200px] md:w-[220px] flex flex-col items-center justify-center text-center"
          >
            <h3 className="select-none uppercase font-semibold">
              {product.name}
            </h3>
            <p className="flex gap-2 items-center my-2">
              <span className="line-through text-neutral-500 leading-none">
                ${product.product_stock[0].price}
              </span>
              <span className="font-bold leading-none">
                ${product.product_stock[0].sale_price}
              </span>
            </p>
            <div>
              <Button
                href={`/products/${product.slug}`}
                text="View Product"
                wrapperClassName="mt-2 md:mt-4"
                className="w-fit h-fit"
              />
            </div>
          </motion.div>
        </Html>
      )}
    </>
  );
};

export default Item;
