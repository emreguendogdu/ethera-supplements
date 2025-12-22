export type ProductAnimationConfig = {
  startPos: {
    x: number;
    y: number;
    z: number;
  };
  startRotation: {
    x: number;
    y: number;
    z: number;
  };
  finalPos: {
    x: number;
    y: number;
    z: number;
  };
  finalRotation: {
    x: number;
    y: number;
    z: number;
  };
  // Scroll animation target values
  scrollPos?: {
    x: number;
    y: number;
    z: number;
  };
  scrollRotation?: {
    x?: number;
    y?: number;
    z?: number;
  };
};

export type GroupAnimationConfig = ProductAnimationConfig & {
  startScale: number;
  finalScale: number;
};

export type HeroProductsConfig = {
  group: GroupAnimationConfig;
  creatine: ProductAnimationConfig;
  preWorkout: ProductAnimationConfig;
  wheyIsolate: ProductAnimationConfig;
  statue?: {
    scrollPosOffset: { x: number; y: number };
    scrollRotationOffset: { y: number };
  };
};
