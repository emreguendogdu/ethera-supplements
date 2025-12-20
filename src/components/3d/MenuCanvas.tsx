"use client";

import { Suspense, useRef, useState, useEffect } from "react";
import { Loader, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import MenuStatue from "@/components/3d/MenuStatue";
import useDeviceSize from "@/hooks/useDeviceSize";
import DisableRender from "../DisableRender";
import * as THREE from "three";
import { cn } from "@/utils/cn";

const config = {
  canvasBg: "#000000",
  metalness: 0.55,
  roughness: 0.75,
  baseCamPosX: -1.5,
  baseCamPosY: -4,
  baseCamPosZ: 0.75,
  baseRotationX: 0,
  baseRotationY: 0.5,
  baseRotationZ: 0,
  ambientIntensity: 0.05,
  keyIntensity: 0.1,
  keyPosX: 5,
  keyPosY: 5,
  keyPosZ: 5,
  fillIntensity: 0.3,
  fillPosX: -5,
  fillPosY: 2.5,
  fillPosZ: -2.5,
  rimIntensity: 0.5,
  rimPosX: -7.5,
  rimPosY: 5,
  rimPosZ: -10,
  topIntensity: 0.15,
  topPosX: 0,
  topPosY: 15,
  topPosZ: 0,
  cursorLightEnabled: true,
  cursorLightIntensity: 4,
  cursorLightColor: 0xffffff,
  cursorLightDistance: 3,
  cursorLightDecay: 2,
  cursorLightPosZ: 0.5,
  cursorLightSmoothness: 0.1, // Adjusted for R3F frame delta
  cursorLightScale: 1, // Adjusted for scene scale
  parallaxSensitivityX: 0.25,
  parallaxSensitivityY: 0.05,
};

interface EnvironmentProps {
  isMobile: boolean;
  isInView: boolean;
  pointer?: { x: number; y: number };
}

function Environment({ isMobile, pointer: externalPointer }: EnvironmentProps) {
  const { pointer: threePointer } = useThree();
  // Use external pointer if provided, otherwise fall back to Three.js pointer
  const pointer = externalPointer ?? threePointer;
  const groupRef = useRef<THREE.Group>(null);
  const cursorLightRef = useRef<THREE.PointLight>(null);

  // Smooth values
  const currentRotationX = useRef(0);
  const currentRotationY = useRef(0);
  const cursorLightCurrentX = useRef(0);
  const cursorLightCurrentY = useRef(0);

  useFrame(() => {
    // Parallax
    const targetRotationY = pointer.x * config.parallaxSensitivityX;
    const targetRotationX = -pointer.y * config.parallaxSensitivityY;

    // Smooth damping (lerp)
    currentRotationX.current +=
      (targetRotationX - currentRotationX.current) * 0.05;
    currentRotationY.current +=
      (targetRotationY - currentRotationY.current) * 0.05;

    if (groupRef.current) {
      groupRef.current.rotation.x =
        config.baseRotationX + currentRotationX.current;
      groupRef.current.rotation.y =
        config.baseRotationY + currentRotationY.current;
      groupRef.current.rotation.z = config.baseRotationZ;
    }

    // Cursor Light
    const targetLightX = pointer.x * config.cursorLightScale;
    const targetLightY = pointer.y * config.cursorLightScale;

    cursorLightCurrentX.current +=
      (targetLightX - cursorLightCurrentX.current) *
      config.cursorLightSmoothness;
    cursorLightCurrentY.current +=
      (targetLightY - cursorLightCurrentY.current) *
      config.cursorLightSmoothness;

    if (cursorLightRef.current) {
      cursorLightRef.current.position.x = cursorLightCurrentX.current;
      cursorLightRef.current.position.y = cursorLightCurrentY.current;
    }
  });

  // Responsive camera position adjustment
  const camPosX = isMobile ? 0 : config.baseCamPosX;

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />

      <color attach="background" args={[config.canvasBg]} />

      <ambientLight intensity={config.ambientIntensity} />

      <directionalLight
        position={[config.keyPosX, config.keyPosY, config.keyPosZ]}
        intensity={config.keyIntensity}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-bias={-0.00005}
        shadow-normalBias={0.05}
      />

      <directionalLight
        position={[config.fillPosX, config.fillPosY, config.fillPosZ]}
        intensity={config.fillIntensity}
      />

      <directionalLight
        position={[config.rimPosX, config.rimPosY, config.rimPosZ]}
        intensity={config.rimIntensity}
      />

      <directionalLight
        position={[config.topPosX, config.topPosY, config.topPosZ]}
        intensity={config.topIntensity}
      />

      {config.cursorLightEnabled && (
        <pointLight
          ref={cursorLightRef}
          color={config.cursorLightColor}
          intensity={
            isMobile
              ? config.cursorLightIntensity / 8
              : config.cursorLightIntensity
          }
          distance={config.cursorLightDistance}
          decay={config.cursorLightDecay}
          position={[0, 0, config.cursorLightPosZ]}
        />
      )}

      <group
        ref={groupRef}
        position={[
          camPosX,
          isMobile ? config.baseCamPosY + 1.5 : config.baseCamPosY,
          config.baseCamPosZ,
        ]}
      >
        <Suspense fallback={null}>
          <MenuStatue
            metalness={config.metalness}
            roughness={config.roughness}
            scale={isMobile ? 0.6 : 1}
          />
        </Suspense>
      </group>
    </>
  );
}

interface MenuCanvasProps {
  inView: boolean;
  wrapperClassName?: string;
  pointer?: { x: number; y: number };
}

export default function MenuCanvas({
  inView,
  wrapperClassName,
  pointer,
}: MenuCanvasProps) {
  const { isMobile } = useDeviceSize();
  const [shouldRender, setShouldRender] = useState(inView);

  useEffect(() => {
    if (inView) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      className={cn(
        "absolute inset-0 w-full h-full z-0 pointer-events-none select-none",
        inView
          ? "opacity-100"
          : "opacity-0 select-none pointer-events-none -z-10",
        wrapperClassName
      )}
    >
      <Canvas
        shadows
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        dpr={[1, 2]} // Min 1, Max 2 like snippet
      >
        {!inView && <DisableRender />}
        <Environment isInView={inView} isMobile={isMobile} pointer={pointer} />
      </Canvas>
      <Loader />
    </div>
  );
}
