import type { HeroProductsConfig } from "@/types/heroProducts";

const finalRotationX = -0.15,
  finalRotationY = -0.5,
  finalRotationZ = -0.075,
  finalPosX = 1.25,
  finalPosY = 2.75,
  finalPosZ = -1.25;

// Group configuration
const group = {
  /* startPos: {
    x: 0.7,
    y: 5,
    z: 8,
  }, */
  startPos: {
    x: 0,
    y: 0,
    z: 0,
  },
  /* startRotation: {
    x: 0,
    y: -0.325,
    z: 0,
  }, */
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

// Creatine configuration
const creatine = {
  startPos: {
    x: 0,
    y: 8,
    z: -1.6,
  },
  startRotation: {
    x: -0.5,
    y: 0.1,
    z: 0.35,
  },
  finalPos: {
    x: finalPosX,
    y: finalPosY,
    z: finalPosZ /* 0.6 */,
  },
  finalRotation: {
    x: finalRotationX,
    y: finalRotationY,
    z: finalRotationZ,
  },
};

// Whey Isolate configuration
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
    x: finalPosX + 1.12,
    y: finalPosY,
    z: finalPosZ /* 0.43 */,
  },
  finalRotation: {
    x: finalRotationX,
    y: finalRotationY,
    z: finalRotationZ,
  },
};

// Pre-Workout configuration
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
    x: finalPosX + 2.35,
    y: finalPosY - 0.25,
    z: finalPosZ /* 0.7 */,
  },
  finalRotation: {
    x: finalRotationX,
    y: finalRotationY,
    z: finalRotationZ,
  },
};

// Main config object
export const heroProductsConfig: HeroProductsConfig = {
  group,
  creatine,
  preWorkout,
  wheyIsolate,
};
