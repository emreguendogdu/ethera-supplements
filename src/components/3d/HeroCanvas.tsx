"use client";

import { useRef, useState, useEffect } from "react";
import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { HeroProductsRef } from "@/components/3d/HeroProducts";
import { HeroCanvasEnvironment } from "@/components/3d/HeroCanvasEnvironment";
import { useHeroCanvasAnimation } from "@/hooks/useHeroCanvasAnimation";
import useDeviceSize from "@/hooks/useDeviceSize";
import DisableRender from "../DisableRender";
import * as THREE from "three";
import { cn } from "@/utils/cn";

interface HeroCanvasProps {
  inView: boolean;
  wrapperClassName?: string;
  pointer?: { x: number; y: number };
}

export default function HeroCanvas({
  inView,
  wrapperClassName,
  pointer,
}: HeroCanvasProps) {
  const { isMobile } = useDeviceSize();
  const [shouldRender, setShouldRender] = useState(inView);
  const statueRef = useRef<THREE.Group>(null);
  const heroProductsRef = useRef<HeroProductsRef>(null);

  // Optimize rendering by unmounting/disabling when out of view
  useEffect(() => {
    if (inView) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  // Handle scroll animations
  useHeroCanvasAnimation({
    inView,
    statueRef,
    heroProductsRef,
  });

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed inset-0 w-full h-svh z-0 pointer-events-none select-none",
        inView
          ? "opacity-100"
          : "opacity-0 select-none pointer-events-none -z-10",
        wrapperClassName
      )}
    >
      <Canvas
        shadows
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0,
          outputColorSpace: THREE.SRGBColorSpace,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]}
        style={{ pointerEvents: "none" }}
      >
        {!inView && <DisableRender />}
        <HeroCanvasEnvironment
          isMobile={isMobile}
          pointer={pointer}
          statueRef={statueRef}
          heroProductsRef={heroProductsRef}
        />
      </Canvas>
      <Loader />
    </div>
  );
}
