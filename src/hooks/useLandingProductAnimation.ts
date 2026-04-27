"use client";

import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { RefObject } from "react";
import { MathUtils, Object3D } from "three";
import type { MotionValue } from "motion/react";

interface LandingProductAnimationProps {
  ref: RefObject<Object3D>;
  CFG: Record<string, { position: [number, number, number]; scale: number }>;
  positionKey: string;
  selected: boolean;
  hovered: boolean;
  shouldAnimate?: boolean;
  scrollProgress?: MotionValue<number>;
  spreadPosition?: [number, number, number];
  spreadScale?: number;
  spreadProgressRange?: [number, number];
}

const useLandingProductAnimation = ({
  ref,
  CFG,
  positionKey,
  selected,
  hovered,
  shouldAnimate = true,
  scrollProgress,
  spreadPosition,
  spreadScale,
  spreadProgressRange = [0.4, 0.95],
}: LandingProductAnimationProps) => {
  useFrame((state, delta) => {
    if (!shouldAnimate) return;

    const basePosition = CFG[positionKey].position;
    const baseScale = hovered
      ? CFG[positionKey].scale + 0.05
      : CFG[positionKey].scale;

    const progress = scrollProgress?.get() ?? 0;
    const t =
      spreadPosition && spreadScale != null
        ? MathUtils.smoothstep(
            progress,
            spreadProgressRange[0],
            spreadProgressRange[1]
          )
        : 0;

    const targetPosition: [number, number, number] = spreadPosition
      ? [
          MathUtils.lerp(basePosition[0], spreadPosition[0], t),
          MathUtils.lerp(basePosition[1], spreadPosition[1], t),
          MathUtils.lerp(basePosition[2], spreadPosition[2], t),
        ]
      : [basePosition[0], basePosition[1], basePosition[2]];

    const targetScaleValue =
      spreadScale != null ? MathUtils.lerp(baseScale, spreadScale, t) : baseScale;

    const idleRotationY =
      selected || hovered
        ? Math.sin(state.clock.getElapsedTime()) * 0.125
        : Math.sin(state.clock.getElapsedTime() * 0.75) * 0.0625;
    const targetRotation: [number, number, number] = [
      0,
      MathUtils.lerp(idleRotationY, 0, t),
      0,
    ];

    easing.damp3(ref.current.position, targetPosition, 0.35, delta);
    easing.dampE(ref.current.rotation, targetRotation, 0.25, delta);
    easing.damp3(
      ref.current.scale,
      [targetScaleValue, targetScaleValue, targetScaleValue],
      0.1,
      delta
    );
  });
};

export default useLandingProductAnimation;
