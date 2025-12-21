"use client";

import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { GUI } from "lil-gui";
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

  // Set up GUI controls for lighting
  useEffect(() => {
    return;
    const gui = new GUI();
    gui.title("Lighting Controls");
    // Position next to the products GUI (on the right side)
    gui.domElement.style.position = "fixed";
    gui.domElement.style.top = "10px";
    gui.domElement.style.left = "auto";
    gui.domElement.style.right = "270px"; // Position next to products GUI (245px width + 25px spacing)

    // Key Light controls
    const keyLightFolder = gui.addFolder("Key Light");
    const keyLightObj = {
      intensity: config.keyIntensity,
      posX: config.keyPos[0],
      posY: config.keyPos[1],
      posZ: config.keyPos[2],
    };
    keyLightFolder
      .add(keyLightObj, "intensity", 0, 2, 0.01)
      .onChange((value: number) => {
        setConfig((prev) => ({ ...prev, keyIntensity: value }));
      });
    keyLightFolder
      .add(keyLightObj, "posX", -20, 20, 0.1)
      .onChange((value: number) => {
        setConfig((prev) => ({
          ...prev,
          keyPos: [value, prev.keyPos[1], prev.keyPos[2]],
        }));
      });
    keyLightFolder
      .add(keyLightObj, "posY", -20, 20, 0.1)
      .onChange((value: number) => {
        setConfig((prev) => ({
          ...prev,
          keyPos: [prev.keyPos[0], value, prev.keyPos[2]],
        }));
      });
    keyLightFolder
      .add(keyLightObj, "posZ", -20, 20, 0.1)
      .onChange((value: number) => {
        setConfig((prev) => ({
          ...prev,
          keyPos: [prev.keyPos[0], prev.keyPos[1], value],
        }));
      });

    // Fill Light controls
    const fillLightFolder = gui.addFolder("Fill Light");
    const fillLightObj = {
      intensity: config.fillIntensity,
      posX: config.fillPos[0],
      posY: config.fillPos[1],
      posZ: config.fillPos[2],
    };
    fillLightFolder
      .add(fillLightObj, "intensity", 0, 2, 0.01)
      .onChange((value: number) => {
        setConfig((prev) => ({ ...prev, fillIntensity: value }));
      });
    fillLightFolder
      .add(fillLightObj, "posX", -20, 20, 0.1)
      .onChange((value: number) => {
        setConfig((prev) => ({
          ...prev,
          fillPos: [value, prev.fillPos[1], prev.fillPos[2]],
        }));
      });
    fillLightFolder
      .add(fillLightObj, "posY", -20, 20, 0.1)
      .onChange((value: number) => {
        setConfig((prev) => ({
          ...prev,
          fillPos: [prev.fillPos[0], value, prev.fillPos[2]],
        }));
      });
    fillLightFolder
      .add(fillLightObj, "posZ", -20, 20, 0.1)
      .onChange((value: number) => {
        setConfig((prev) => ({
          ...prev,
          fillPos: [prev.fillPos[0], prev.fillPos[1], value],
        }));
      });

    // Rim Light controls
    const rimLightFolder = gui.addFolder("Rim Light");
    const rimLightObj = {
      intensity: config.rimIntensity,
      posX: config.rimPos[0],
      posY: config.rimPos[1],
      posZ: config.rimPos[2],
    };
    rimLightFolder
      .add(rimLightObj, "intensity", 0, 2, 0.01)
      .onChange((value: number) => {
        setConfig((prev) => ({ ...prev, rimIntensity: value }));
      });
    rimLightFolder
      .add(rimLightObj, "posX", -20, 20, 0.1)
      .onChange((value: number) => {
        setConfig((prev) => ({
          ...prev,
          rimPos: [value, prev.rimPos[1], prev.rimPos[2]],
        }));
      });
    rimLightFolder
      .add(rimLightObj, "posY", -20, 20, 0.1)
      .onChange((value: number) => {
        setConfig((prev) => ({
          ...prev,
          rimPos: [prev.rimPos[0], value, prev.rimPos[2]],
        }));
      });
    rimLightFolder
      .add(rimLightObj, "posZ", -20, 20, 0.1)
      .onChange((value: number) => {
        setConfig((prev) => ({
          ...prev,
          rimPos: [prev.rimPos[0], prev.rimPos[1], value],
        }));
      });

    // Top Light controls
    const topLightFolder = gui.addFolder("Top Light");
    const topLightObj = {
      intensity: config.topIntensity,
      posX: config.topPos[0],
      posY: config.topPos[1],
      posZ: config.topPos[2],
    };
    topLightFolder
      .add(topLightObj, "intensity", 0, 2, 0.01)
      .onChange((value: number) => {
        setConfig((prev) => ({ ...prev, topIntensity: value }));
      });
    topLightFolder
      .add(topLightObj, "posX", -20, 20, 0.1)
      .onChange((value: number) => {
        setConfig((prev) => ({
          ...prev,
          topPos: [value, prev.topPos[1], prev.topPos[2]],
        }));
      });
    topLightFolder
      .add(topLightObj, "posY", -20, 20, 0.1)
      .onChange((value: number) => {
        setConfig((prev) => ({
          ...prev,
          topPos: [prev.topPos[0], value, prev.topPos[2]],
        }));
      });
    topLightFolder
      .add(topLightObj, "posZ", -20, 20, 0.1)
      .onChange((value: number) => {
        setConfig((prev) => ({
          ...prev,
          topPos: [prev.topPos[0], prev.topPos[1], value],
        }));
      });

    // Cursor Light controls
    const cursorLightFolder = gui.addFolder("Cursor Light");
    const cursorLightObj = {
      enabled: config.cursorLightEnabled,
      intensity: config.cursorLightIntensity,
      color: `#${config.cursorLightColor.toString(16).padStart(6, "0")}`,
      distance: config.cursorLightDistance,
      decay: config.cursorLightDecay,
      posZ: config.cursorLightPosZ,
      smoothness: config.cursorLightSmoothness,
      scale: config.cursorLightScale,
    };
    cursorLightFolder
      .add(cursorLightObj, "enabled")
      .onChange((value: boolean) => {
        setConfig((prev) => ({ ...prev, cursorLightEnabled: value }));
      });
    cursorLightFolder
      .add(cursorLightObj, "intensity", 0, 10, 0.1)
      .onChange((value: number) => {
        setConfig((prev) => ({ ...prev, cursorLightIntensity: value }));
      });
    cursorLightFolder
      .addColor(cursorLightObj, "color")
      .onChange((value: string) => {
        const hex = parseInt(value.replace("#", ""), 16);
        setConfig((prev) => ({ ...prev, cursorLightColor: hex }));
      });
    cursorLightFolder
      .add(cursorLightObj, "distance", 0, 20, 0.1)
      .onChange((value: number) => {
        setConfig((prev) => ({ ...prev, cursorLightDistance: value }));
      });
    cursorLightFolder
      .add(cursorLightObj, "decay", 0, 5, 0.1)
      .onChange((value: number) => {
        setConfig((prev) => ({ ...prev, cursorLightDecay: value }));
      });
    cursorLightFolder
      .add(cursorLightObj, "posZ", -10, 10, 0.1)
      .onChange((value: number) => {
        setConfig((prev) => ({ ...prev, cursorLightPosZ: value }));
      });
    cursorLightFolder
      .add(cursorLightObj, "smoothness", 0, 1, 0.01)
      .onChange((value: number) => {
        setConfig((prev) => ({ ...prev, cursorLightSmoothness: value }));
      });
    cursorLightFolder
      .add(cursorLightObj, "scale", 0, 5, 0.1)
      .onChange((value: number) => {
        setConfig((prev) => ({ ...prev, cursorLightScale: value }));
      });

    return () => {
      gui.destroy();
    };
  }, []);

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
