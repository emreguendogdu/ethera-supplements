import { useInView } from "react-intersection-observer";

const INVIEW_THRESHOLD = 0.25;

export const useHeroScrollAnimations = () => {
  const { ref: inViewRef, inView } = useInView({
    threshold: INVIEW_THRESHOLD,
  });

  return {
    inView,
    setRefs: inViewRef,
  };
};
