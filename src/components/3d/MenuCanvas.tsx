"use client";

import { Suspense, useRef } from "react";
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
  baseZoom: 1,
  baseCamPosX: -1,
  baseCamPosY: -4,
  baseCamPosZ: 1,
  baseRotationX: 0,
  baseRotationY: 0.5,
  baseRotationZ: 0,
  ambientIntensity: 0.2,
  keyIntensity: 0.5,
  keyPosX: 5,
  keyPosY: 5,
  keyPosZ: 5,
  fillIntensity: 1.5,
  fillPosX: -5,
  fillPosY: 2.5,
  fillPosZ: -2.5,
  rimIntensity: 2.5,
  rimPosX: -7.5,
  rimPosY: 5,
  rimPosZ: -10,
  topIntensity: 0.5,
  topPosX: 0,
  topPosY: 15,
  topPosZ: 0,
  cursorLightEnabled: true,
  cursorLightIntensity: 2.5,
  cursorLightColor: 0xffffff,
  cursorLightDistance: 4,
  cursorLightDecay: 2,
  cursorLightPosZ: 0.5,
  cursorLightSmoothness: 0.1, // Adjusted for R3F frame delta
  cursorLightScale: 5, // Adjusted for scene scale
  parallaxSensitivityX: 0.25,
  parallaxSensitivityY: 0.05,
};

interface EnvironmentProps {
  isMobile: boolean;
  isInView: boolean;
}

function Environment({ isMobile, isInView }: EnvironmentProps) {
  const { pointer, viewport } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const cursorLightRef = useRef<THREE.PointLight>(null);

  // Smooth values
  const currentRotationX = useRef(0);
  const currentRotationY = useRef(0);
  const cursorLightCurrentX = useRef(0);
  const cursorLightCurrentY = useRef(0);

  useFrame((state, delta) => {
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
          intensity={config.cursorLightIntensity}
          distance={config.cursorLightDistance}
          decay={config.cursorLightDecay}
          position={[0, 0, config.cursorLightPosZ]}
        />
      )}

      <group
        ref={groupRef}
        position={[
          camPosX,
          isMobile ? config.baseCamPosY + 0.5 : config.baseCamPosY,
          config.baseCamPosZ,
        ]}
      >
        <Suspense fallback={null}>
          <MenuStatue
            metalness={config.metalness}
            roughness={config.roughness}
            scale={isMobile ? 0.8 : 1}
          />
        </Suspense>
      </group>
    </>
  );
}

interface MenuCanvasProps {
  inView: boolean;
}

export default function MenuCanvas({ inView }: MenuCanvasProps) {
  const { isMobile } = useDeviceSize();

  return (
    <div
      className={cn(
        "absolute inset-0 w-full h-full z-998",
        inView
          ? "opacity-100"
          : "opacity-0 select-none pointer-events-none -z-10"
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
        <Environment isInView={inView} isMobile={isMobile} />
      </Canvas>
      <Loader />
    </div>
  );
}
