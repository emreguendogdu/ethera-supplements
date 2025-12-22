"use client";

import { useState, useEffect } from "react";
import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { MenuCanvasEnvironment } from "@/components/3d/MenuCanvasEnvironment";
import useDeviceSize from "@/hooks/useDeviceSize";
import DisableRender from "../DisableRender";
import * as THREE from "three";
import { cn } from "@/utils/cn";

interface MenuCanvasProps {
  inView: boolean;
  wrapperClassName?: string;
}

export default function MenuCanvas({
  inView,
  wrapperClassName,
}: MenuCanvasProps) {
  const { isMobile } = useDeviceSize();
  const [shouldRender, setShouldRender] = useState(inView);

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
        }}
        dpr={[1, 2]}
      >
        {!inView && <DisableRender />}
        <MenuCanvasEnvironment isMobile={isMobile} />
      </Canvas>
      <Loader />
    </div>
  );
}
