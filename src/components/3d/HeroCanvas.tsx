"use client";

import { Suspense, useRef, useState, useEffect } from "react";
import { Loader, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import Statue from "@/components/3d/Statue";
import { HeroProducts, HeroProductsRef } from "@/components/3d/HeroProducts";
import { HeroLighting } from "@/components/3d/HeroLighting";
import { useParallax } from "@/hooks/useParallax";
import useDeviceSize from "@/hooks/useDeviceSize";
import DisableRender from "../DisableRender";
import * as THREE from "three";
import { cn } from "@/utils/cn";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// creatinePos: x: 5, y:2.2, z:-1.5, preWorkoutPos: x:10,y:1.5,z:-1.25, wheyIsolatePos: x:7, y:2.35, z:-1.25. All of them rotation y: -0.75.

gsap.registerPlugin(ScrollTrigger);

const config = {
  canvasBg: "#0b0c0d",
  metalness: 0.55,
  roughness: 0.75,
  baseEnvironmentPosX: -1.4,
  baseEnvironmentPosY: -4.4,
  baseEnvironmentPosZ: 0.75,
  baseEnvironmentRotationX: 0,
  baseEnvironmentRotationY: 0.5,
  baseEnvironmentRotationZ: 0,
  parallaxSensitivityX: 0 /* 0.25 */,
  parallaxSensitivityY: 0 /* 0.05 */,
  parallaxDamping: 0.05,
};

interface EnvironmentProps {
  isMobile: boolean;
  isInView: boolean;
  pointer?: { x: number; y: number };
  statueRef: React.RefObject<THREE.Group | null>;
  heroProductsRef: React.RefObject<HeroProductsRef | null>;
}

function Environment({
  isMobile,
  pointer: externalPointer,
  statueRef,
  heroProductsRef,
}: EnvironmentProps) {
  const { pointer: threePointer, camera } = useThree();
  const pointer = externalPointer ?? threePointer;
  const groupRef = useRef<THREE.Group>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useParallax({
    groupRef,
    pointer,
    config: {
      sensitivityX: config.parallaxSensitivityX,
      sensitivityY: config.parallaxSensitivityY,
      baseEnvironmentRotationX: config.baseEnvironmentRotationX,
      baseEnvironmentRotationY: config.baseEnvironmentRotationY,
      baseEnvironmentRotationZ: config.baseEnvironmentRotationZ,
      damping: config.parallaxDamping,
    },
  });

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 0, 5]}
        fov={50}
      />
      <color attach="background" args={[config.canvasBg]} />

      <HeroLighting isMobile={isMobile} pointer={pointer} />

      <group
        ref={groupRef}
        position={[
          isMobile
            ? config.baseEnvironmentPosX + 1.25
            : config.baseEnvironmentPosX,
          isMobile
            ? config.baseEnvironmentPosY + 2
            : config.baseEnvironmentPosY,
          config.baseEnvironmentPosZ,
        ]}
        rotation={[1, 2, 5]}
      >
        <Suspense fallback={null}>
          <Statue
            ref={statueRef}
            metalness={config.metalness}
            roughness={config.roughness}
            scale={isMobile ? 0.6 : 1}
          />
          <HeroProducts ref={heroProductsRef} />
        </Suspense>
      </group>
    </>
  );
}

interface HeroCanvasProps {
  inView: boolean;
  wrapperClassName?: string;
  pointer?: { x: number; y: number };
}

export default function HeroCanvas({
  inView,
  wrapperClassName,
  pointer,
}: HeroCanvasProps) {
  const { isMobile } = useDeviceSize();
  const [shouldRender, setShouldRender] = useState(inView);
  const [refsReady, setRefsReady] = useState(false);
  const statueRef = useRef<THREE.Group>(null);
  const heroProductsRef = useRef<HeroProductsRef>(null);

  // Check if refs are ready
  useEffect(() => {
    const checkRefs = () => {
      if (
        statueRef.current &&
        heroProductsRef.current?.productsGroupRef.current &&
        heroProductsRef.current?.creatineRef.current &&
        heroProductsRef.current?.preWorkoutRef.current &&
        heroProductsRef.current?.wheyIsolateRef.current
      ) {
        setRefsReady(true);
        return true;
      }
      return false;
    };

    if (checkRefs()) return;

    // Try checking with delays
    const timeout1 = setTimeout(() => {
      if (checkRefs()) return;
    }, 100);
    const timeout2 = setTimeout(() => {
      if (checkRefs()) return;
    }, 500);
    const timeout3 = setTimeout(() => {
      checkRefs();
    }, 1000);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, [shouldRender]);

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

  // Scroll animation timeline
  useGSAP(
    () => {
      if (
        !inView ||
        !refsReady ||
        !statueRef.current ||
        !heroProductsRef.current?.productsGroupRef.current ||
        !heroProductsRef.current?.creatineRef.current ||
        !heroProductsRef.current?.preWorkoutRef.current ||
        !heroProductsRef.current?.wheyIsolateRef.current
      ) {
        return;
      }

      // Manually add .to animations for each product's rotation.y, no productRefs array

      const scrollTl = gsap.timeline({
        defaults: {
          duration: 2,
        },
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "75% bottom",
          scrub: 1.5,
        },
      });

      // Add animations for Statue
      scrollTl
        .to(
          statueRef.current.position,
          {
            y: "-=0.25",
            x: "+=0.5",
            ease: "none",
          },
          0
        )
        .to(
          statueRef.current.rotation,
          {
            y: "+=0.3",
            ease: "none",
          },
          0
        );

      // creatinePos: x: 5, y:2.2, z:-1.5, preWorkoutPos: x:10,y:1.5,z:-1.25, wheyIsolatePos: x:7, y:2.35, z:-1.25. All of them rotation y: -0.75.
      if (
        heroProductsRef.current.creatineRef.current &&
        heroProductsRef.current.preWorkoutRef.current &&
        heroProductsRef.current.wheyIsolateRef.current
      ) {
        // Creatine position and rotation
        scrollTl.to(
          heroProductsRef.current.creatineRef.current.position,
          {
            x: 5,
            y: 2.7, // 2.2 + 0.25
            z: -1.5,
            ease: "none",
          },
          0
        );
        scrollTl.to(
          heroProductsRef.current.creatineRef.current.rotation,
          {
            y: -0.75,
            ease: "none",
          },
          0
        );

        // Pre-Workout position and rotation
        scrollTl.to(
          heroProductsRef.current.preWorkoutRef.current.position,
          {
            x: 10,
            y: 2, // 1.5 + 0.25
            z: -1.25,
            ease: "none",
          },
          0
        );
        scrollTl.to(
          heroProductsRef.current.preWorkoutRef.current.rotation,
          {
            y: -0.75,
            ease: "none",
          },
          0
        );

        // Whey Isolate position and rotation
        scrollTl.to(
          heroProductsRef.current.wheyIsolateRef.current.position,
          {
            x: 7,
            y: 2.85,
            z: -1.25,
            ease: "none",
          },
          0
        );
        scrollTl.to(
          heroProductsRef.current.wheyIsolateRef.current.rotation,
          {
            y: -0.75,
            ease: "none",
          },
          0
        );
      }

      return () => {
        scrollTl.kill();
      };
    },
    { dependencies: [inView, refsReady] }
  );

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed inset-0 w-full h-svh z-0 pointer-events-none select-none",
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
        <Environment
          isInView={inView}
          isMobile={isMobile}
          pointer={pointer}
          statueRef={statueRef}
          heroProductsRef={heroProductsRef}
        />
      </Canvas>
      <Loader />
    </div>
  );
}
