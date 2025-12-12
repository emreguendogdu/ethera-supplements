import { useCallback } from "react";

const PRODUCTS_SECTION_ID = "products-section";

export const useScrollToSection = () => {
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  const scrollToProducts = useCallback(() => {
    scrollToSection(PRODUCTS_SECTION_ID);
  }, [scrollToSection]);

  return {
    scrollToProducts,
    scrollToSection,
  };
};








