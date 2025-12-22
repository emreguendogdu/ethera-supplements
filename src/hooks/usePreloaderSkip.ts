import { useLayoutEffect, useState } from "react";
import { useLoadingStore } from "@/stores/loadingStore";
import { useScrollContext } from "@/context/ScrollContext";

interface UsePreloaderSkipOptions {
  skipPreloader?: boolean;
}

/**
 * Hook to handle preloader skip logic for admin/dev purposes.
 * Checks server-side environment variable and handles skip state.
 */
export function usePreloaderSkip({
  skipPreloader = false,
}: UsePreloaderSkipOptions = {}) {
  const { setAllowScroll } = useScrollContext();
  const { setPreloaderAnimationComplete, setAllAssetsLoaded } = useLoadingStore(
    (state) => state.actions
  );
  const [shouldSkip, setShouldSkip] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  // Check skip condition after mount (prevents hydration mismatch)
  // Use useLayoutEffect to run synchronously before paint
  useLayoutEffect(() => {
    // Skip if server-side flag is set
    if (skipPreloader) {
      setShouldSkip(true);
      // Immediately set all required states so animations can run
      setPreloaderAnimationComplete();
      setAllAssetsLoaded();
      setAllowScroll(true);
      setIsHidden(true);
    }
  }, [
    skipPreloader,
    setPreloaderAnimationComplete,
    setAllAssetsLoaded,
    setAllowScroll,
  ]);

  return { shouldSkip, isHidden };
}
