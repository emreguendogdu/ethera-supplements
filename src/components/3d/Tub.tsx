"use client"

import React from "react"
import { AssetId, useLoadingStore } from "@/stores/loadingStore"
import { useGLTF } from "@react-three/drei"
import { useEffect, useRef } from "react"
import { Mesh, MeshStandardMaterial, BufferGeometry } from "three"
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js"

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: Mesh
  }
}

interface TubProps {
  slug: string
}

export function Tub({ slug }: TubProps): React.JSX.Element {
  const result = useGLTF(`/3d/${slug}-tub.glb`)
  const { nodes, scene } = result as unknown as GLTFResult

  useGLTF.preload(`/3d/${slug}-tub.glb`)

  // Get the action to update the loading store
  const { setAssetLoaded } = useLoadingStore((state) => state.actions)

  // Use a ref to ensure setAssetLoaded is called only once per model instance
  const hasReportedLoadRef = useRef(false)

  useEffect(() => {
    // When the scene object is available (model is loaded) and we haven't reported it yet
    if (scene && !hasReportedLoadRef.current) {
      setAssetLoaded(slug as AssetId)
      hasReportedLoadRef.current = true // Mark as reported
    }
  }, [scene, slug, setAssetLoaded]) // Dependencies for the effect

  return (
    <group dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_0.geometry as BufferGeometry}
        material={nodes.mesh_0.material as MeshStandardMaterial}
      />
    </group>
  )
}
