"use client";

import {
  useContext,
  useEffect,
  useState,
  createContext,
  ReactNode,
  useMemo,
  useCallback,
} from "react";
import { ReactLenis, useLenis } from "lenis/react";

interface ScrollContextType {
  allowScroll: boolean;
  setAllowScroll: (allow: boolean) => void;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

interface ScrollProviderProps {
  children: ReactNode;
}

export const ScrollProvider = ({ children }: ScrollProviderProps) => {
  const [allowScroll, setAllowScroll] = useState(true);
  const lenis = useLenis(() => {});

  const setAllowScrollMemoized = useCallback((allow: boolean) => {
    setAllowScroll(allow);
  }, []);

  const contextValue = useMemo(
    () => ({
      allowScroll,
      setAllowScroll: setAllowScrollMemoized,
    }),
    [allowScroll, setAllowScrollMemoized]
  );

  useEffect(() => {
    if (lenis) {
      if (allowScroll) {
        lenis.start();
      } else {
        lenis.stop();
      }
    }
  }, [allowScroll, lenis]);

  return (
    <ScrollContext.Provider value={contextValue}>
      <ReactLenis root>{children}</ReactLenis>
    </ScrollContext.Provider>
  );
};

export const useScrollContext = () => {
  const context = useContext(ScrollContext);
  if (context === undefined) {
    return {
      allowScroll: true,
      setAllowScroll: () => {},
    };
  }
  return context;
};
