"use client";

import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useHeroCanvasLightAnimation } from "@/hooks/useHeroCanvasLightAnimation";
import { useCursorLight } from "@/hooks/useCursorLight";

interface HeroLightingConfig {
  keyIntensity: number;
  keyPos: [number, number, number];
  fillIntensity: number;
  fillPos: [number, number, number];
  rimIntensity: number;
  rimPos: [number, number, number];
  topIntensity: number;
  topPos: [number, number, number];
  cursorLightEnabled: boolean;
  cursorLightIntensity: number;
  cursorLightColor: number;
  cursorLightDistance: number;
  cursorLightDecay: number;
  cursorLightPosZ: number;
  cursorLightSmoothness: number;
  cursorLightScale: number;
}

interface HeroLightingProps {
  isMobile: boolean;
  pointer: { x: number; y: number };
}

const defaultConfig: HeroLightingConfig = {
  keyIntensity: 0.5,
  keyPos: [-5.6, -9.5, 20],
  fillIntensity: 0.42,
  fillPos: [-5, 2.5, -2.5],
  rimIntensity: 1,
  rimPos: [-20, -20, 11.1],
  topIntensity: 0.0,
  topPos: [0, 15, 0],
  cursorLightEnabled: true,
  cursorLightIntensity: 3,
  cursorLightColor: 0xffffff,
  cursorLightDistance: 3,
  cursorLightDecay: 3,
  cursorLightPosZ: -1.3,
  cursorLightSmoothness: 0.2,
  cursorLightScale: 1,
};

export function HeroLighting({ isMobile, pointer }: HeroLightingProps) {
  const [config, setConfig] = useState<HeroLightingConfig>(defaultConfig);
  const keyLightRef = useRef<THREE.DirectionalLight>(null);
  const fillLightRef = useRef<THREE.DirectionalLight>(null);
  const rimLightRef = useRef<THREE.DirectionalLight>(null);
  const topLightRef = useRef<THREE.DirectionalLight>(null);
  const cursorLightRef = useRef<THREE.PointLight>(null);

  // Set lights to 0 immediately on mount to prevent flash
  useEffect(() => {
    if (keyLightRef.current) keyLightRef.current.intensity = 0;
    if (fillLightRef.current) fillLightRef.current.intensity = 0;
    if (rimLightRef.current) rimLightRef.current.intensity = 0;
    if (topLightRef.current) topLightRef.current.intensity = 0;
    if (cursorLightRef.current) cursorLightRef.current.intensity = 0;
  }, []);

  useHeroCanvasLightAnimation(
    {
      fillLight: fillLightRef as React.RefObject<THREE.DirectionalLight>,
      topLight: topLightRef as React.RefObject<THREE.DirectionalLight>,
      rimLight: rimLightRef as React.RefObject<THREE.DirectionalLight>,
      keyLight: keyLightRef as React.RefObject<THREE.DirectionalLight>,
      cursorLight: cursorLightRef as React.RefObject<THREE.PointLight>,
    },
    {
      fillIntensity: config.fillIntensity,
      keyIntensity: config.keyIntensity,
      topIntensity: config.topIntensity,
      rimIntensity: config.rimIntensity,
      cursorLightIntensity: config.cursorLightIntensity,
    }
  );

  useCursorLight({
    lightRef: cursorLightRef as React.RefObject<THREE.PointLight>,
    pointer,
    config: {
      scale: config.cursorLightScale,
      smoothness: config.cursorLightSmoothness,
    },
  });

  return (
    <>
      <directionalLight
        position={config.keyPos}
        intensity={0}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-bias={-0.00005}
        shadow-normalBias={0.05}
        ref={keyLightRef}
      />
      <directionalLight
        position={config.fillPos}
        intensity={0}
        ref={fillLightRef}
      />
      <directionalLight
        position={config.rimPos}
        intensity={0}
        ref={rimLightRef}
      />
      <directionalLight
        position={config.topPos}
        intensity={0}
        ref={topLightRef}
      />
      {config.cursorLightEnabled && (
        <pointLight
          ref={cursorLightRef}
          color={config.cursorLightColor}
          intensity={0}
          distance={config.cursorLightDistance}
          decay={config.cursorLightDecay}
          position={[0, 0, config.cursorLightPosZ]}
        />
      )}
    </>
  );
}
