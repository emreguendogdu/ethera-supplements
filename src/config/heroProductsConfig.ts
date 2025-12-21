import type { HeroProductsConfig } from "@/types/heroProducts";

// Group configuration
const group = {
  startPos: {
    x: 0.7,
    y: 5,
    z: 8,
  },
  startRotation: {
    x: 0,
    y: -0.325,
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
    z: -1.25,
  },
  startRotation: {
    x: -0.5,
    y: 0.1,
    z: 0.35,
  },
  finalPos: {
    x: 0.75,
    y: 3.03,
    z: 0.6,
  },
  finalRotation: {
    x: 0,
    y: -0.2,
    z: 0,
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
    x: 3.2,
    y: 3.03,
    z: 0.7,
  },
  finalRotation: {
    x: 0,
    y: -0.2,
    z: 0,
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
    x: 1.87,
    y: 3.09,
    z: 0.43,
  },
  finalRotation: {
    x: 0,
    y: -0.2,
    z: 0,
  },
};

// Main config object
export const heroProductsConfig: HeroProductsConfig = {
  group,
  creatine,
  preWorkout,
  wheyIsolate,
};
