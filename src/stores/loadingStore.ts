import { products } from "@/data"
import { create } from "zustand"

const productsSlugs = {
  ...products.reduce(
    (acc, product) => ({
      ...acc,
      [product.slug]: product.slug,
    }),
    {}
  ),
}

/**
 * Define unique IDs for each of your 3D assets.
 * This helps in tracking them individually.
 */
export const ASSET_IDS = {
  bodybuilder: "bodybuilder",
  ...productsSlugs,
} as const

// Create a TypeScript type from the ASSET_IDS values
export type AssetId = (typeof ASSET_IDS)[keyof typeof ASSET_IDS]

// Define the structure of our loading state
interface LoadingState {
  assetsLoaded: Record<AssetId, boolean> // Tracks loaded status for each asset
  totalAssets: number // Total number of assets to load
  allAssetsLoaded: boolean // True if all assets are loaded
  actions: {
    initializeAssets: (assetIds: AssetId[]) => void // Action to set up the store with assets
    setAssetLoaded: (assetId: AssetId) => void // Action to mark an asset as loaded
  }
}

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
        acc[id] = false // Mark each asset as not loaded initially
        return acc
      }, {} as Record<AssetId, boolean>)

      set({
        assetsLoaded: initialAssetsLoaded,
        totalAssets: assetIds.length,
        allAssetsLoaded: false, // Reset allAssetsLoaded status
      })
    },

    /**
     * Marks a specific asset as loaded and updates the overall loading status.
     * @param assetId - The ID of the asset that has finished loading.
     */
    setAssetLoaded: (assetId) => {
      set((state) => {
        // Create a new object for assetsLoaded to ensure reactivity
        const newAssetsLoaded = { ...state.assetsLoaded, [assetId]: true }

        // Count how many assets are currently loaded
        const loadedCount =
          Object.values(newAssetsLoaded).filter(Boolean).length

        // Determine if all assets are loaded
        const allLoaded =
          loadedCount === state.totalAssets && state.totalAssets > 0

        return {
          assetsLoaded: newAssetsLoaded,
          allAssetsLoaded: allLoaded,
        }
      })
    },
  },
}))
