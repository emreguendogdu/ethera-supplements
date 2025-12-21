"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface UseCursorLightConfig {
  scale: number;
  smoothness: number;
}

interface UseCursorLightProps {
  lightRef: React.RefObject<THREE.PointLight>;
  pointer: { x: number; y: number };
  config: UseCursorLightConfig;
}

export function useCursorLight({
  lightRef,
  pointer,
  config,
}: UseCursorLightProps) {
  const cursorLightCurrentX = useRef(0);
  const cursorLightCurrentY = useRef(0);

  useFrame(() => {
    const targetLightX = pointer.x * config.scale;
    const targetLightY = pointer.y * config.scale;

    cursorLightCurrentX.current +=
      (targetLightX - cursorLightCurrentX.current) * config.smoothness;
    cursorLightCurrentY.current +=
      (targetLightY - cursorLightCurrentY.current) * config.smoothness;

    if (lightRef.current) {
      lightRef.current.position.x = cursorLightCurrentX.current;
      lightRef.current.position.y = cursorLightCurrentY.current;
    }
  });
}
