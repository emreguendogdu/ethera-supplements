// src/hooks/useModelLoader.tsx
"use client"

import { useState, useEffect } from "react"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js"
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js"

type ModelLoadingState = {
  model: GLTF | null
  progress: number
  error: Error | null
  isLoading: boolean
}

// Singleton loader instance with DRACO support
const getLoader = (() => {
  let loader: GLTFLoader | null = null

  return () => {
    if (!loader) {
      loader = new GLTFLoader()
      const dracoLoader = new DRACOLoader()
      dracoLoader.setDecoderPath("/draco/")
      loader.setDRACOLoader(dracoLoader)
    }
    return loader
  }
})()

// Model cache to prevent reloading
const modelCache: Record<string, GLTF> = {}

export function useModelLoader(modelPath: string) {
  const [state, setState] = useState<ModelLoadingState>({
    model: null,
    progress: 0,
    error: null,
    isLoading: true,
  })

  useEffect(() => {
    // Reset state when model path changes
    setState({
      model: null,
      progress: 0,
      error: null,
      isLoading: true,
    })

    // If already cached, use it immediately
    if (modelCache[modelPath]) {
      setState({
        model: modelCache[modelPath],
        progress: 100,
        error: null,
        isLoading: false,
      })
      return
    }

    // Otherwise load the model
    const loader = getLoader()

    loader.load(
      modelPath,
      (gltf) => {
        // Cache the model for future use
        modelCache[modelPath] = gltf
        setState({
          model: gltf,
          progress: 100,
          error: null,
          isLoading: false,
        })
      },
      (xhr) => {
        if (xhr.lengthComputable) {
          const progress = Math.round((xhr.loaded / xhr.total) * 100)
          setState((prev) => ({ ...prev, progress }))
        }
      },
      (error: unknown) => {
        setState((prev) => ({
          ...prev,
          error: error instanceof Error ? error : new Error(String(error)),
          isLoading: false,
        }))
      }
    )

    // Cleanup function
    return () => {
      // Note: We don't dispose of models to keep them in cache
      // If you need to clear memory, implement a dispose method
    }
  }, [modelPath])

  return state
}
