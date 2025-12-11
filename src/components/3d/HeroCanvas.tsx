"use client";

import { Suspense } from "react";
import { Loader, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Bodybuilder from "@/components/3d/Bodybuilder";
import { MenuStatueLoader } from "@/components/3d/MenuStatue";
import useDeviceSize from "@/hooks/useDeviceSize";
import useHeroEnvironmentAnimation, {
  CONFIG,
} from "@/hooks/useHeroEnvironmentAnimation";
import { MotionValue } from "motion/react";
import DisableRender from "../DisableRender";

interface EnvironmentProps {
  scrollYProgress: MotionValue<number>;
  isInView: boolean;
  isMobile: boolean;
}

function Environment({
  scrollYProgress,
  isInView,
  isMobile,
}: EnvironmentProps) {
  const { pulsingLightRef, movingLightRef, modelPosition, modelRotation } =
    useHeroEnvironmentAnimation({
      scrollYProgress,
      isInView,
      isMobile,
    });
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 3, 0]} />
      <ambientLight intensity={CONFIG.lights.ambient.intensity} />
      <directionalLight
        position={CONFIG.lights.pulsing.position}
        intensity={CONFIG.lights.pulsing.baseIntensity}
        ref={pulsingLightRef}
        castShadow
      />
      <directionalLight
        position={CONFIG.lights.moving.position}
        intensity={CONFIG.lights.moving.intensity}
        ref={movingLightRef}
        castShadow
      />
      <Suspense fallback={null}>
        <MenuStatueLoader />
        <Bodybuilder
          position={modelPosition}
          rotation={modelRotation}
          scale={isMobile ? 0.65 : 1}
        />
      </Suspense>
    </>
  );
}

interface HeroCanvasProps {
  scrollYProgress: MotionValue<number>;
  inView: boolean;
}

export default function HeroCanvas({
  scrollYProgress,
  inView,
}: HeroCanvasProps) {
  const { isMobile } = useDeviceSize();

  return (
    <div id="canvas-container" className="fixed top-0 h-screen w-full -z-20">
      <Canvas>
        {!inView && <DisableRender />}
        <Environment
          scrollYProgress={scrollYProgress}
          isInView={inView}
          isMobile={isMobile}
        />
      </Canvas>
      <Loader />
    </div>
  );
}
