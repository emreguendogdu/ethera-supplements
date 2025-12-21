"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import * as THREE from "three";
import { useLoadingStore } from "@/stores/loadingStore";

interface LightRefs {
  fillLight: React.RefObject<THREE.DirectionalLight>;
  topLight: React.RefObject<THREE.DirectionalLight>;
  rimLight: React.RefObject<THREE.DirectionalLight>;
  keyLight: React.RefObject<THREE.DirectionalLight>;
  cursorLight: React.RefObject<THREE.PointLight>;
}

interface LightConfig {
  fillIntensity: number;
  keyIntensity: number;
  topIntensity: number;
  rimIntensity: number;
  cursorLightIntensity: number;
}

export function useHeroCanvasLightAnimation(
  refs: LightRefs,
  config: LightConfig
) {
  const preloaderAnimationComplete = useLoadingStore(
    (state) => state.preloaderAnimationComplete
  );

  useGSAP(() => {
    const { fillLight, topLight, rimLight, keyLight, cursorLight } = refs;

    if (
      !preloaderAnimationComplete ||
      !fillLight.current ||
      !topLight.current ||
      !rimLight.current ||
      !keyLight.current ||
      !cursorLight.current
    ) {
      return;
    }

    const tl = gsap.timeline();

    // Initial state: total dark
    tl.set(fillLight.current, { intensity: 0.05 });
    tl.set(topLight.current, { intensity: 0.05 });
    tl.set(rimLight.current, { intensity: 0.05 });
    tl.set(keyLight.current, { intensity: 0.05 });
    tl.set(cursorLight.current, { intensity: 0 });

    // The "Flicker" (fast on/off)
    /*  tl.to(fillLight.current, {
      intensity: config.fillIntensity,
      duration: 0.1,
      delay: 1,
    })
      .to(fillLight.current, { intensity: 0, duration: 0.05 })
      .to(fillLight.current, {
        intensity: config.fillIntensity + 0.2,
        duration: 0.1,
      })
      .to(fillLight.current, {
        intensity: config.fillIntensity - 0.2,
        duration: 0.2,
      }) */

    // The "Burst" (over-intense for a moment)
    tl.to(fillLight.current, {
      intensity: config.fillIntensity + 0.5,
      duration: 0.1,
      ease: "power4.in",
    })

      // Settling to normal
      .to(fillLight.current, {
        intensity: config.fillIntensity,
        duration: 0.8,
        ease: "power2.out",
      })
      .to(
        keyLight.current,
        {
          intensity: config.keyIntensity,
          duration: 0.8,
          ease: "power2.out",
        },
        "<"
      )
      .addLabel("startProducts", "<")
      .to(
        topLight.current,
        {
          intensity: config.topIntensity,
          duration: 0.8,
          ease: "power2.out",
        },
        "<"
      )
      .to(
        rimLight.current,
        {
          intensity: config.rimIntensity,
          duration: 0.8,
          ease: "power2.out",
        },
        "<"
      )
      .to(
        cursorLight.current,
        {
          intensity: config.cursorLightIntensity,
          duration: 0.8,
          ease: "power2.out",
        },
        "<+2"
      );
  }, [
    preloaderAnimationComplete,
    refs.fillLight,
    refs.topLight,
    refs.rimLight,
    refs.keyLight,
    refs.cursorLight,
  ]);
}
