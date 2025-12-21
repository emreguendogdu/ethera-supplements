"use client";

import { Suspense, useRef, useState, useEffect } from "react";
import { Loader, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import Statue from "@/components/3d/Statue";
import { HeroProducts } from "@/components/3d/HeroProducts";
import { HeroLighting } from "@/components/3d/HeroLighting";
import { useParallax } from "@/hooks/useParallax";
import useDeviceSize from "@/hooks/useDeviceSize";
import DisableRender from "../DisableRender";
import * as THREE from "three";
import { cn } from "@/utils/cn";

const config = {
  canvasBg: "#000000",
  metalness: 0.55,
  roughness: 0.75,
  baseEnvironmentPosX: -1.4,
  baseEnvironmentPosY: -4.4,
  baseEnvironmentPosZ: 0.75,
  baseEnvironmentRotationX: 0,
  baseEnvironmentRotationY: 0.5,
  baseEnvironmentRotationZ: 0,
  parallaxSensitivityX: 0 /* 0.25 */,
  parallaxSensitivityY: 0 /* 0.05 */,
  parallaxDamping: 0.05,
};

interface EnvironmentProps {
  isMobile: boolean;
  isInView: boolean;
  pointer?: { x: number; y: number };
}

function Environment({ isMobile, pointer: externalPointer }: EnvironmentProps) {
  const { pointer: threePointer, camera } = useThree();
  const pointer = externalPointer ?? threePointer;
  const groupRef = useRef<THREE.Group>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useParallax({
    groupRef,
    pointer,
    config: {
      sensitivityX: config.parallaxSensitivityX,
      sensitivityY: config.parallaxSensitivityY,
      baseEnvironmentRotationX: config.baseEnvironmentRotationX,
      baseEnvironmentRotationY: config.baseEnvironmentRotationY,
      baseEnvironmentRotationZ: config.baseEnvironmentRotationZ,
      damping: config.parallaxDamping,
    },
  });

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 0, 5]}
        fov={50}
      />
      <color attach="background" args={[config.canvasBg]} />

      <HeroLighting isMobile={isMobile} pointer={pointer} />

      <group
        ref={groupRef}
        position={[
          isMobile
            ? config.baseEnvironmentPosX + 1.25
            : config.baseEnvironmentPosX,
          isMobile
            ? config.baseEnvironmentPosY + 2
            : config.baseEnvironmentPosY,
          config.baseEnvironmentPosZ,
        ]}
        rotation={[1, 2, 5]}
      >
        <Suspense fallback={null}>
          <Statue
            metalness={config.metalness}
            roughness={config.roughness}
            scale={isMobile ? 0.6 : 1}
          />
          <HeroProducts />
        </Suspense>
      </group>
    </>
  );
}

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
        dpr={[1, 2]} // Min 1, Max 2 like snippet
      >
        {!inView && <DisableRender />}
        <Environment isInView={inView} isMobile={isMobile} pointer={pointer} />
      </Canvas>
      <Loader />
    </div>
  );
}
