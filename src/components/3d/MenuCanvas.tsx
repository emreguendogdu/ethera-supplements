"use client";

import { useState, useEffect } from "react";
import { Loader, Preload, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { MenuCanvasEnvironment } from "@/components/3d/MenuCanvasEnvironment";
import useDeviceSize from "@/hooks/useDeviceSize";
import DisableRender from "../DisableRender";
import * as THREE from "three";
import { cn } from "@/utils/cn";

useGLTF.preload("/3d/lion.glb");

interface MenuCanvasProps {
  inView: boolean;
  wrapperClassName?: string;
}

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
  cancelIdleCallback?: (handle: number) => void;
};

export default function MenuCanvas({
  inView,
  wrapperClassName,
}: MenuCanvasProps) {
  const { isMobile } = useDeviceSize();
  const [shouldRender, setShouldRender] = useState(false);

  // Pre-mount Canvas during idle so first menu open does not pay GL ctx + shader compile cost
  useEffect(() => {
    if (shouldRender) return;
    const w = window as IdleWindow;
    if (typeof w.requestIdleCallback === "function") {
      const handle = w.requestIdleCallback(() => setShouldRender(true), {
        timeout: 4000,
      });
      return () => w.cancelIdleCallback?.(handle);
    }
    const timer = setTimeout(() => setShouldRender(true), 2500);
    return () => clearTimeout(timer);
  }, [shouldRender]);

  // Force-mount immediately if menu opens before idle pre-mount fires
  useEffect(() => {
    if (inView) setShouldRender(true);
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
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0,
          outputColorSpace: THREE.SRGBColorSpace,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]}
        frameloop={inView ? "always" : "demand"}
        style={{ pointerEvents: inView ? "auto" : "none" }}
      >
        {!inView && <DisableRender />}
        <MenuCanvasEnvironment isMobile={isMobile} />
        <Preload all />
      </Canvas>
      <Loader />
    </div>
  );
}
