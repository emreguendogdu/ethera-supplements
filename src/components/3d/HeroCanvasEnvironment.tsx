"use client";

import { Suspense, useRef } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import Statue from "@/components/3d/Statue";
import { HeroProducts, HeroProductsRef } from "@/components/3d/HeroProducts";
import { HeroLighting } from "@/components/3d/HeroLighting";
import { useParallax } from "@/hooks/useParallax";
import * as THREE from "three";

const config = {
  canvasBg: "#0b0c0d",
  metalness: 0.55,
  roughness: 0.75,
  baseEnvironmentPosX: -1.4,
  baseEnvironmentPosY: -4.4,
  baseEnvironmentPosZ: 0.75,
  baseEnvironmentRotationX: 0,
  baseEnvironmentRotationY: 0.5,
  baseEnvironmentRotationZ: 0,
  parallaxSensitivityX: 0.05,
  parallaxSensitivityY: 0.05,
  parallaxDamping: 0.05,
};

interface HeroCanvasEnvironmentProps {
  isMobile: boolean;
  pointer?: { x: number; y: number };
  statueRef: React.RefObject<THREE.Group | null>;
  heroProductsRef: React.RefObject<HeroProductsRef | null>;
}

export function HeroCanvasEnvironment({
  isMobile,
  pointer: externalPointer,
  statueRef,
  heroProductsRef,
}: HeroCanvasEnvironmentProps) {
  const { pointer: threePointer } = useThree();
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
            ref={statueRef}
            metalness={config.metalness}
            roughness={config.roughness}
            scale={isMobile ? 0.6 : 1}
          />
          <HeroProducts ref={heroProductsRef} />
        </Suspense>
      </group>
    </>
  );
}
