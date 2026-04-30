import { useInView } from "react-intersection-observer";

export const useHeroScrollAnimations = () => {
  const { ref: inViewRef, inView } = useInView({
    threshold: 0,
  });

  return {
    inView,
    setRefs: inViewRef,
  };
};
