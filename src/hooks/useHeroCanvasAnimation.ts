import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RefObject, useState, useEffect } from "react";
import { Group } from "three";
import { HeroProductsRef } from "@/components/3d/HeroProducts";
import { heroProductsConfig } from "@/config/heroProductsConfig";

gsap.registerPlugin(ScrollTrigger);

interface UseHeroCanvasAnimationProps {
  inView: boolean;
  statueRef: RefObject<Group | null>;
  heroProductsRef: RefObject<HeroProductsRef | null>;
}

export const useHeroCanvasAnimation = ({
  inView,
  statueRef,
  heroProductsRef,
}: UseHeroCanvasAnimationProps) => {
  const [refsReady, setRefsReady] = useState(false);

  // Poll for refs readiness
  useEffect(() => {
    if (refsReady) return;

    const checkRefs = () => {
      const products = heroProductsRef.current;
      if (
        statueRef.current &&
        products &&
        products.productsGroupRef.current &&
        products.creatineRef.current &&
        products.preWorkoutRef.current &&
        products.wheyIsolateRef.current
      ) {
        return true;
      }
      return false;
    };

    if (checkRefs()) {
      setRefsReady(true);
      return;
    }

    const interval = setInterval(() => {
      if (checkRefs()) {
        setRefsReady(true);
        clearInterval(interval);
      }
    }, 100);

    // Stop checking after 5 seconds to avoid infinite polling
    const timeout = setTimeout(() => clearInterval(interval), 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [refsReady, statueRef, heroProductsRef]);

  useGSAP(
    () => {
      if (
        !inView ||
        !refsReady ||
        !statueRef.current ||
        !heroProductsRef.current
      )
        return;

      const products = heroProductsRef.current;
      if (
        !products.creatineRef.current ||
        !products.preWorkoutRef.current ||
        !products.wheyIsolateRef.current
      )
        return;

      const scrollTl = gsap.timeline({
        defaults: { duration: 2 },
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "center bottom",
          scrub: 1,
        },
      });

      // Statue Animation
      if (heroProductsConfig.statue) {
        scrollTl
          .to(
            statueRef.current.position,
            {
              y: `-=${heroProductsConfig.statue.scrollPosOffset.y * -1}`, // The config has -0.25, logic was -=0.25. If config is -0.25, -= config is correct.
              // Wait, previous code was y: "-=0.25". Config has y: -0.25.
              // So we want y to decrease by 0.25.
              // y: "+=" + config.y would be y - 0.25.
              x: `+=${heroProductsConfig.statue.scrollPosOffset.x}`,
              ease: "none",
            },
            0
          )
          .to(
            statueRef.current.rotation,
            {
              y: `+=${heroProductsConfig.statue.scrollRotationOffset.y}`,
              ease: "none",
            },
            0
          );
      }

      // Products Animation
      // Creatine
      if (
        heroProductsConfig.creatine.scrollPos &&
        heroProductsConfig.creatine.scrollRotation
      ) {
        scrollTl
          .to(
            products.creatineRef.current.position,
            {
              ...heroProductsConfig.creatine.scrollPos,
              ease: "none",
            },
            0
          )
          .to(
            products.creatineRef.current.rotation,
            {
              ...heroProductsConfig.creatine.scrollRotation,
              ease: "none",
            },
            0
          );
      }

      // Pre-Workout
      if (
        heroProductsConfig.preWorkout.scrollPos &&
        heroProductsConfig.preWorkout.scrollRotation
      ) {
        scrollTl
          .to(
            products.preWorkoutRef.current.position,
            {
              ...heroProductsConfig.preWorkout.scrollPos,
              ease: "none",
            },
            0
          )
          .to(
            products.preWorkoutRef.current.rotation,
            {
              ...heroProductsConfig.preWorkout.scrollRotation,
              ease: "none",
            },
            0
          );
      }

      // Whey Isolate
      if (
        heroProductsConfig.wheyIsolate.scrollPos &&
        heroProductsConfig.wheyIsolate.scrollRotation
      ) {
        scrollTl
          .to(
            products.wheyIsolateRef.current.position,
            {
              ...heroProductsConfig.wheyIsolate.scrollPos,
              ease: "none",
            },
            0
          )
          .to(
            products.wheyIsolateRef.current.rotation,
            {
              ...heroProductsConfig.wheyIsolate.scrollRotation,
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

  return { refsReady };
};
