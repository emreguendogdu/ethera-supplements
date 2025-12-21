import { create } from "zustand";
import { AssetId, LoadingState } from "../types/store";

/**
 * Define unique IDs for each of your 3D assets.
 * This helps in tracking them individually.
 */
export const ASSET_IDS = {
  statue: "statue",
} as const;

/**
 * Create the Zustand store for managing global loading state.
 */
export const useLoadingStore = create<LoadingState>((set) => ({
  // Initial state
  assetsLoaded: {} as Record<AssetId, boolean>, // Will be populated by initializeAssets
  totalAssets: 0,
  allAssetsLoaded: false,
  preloaderAnimationComplete: false,

  // Actions to modify the state
  actions: {
    /**
     * Initializes the store with a list of asset IDs to track.
     * @param assetIds - An array of unique asset identifiers.
     */
    initializeAssets: (assetIds) => {
      set((state) => {
        const initialAssetsLoaded = assetIds.reduce((acc, id) => {
          acc[id] = false; // Mark each asset as not loaded initially
          return acc;
        }, {} as Record<AssetId, boolean>);

        // If preloader was already completed (e.g., skipped), mark all assets as loaded
        const shouldMarkAsLoaded = state.preloaderAnimationComplete;
        const finalAssetsLoaded = shouldMarkAsLoaded
          ? assetIds.reduce((acc, id) => {
              acc[id] = true;
              return acc;
            }, {} as Record<AssetId, boolean>)
          : initialAssetsLoaded;

        return {
          assetsLoaded: finalAssetsLoaded,
          totalAssets: assetIds.length,
          allAssetsLoaded: shouldMarkAsLoaded ? true : false,
          // Don't reset preloaderAnimationComplete if it's already true (e.g., when skipped)
          preloaderAnimationComplete: state.preloaderAnimationComplete,
        };
      });
    },

    /**
     * Marks a specific asset as loaded and updates the overall loading status.
     * @param assetId - The ID of the asset that has finished loading.
     */
    setAssetLoaded: (assetId) => {
      set((state) => {
        // Create a new object for assetsLoaded to ensure reactivity
        const newAssetsLoaded = { ...state.assetsLoaded, [assetId]: true };

        // Count how many assets are currently loaded
        const loadedCount =
          Object.values(newAssetsLoaded).filter(Boolean).length;

        // Determine if all assets are loaded
        const allLoaded =
          loadedCount === state.totalAssets && state.totalAssets > 0;

        return {
          assetsLoaded: newAssetsLoaded,
          allAssetsLoaded: allLoaded,
        };
      });
    },

    /**
     * Marks the preloader animation as complete.
     */
    setPreloaderAnimationComplete: () => {
      set({ preloaderAnimationComplete: true });
    },

    /**
     * Manually sets all assets as loaded (useful for skipping preloader in development).
     */
    setAllAssetsLoaded: () => {
      set((state) => {
        // Mark all tracked assets as loaded
        const allAssetsLoaded = Object.keys(state.assetsLoaded).reduce(
          (acc, id) => {
            acc[id] = true;
            return acc;
          },
          {} as Record<AssetId, boolean>
        );

        return {
          assetsLoaded: allAssetsLoaded,
          allAssetsLoaded: true,
        };
      });
    },
  },
}));
