import { useState, useCallback } from "react";

interface InfoVisibilityState {
  benefits: boolean;
  howToUse: boolean;
  nutritionFacts: boolean;
}

const INITIAL_STATE: InfoVisibilityState = {
  benefits: false,
  howToUse: true,
  nutritionFacts: true,
};

export const useInfoVisibility = () => {
  const [infoVisible, setInfoVisible] =
    useState<InfoVisibilityState>(INITIAL_STATE);

  const toggleInfoVisible = useCallback(
    (section: keyof InfoVisibilityState) => {
      setInfoVisible((prev) => ({ ...prev, [section]: !prev[section] }));
    },
    []
  );

  return {
    infoVisible,
    toggleInfoVisible,
  };
};







