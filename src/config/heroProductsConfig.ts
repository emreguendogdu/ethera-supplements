import type { HeroProductsConfig } from "@/types/heroProducts";

const finalRotationX = -0.15,
  finalRotationY = -0.5,
  finalRotationZ = -0.075,
  finalPosX = 1.25,
  finalPosY = 2.75,
  finalPosZ = -1.25,
  scrollRotationY = -0.35;

const group = {
  startPos: {
    x: 0,
    y: 0,
    z: 0,
  },
  startRotation: {
    x: 0,
    y: 0,
    z: 0,
  },
  startScale: 1,
  finalPos: {
    x: 0,
    y: 0,
    z: 0,
  },
  finalRotation: {
    x: 0,
    y: 0,
    z: 0,
  },
  finalScale: 1,
};

const creatine = {
  startPos: {
    x: -5,
    y: 5,
    z: 8,
  },
  startRotation: {
    x: -0.3,
    y: 0.1,
    z: 0.35,
  },
  finalPos: {
    x: finalPosX,
    y: finalPosY,
    z: finalPosZ,
  },
  finalRotation: {
    x: finalRotationX,
    y: finalRotationY,
    z: finalRotationZ,
  },
  scrollPos: {
    x: 0,
    y: 3,
    z: -1.5,
  },
  scrollRotation: {
    y: scrollRotationY,
  },
};

const wheyIsolate = {
  startPos: {
    x: 1.4,
    y: 5,
    z: 8,
  },
  startRotation: {
    x: -0.5,
    y: 0.1,
    z: 0.35,
  },
  finalPos: {
    x: finalPosX + 1.2,
    y: finalPosY,
    z: finalPosZ,
  },
  finalRotation: {
    x: finalRotationX,
    y: finalRotationY,
    z: finalRotationZ,
  },
  scrollPos: {
    x: 2,
    y: 3.5,
    z: -1.25,
  },
  scrollRotation: {
    y: scrollRotationY,
  },
};

const preWorkout = {
  startPos: {
    x: 2.1,
    y: 5,
    z: 8,
  },
  startRotation: {
    x: -0.5,
    y: 0.1,
    z: 0.35,
  },
  finalPos: {
    x: finalPosX + 2.43,
    y: finalPosY - 0.25,
    z: finalPosZ,
  },
  finalRotation: {
    x: finalRotationX,
    y: finalRotationY,
    z: finalRotationZ,
  },
  scrollPos: {
    x: 4,
    y: 3,
    z: -1.25,
  },
  scrollRotation: {
    y: scrollRotationY,
  },
};

const statue = {
  scrollPosOffset: { x: 0.5, y: -0.25 },
  scrollRotationOffset: { y: 0.3 },
};

export const heroProductsConfig: HeroProductsConfig = {
  group,
  creatine,
  preWorkout,
  wheyIsolate,
  statue,
};
