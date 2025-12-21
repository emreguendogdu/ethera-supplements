import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface UseParallaxConfig {
  sensitivityX: number;
  sensitivityY: number;
  baseEnvironmentRotationX: number;
  baseEnvironmentRotationY: number;
  baseEnvironmentRotationZ: number;
  damping: number;
}

interface UseParallaxProps {
  groupRef: React.RefObject<THREE.Group | null>;
  pointer: { x: number; y: number };
  config: UseParallaxConfig;
}

export function useParallax({ groupRef, pointer, config }: UseParallaxProps) {
  const currentRotationX = useRef(0);
  const currentRotationY = useRef(0);

  useFrame(() => {
    const targetRotationY = pointer.x * config.sensitivityX;
    const targetRotationX = -pointer.y * config.sensitivityY;

    currentRotationX.current +=
      (targetRotationX - currentRotationX.current) * config.damping;
    currentRotationY.current +=
      (targetRotationY - currentRotationY.current) * config.damping;

    if (groupRef.current) {
      groupRef.current.rotation.x =
        config.baseEnvironmentRotationX + currentRotationX.current;
      groupRef.current.rotation.y =
        config.baseEnvironmentRotationY + currentRotationY.current;
      groupRef.current.rotation.z = config.baseEnvironmentRotationZ;
    }
  });
}
