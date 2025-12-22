"use client";

import { useEffect } from "react";
import * as THREE from "three";
import { GUI } from "lil-gui";

interface HeroLightingGUIProps {
  keyLightRef: React.RefObject<THREE.DirectionalLight | null>;
  fillLightRef: React.RefObject<THREE.DirectionalLight | null>;
  rimLightRef: React.RefObject<THREE.DirectionalLight | null>;
  topLightRef: React.RefObject<THREE.DirectionalLight | null>;
  cursorLightRef: React.RefObject<THREE.PointLight | null>;
  config: {
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
  };
}

export function HeroLightingGUI({
  keyLightRef,
  fillLightRef,
  rimLightRef,
  topLightRef,
  cursorLightRef,
  config,
}: HeroLightingGUIProps) {
  useEffect(() => {
    const gui = new GUI();
    gui.title("Lighting Controls");
    gui.domElement.style.position = "fixed";
    gui.domElement.style.top = "10px";
    gui.domElement.style.right = "10px";
    gui.domElement.style.left = "auto";

    // Helper function to create controls for a directional light
    const createDirectionalLightControls = (
      ref: React.RefObject<THREE.DirectionalLight | null>,
      name: string,
      initialIntensity: number,
      initialPos: [number, number, number]
    ) => {
      if (!ref.current) return;

      const folder = gui.addFolder(name);

      // Intensity control
      const intensityObj = { intensity: initialIntensity };
      folder
        .add(intensityObj, "intensity", 0, 2, 0.01)
        .onChange((value: number) => {
          if (ref.current) ref.current.intensity = value;
        });

      // Position controls
      const positionFolder = folder.addFolder("Position");
      const positionObj = {
        x: initialPos[0],
        y: initialPos[1],
        z: initialPos[2],
      };

      positionFolder
        .add(positionObj, "x", -30, 30, 0.1)
        .onChange((value: number) => {
          if (ref.current) ref.current.position.x = value;
        });
      positionFolder
        .add(positionObj, "y", -30, 30, 0.1)
        .onChange((value: number) => {
          if (ref.current) ref.current.position.y = value;
        });
      positionFolder
        .add(positionObj, "z", -30, 30, 0.1)
        .onChange((value: number) => {
          if (ref.current) ref.current.position.z = value;
        });
    };

    // Helper function to create controls for cursor light
    const createCursorLightControls = () => {
      if (!cursorLightRef.current) return;

      const folder = gui.addFolder("Cursor Light");

      // Enabled toggle
      const enabledObj = { enabled: config.cursorLightEnabled };
      folder
        .add(enabledObj, "enabled")
        .onChange((value: boolean) => {
          if (cursorLightRef.current) {
            cursorLightRef.current.visible = value;
          }
        });

      // Intensity control
      const intensityObj = { intensity: config.cursorLightIntensity };
      folder
        .add(intensityObj, "intensity", 0, 5, 0.01)
        .onChange((value: number) => {
          if (cursorLightRef.current)
            cursorLightRef.current.intensity = value;
        });

      // Color control
      const colorObj = { color: `#${config.cursorLightColor.toString(16).padStart(6, "0")}` };
      folder
        .addColor(colorObj, "color")
        .onChange((value: string) => {
          if (cursorLightRef.current) {
            cursorLightRef.current.color.set(value);
          }
        });

      // Distance control
      const distanceObj = { distance: config.cursorLightDistance };
      folder
        .add(distanceObj, "distance", 0, 10, 0.1)
        .onChange((value: number) => {
          if (cursorLightRef.current)
            cursorLightRef.current.distance = value;
        });

      // Decay control
      const decayObj = { decay: config.cursorLightDecay };
      folder
        .add(decayObj, "decay", 0, 5, 0.1)
        .onChange((value: number) => {
          if (cursorLightRef.current) cursorLightRef.current.decay = value;
        });

      // Position Z control
      const posZObj = { posZ: config.cursorLightPosZ };
      folder
        .add(posZObj, "posZ", -10, 10, 0.1)
        .onChange((value: number) => {
          if (cursorLightRef.current)
            cursorLightRef.current.position.z = value;
        });
    };

    // Wait for refs to be ready
    const checkAndSetup = () => {
      if (keyLightRef.current) {
        createDirectionalLightControls(
          keyLightRef,
          "Key Light",
          config.keyIntensity,
          config.keyPos
        );
      }
      if (fillLightRef.current) {
        createDirectionalLightControls(
          fillLightRef,
          "Fill Light",
          config.fillIntensity,
          config.fillPos
        );
      }
      if (rimLightRef.current) {
        createDirectionalLightControls(
          rimLightRef,
          "Rim Light",
          config.rimIntensity,
          config.rimPos
        );
      }
      if (topLightRef.current) {
        createDirectionalLightControls(
          topLightRef,
          "Top Light",
          config.topIntensity,
          config.topPos
        );
      }
      if (cursorLightRef.current) {
        createCursorLightControls();
      }
    };

    // Try immediately, then with delays
    checkAndSetup();
    const timeout1 = setTimeout(checkAndSetup, 100);
    const timeout2 = setTimeout(checkAndSetup, 500);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      gui.destroy();
    };
  }, [
    keyLightRef,
    fillLightRef,
    rimLightRef,
    topLightRef,
    cursorLightRef,
    config,
  ]);

  return null;
}



