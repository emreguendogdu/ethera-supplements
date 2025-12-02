import { useRef } from "react";
import { useScroll, useTransform, MotionValue } from "motion/react";
import { useInView } from "react-intersection-observer";

const OPACITY_RANGE: [number, number] = [0, 0.25];
const OPACITY_OUTPUT: [number, number] = [1, 0];
const SCALE_RANGE: [number, number] = [0, 0.25];
const SCALE_OUTPUT: [number, number] = [1, 0.5];
const Y_RANGE: [number, number] = [0, 0.25];
const Y_OUTPUT: [number, number] = [0, -125];
const INVIEW_THRESHOLD = 0.25;

export const useHeroScrollAnimations = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView } = useInView({
    threshold: INVIEW_THRESHOLD,
  });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end 80%"],
  });

  const contentDivOpacity = useTransform(
    scrollYProgress,
    OPACITY_RANGE,
    OPACITY_OUTPUT
  ) as MotionValue<number>;
  const contentDivScale = useTransform(
    scrollYProgress,
    SCALE_RANGE,
    SCALE_OUTPUT
  ) as MotionValue<number>;
  const contentDivY = useTransform(
    scrollYProgress,
    Y_RANGE,
    Y_OUTPUT
  ) as MotionValue<number>;

  const setRefs = (node: HTMLElement | null) => {
    heroRef.current = node;
    inViewRef(node);
  };

  return {
    heroRef,
    scrollYProgress,
    inView,
    contentDivOpacity,
    contentDivScale,
    contentDivY,
    setRefs,
  };
};
