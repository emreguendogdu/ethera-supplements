// Relaxed type to allow dynamic slugs from Supabase
export type AssetId = string;

// Define the structure of our loading state
export interface LoadingState {
  assetsLoaded: Record<AssetId, boolean>; // Tracks loaded status for each asset
  totalAssets: number; // Total number of assets to load
  allAssetsLoaded: boolean; // True if all assets are loaded
  actions: {
    initializeAssets: (assetIds: AssetId[]) => void; // Action to set up the store with assets
    setAssetLoaded: (assetId: AssetId) => void; // Action to mark an asset as loaded
  };
}
