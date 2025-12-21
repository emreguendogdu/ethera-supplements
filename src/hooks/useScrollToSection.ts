import { useCallback } from "react";
import { useLenis } from "lenis/react";

const PRODUCTS_SECTION_ID = "products-section";

export const useScrollToSection = () => {
  const lenis = useLenis();

  const scrollToSection = useCallback(
    (sectionId: string) => {
      const element = document.getElementById(sectionId);
      if (element && lenis) {
        lenis.scrollTo(element, {
          offset: 0,
          duration: 1.2,
        });
      } else if (element) {
        // Fallback to native smooth scroll if Lenis is not available
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    },
    [lenis]
  );

  const scrollToProducts = useCallback(() => {
    scrollToSection(PRODUCTS_SECTION_ID);
  }, [scrollToSection]);

  return {
    scrollToProducts,
    scrollToSection,
  };
};








