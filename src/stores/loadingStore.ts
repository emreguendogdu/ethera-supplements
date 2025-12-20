import { create } from "zustand";
import { AssetId, LoadingState } from "../types/store";

/**
 * Define unique IDs for each of your 3D assets.
 * This helps in tracking them individually.
 */
export const ASSET_IDS = {
  bodybuilder: "bodybuilder",
  menuStatue: "menuStatue",
} as const;

/**
 * Create the Zustand store for managing global loading state.
 */
export const useLoadingStore = create<LoadingState>((set) => ({
  // Initial state
  assetsLoaded: {} as Record<AssetId, boolean>, // Will be populated by initializeAssets
  totalAssets: 0,
  allAssetsLoaded: false,

  // Actions to modify the state
  actions: {
    /**
     * Initializes the store with a list of asset IDs to track.
     * @param assetIds - An array of unique asset identifiers.
     */
    initializeAssets: (assetIds) => {
      const initialAssetsLoaded = assetIds.reduce((acc, id) => {
        acc[id] = false; // Mark each asset as not loaded initially
        return acc;
      }, {} as Record<AssetId, boolean>);

      set({
        assetsLoaded: initialAssetsLoaded,
        totalAssets: assetIds.length,
        allAssetsLoaded: false, // Reset allAssetsLoaded status
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
  },
}));
