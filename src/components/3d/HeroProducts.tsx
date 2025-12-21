"use client";

import {
  useRef,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import * as THREE from "three";
import { Float } from "@react-three/drei";
import { Tub } from "./Tub";
import { HeroProductsGUI } from "./HeroProductsGUI";
import { useLoadingStore } from "@/stores/loadingStore";
import { heroProductsConfig } from "@/config/heroProductsConfig";

const config = heroProductsConfig;

const PRODUCTS = [
  {
    slug: "creatine",
    glbUrl: "/products/creatine/product.glb",
    position: [
      config.creatine.startPos.x,
      config.creatine.startPos.y,
      config.creatine.startPos.z,
    ] as [number, number, number],
    rotation: [
      config.creatine.startRotation.x,
      config.creatine.startRotation.y,
      config.creatine.startRotation.z,
    ] as [number, number, number],
    scale: 0.65,
  },
  {
    slug: "pre-workout",
    glbUrl: "/products/pre-workout/product.glb",
    position: [
      config.preWorkout.startPos.x,
      config.preWorkout.startPos.y,
      config.preWorkout.startPos.z,
    ] as [number, number, number],
    rotation: [
      config.preWorkout.startRotation.x,
      config.preWorkout.startRotation.y,
      config.preWorkout.startRotation.z,
    ] as [number, number, number],
    scale: 0.5,
  },
  {
    slug: "whey-isolate",
    glbUrl: "/products/whey-isolate/product.glb",
    position: [
      config.wheyIsolate.startPos.x,
      config.wheyIsolate.startPos.y,
      config.wheyIsolate.startPos.z,
    ] as [number, number, number],
    rotation: [
      config.wheyIsolate.startRotation.x,
      config.wheyIsolate.startRotation.y,
      config.wheyIsolate.startRotation.z,
    ] as [number, number, number],
    scale: 0.9,
  },
] as const;

export interface HeroProductsRef {
  productsGroupRef: React.RefObject<THREE.Group | null>;
}

export const HeroProducts = forwardRef<HeroProductsRef, {}>(
  function HeroProducts(_, ref) {
    const creatineRef = useRef<THREE.Group>(null);
    const preWorkoutRef = useRef<THREE.Group>(null);
    const wheyIsolateRef = useRef<THREE.Group>(null);
    const productsGroupRef = useRef<THREE.Group>(null);

    // Expose ref to parent component
    useImperativeHandle(ref, () => ({
      productsGroupRef,
    }));

    // Track when all refs are ready
    const [refsReady, setRefsReady] = useState(false);
    const preloaderAnimationComplete = useLoadingStore(
      (state) => state.preloaderAnimationComplete
    );

    useEffect(() => {
      const checkAndInitialize = () => {
        if (
          creatineRef.current &&
          preWorkoutRef.current &&
          wheyIsolateRef.current &&
          productsGroupRef.current
        ) {
          setRefsReady(true);
          return true;
        }
        return false;
      };

      // Try immediately
      if (checkAndInitialize()) return;

      // Try with delays if not ready
      const timeout1 = setTimeout(() => {
        if (checkAndInitialize()) return;
      }, 100);
      const timeout2 = setTimeout(() => {
        if (checkAndInitialize()) return;
      }, 500);
      const timeout3 = setTimeout(() => {
        checkAndInitialize();
      }, 1000);

      return () => {
        clearTimeout(timeout1);
        clearTimeout(timeout2);
        clearTimeout(timeout3);
      };
    }, []);

    useGSAP(
      () => {
        if (
          !refsReady ||
          !preloaderAnimationComplete ||
          !creatineRef.current ||
          !preWorkoutRef.current ||
          !wheyIsolateRef.current
        )
          return;

        const tl = gsap.timeline({
          defaults: {
            ease: "pow2.inOut",
            duration: 1.5,
          },
        });

        tl.to(
          wheyIsolateRef.current.position,
          {
            x: config.wheyIsolate.finalPos.x,
            y: config.wheyIsolate.finalPos.y,
            z: config.wheyIsolate.finalPos.z,
          },
          0.25
        )
          .to(
            wheyIsolateRef.current.rotation,
            {
              x: config.wheyIsolate.finalRotation.x,
              y: config.wheyIsolate.finalRotation.y,
              z: config.wheyIsolate.finalRotation.z,
            },
            "<"
          )
          .to(
            preWorkoutRef.current.position,
            {
              x: config.preWorkout.finalPos.x,
              y: config.preWorkout.finalPos.y,
              z: config.preWorkout.finalPos.z,
            },
            "<+0.25"
          )
          .to(
            preWorkoutRef.current.rotation,
            {
              x: config.preWorkout.finalRotation.x,
              y: config.preWorkout.finalRotation.y,
              z: config.preWorkout.finalRotation.z,
            },
            "<"
          )
          .to(
            creatineRef.current.position,
            {
              x: config.creatine.finalPos.x,
              y: config.creatine.finalPos.y,
              z: config.creatine.finalPos.z,
            },
            "<+0.25"
          )
          .to(
            creatineRef.current.rotation,
            {
              x: config.creatine.finalRotation.x,
              y: config.creatine.finalRotation.y,
              z: config.creatine.finalRotation.z,
            },
            "<"
          );
      },
      { dependencies: [refsReady, preloaderAnimationComplete] }
    );

    return (
      <>
        {/* <HeroProductsGUI
        creatineRef={creatineRef}
        preWorkoutRef={preWorkoutRef}
        wheyIsolateRef={wheyIsolateRef}
        productsGroupRef={productsGroupRef}
      /> */}
        <group
          ref={productsGroupRef}
          position={[
            config.group.startPos.x,
            config.group.startPos.y,
            config.group.startPos.z,
          ]}
          rotation={[
            config.group.startRotation.x,
            config.group.startRotation.y,
            config.group.startRotation.z,
          ]}
        >
          {PRODUCTS.map((product) => {
            let ref: React.RefObject<THREE.Group | null> | undefined;
            if (product.slug === "creatine") {
              ref = creatineRef;
            } else if (product.slug === "pre-workout") {
              ref = preWorkoutRef;
            } else if (product.slug === "whey-isolate") {
              ref = wheyIsolateRef;
            }

            return (
              <group
                key={product.slug}
                ref={ref as React.RefObject<THREE.Group>}
                position={product.position}
                rotation={product.rotation}
                scale={product.scale}
              >
                <Float
                  speed={2}
                  rotationIntensity={0.2}
                  floatIntensity={1}
                  floatingRange={[-0.1, 0.1]}
                >
                  <Tub slug={product.slug} glbUrl={product.glbUrl} />
                </Float>
              </group>
            );
          })}
        </group>
      </>
    );
  }
);
