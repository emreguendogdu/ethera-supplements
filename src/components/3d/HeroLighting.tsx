"use client";

import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useHeroCanvasLightAnimation } from "@/hooks/useHeroCanvasLightAnimation";
import { useCursorLight } from "@/hooks/useCursorLight";
import { HeroLightingGUI } from "./HeroLightingGUI";

interface HeroLightingConfig {
  keyIntensity: number;
  keyPos: [number, number, number];
  fillIntensity: number;
  fillPos: [number, number, number];
  rimIntensity: number;
  rimPos: [number, number, number];
  topIntensity: number;
  topPos: [number, number, number];
  initialIntensity: number;
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

const config: HeroLightingConfig = {
  keyIntensity: 2.5,
  keyPos: [-1.4, 2, 5],
  fillIntensity: 0.5,
  fillPos: [-5, 0, 5],
  rimIntensity: 2,
  rimPos: [0, 5, -10],
  topIntensity: 0.5,
  topPos: [0, 10, 0],
  initialIntensity: 1.0,
  cursorLightEnabled: false,
  cursorLightIntensity: 0,
  cursorLightColor: 0xffffff,
  cursorLightDistance: 3,
  cursorLightDecay: 3,
  cursorLightPosZ: -1.3,
  cursorLightSmoothness: 0.2,
  cursorLightScale: 1,
};

export function HeroLighting({ isMobile, pointer }: HeroLightingProps) {
  const keyLightRef = useRef<THREE.DirectionalLight>(null);
  const fillLightRef = useRef<THREE.DirectionalLight>(null);
  const rimLightRef = useRef<THREE.DirectionalLight>(null);
  const topLightRef = useRef<THREE.DirectionalLight>(null);
  const cursorLightRef = useRef<THREE.PointLight>(null);

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
      initialIntensity: config.initialIntensity,
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
      {process.env.NODE_ENV === "development" && (
        <HeroLightingGUI
          keyLightRef={keyLightRef}
          fillLightRef={fillLightRef}
          rimLightRef={rimLightRef}
          topLightRef={topLightRef}
          cursorLightRef={cursorLightRef}
          config={config}
        />
      )}
      <directionalLight
        position={config.keyPos}
        intensity={config.initialIntensity}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-bias={-0.00005}
        shadow-normalBias={0.05}
        ref={keyLightRef}
      />
      <directionalLight
        position={config.fillPos}
        intensity={config.initialIntensity}
        ref={fillLightRef}
      />
      <directionalLight
        position={config.rimPos}
        intensity={config.initialIntensity}
        ref={rimLightRef}
      />
      <directionalLight
        position={config.topPos}
        intensity={config.initialIntensity}
        ref={topLightRef}
      />
      {config.cursorLightEnabled && (
        <pointLight
          ref={cursorLightRef}
          color={config.cursorLightColor}
          intensity={config.initialIntensity}
          distance={config.cursorLightDistance}
          decay={config.cursorLightDecay}
          position={[0, 0, config.cursorLightPosZ]}
        />
      )}
    </>
  );
}
