"use client";

import { Suspense, useRef } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import Lion from "@/components/3d/Lion";
import { useCursorLight } from "@/hooks/useCursorLight";
import { useParallax } from "@/hooks/useParallax";
import * as THREE from "three";

interface MenuCanvasEnvironmentProps {
  isMobile: boolean;
}

function MenuLighting({ pointer }: { pointer: { x: number; y: number } }) {
  const cursorLightRef = useRef<THREE.PointLight>(null);

  useCursorLight({
    lightRef: cursorLightRef as React.RefObject<THREE.PointLight>,
    pointer,
    config: {
      scale: 5,
      smoothness: 0.2,
    },
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} />

      {/* Cursor Light */}
      <pointLight
        ref={cursorLightRef}
        color={0xffffff}
        intensity={2}
        distance={5}
        decay={2}
        position={[0, 0, 2]}
      />
    </>
  );
}

const config = {
  baseEnvironmentRotationX: -Math.PI / 2,
  baseEnvironmentRotationY: 0,
  baseEnvironmentRotationZ: -0.1,
  parallaxSensitivityX: 0.1,
  parallaxSensitivityY: 0.1,
  parallaxDamping: 0.05,
};

export function MenuCanvasEnvironment({
  isMobile,
}: MenuCanvasEnvironmentProps) {
  const { pointer } = useThree();
  const lionRef = useRef<THREE.Group>(null);

  useParallax({
    groupRef: lionRef,
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
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <color attach="background" args={["#0b0c0d"]} />

      <MenuLighting pointer={pointer} />

      <Suspense fallback={null}>
        <Lion
          ref={lionRef}
          scale={isMobile ? 0.1 : 0.15}
          position={[1, -2, 1]}
          rotation={[
            config.baseEnvironmentRotationX,
            config.baseEnvironmentRotationY,
            config.baseEnvironmentRotationZ,
          ]}
        />
      </Suspense>
    </>
  );
}
