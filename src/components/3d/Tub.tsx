"use client";

import React from "react";
import { useLoadingStore } from "@/stores/loadingStore";
import { AssetId } from "@/types/store";
import { useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { Mesh, MeshStandardMaterial, BufferGeometry } from "three";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: Mesh;
  };
};

interface TubProps {
  slug: string;
  glbUrl?: string;
}

export function Tub({ slug, glbUrl }: TubProps): React.JSX.Element {
  const url = glbUrl;

  if (!url) {
    return <group dispose={null} />;
  }

  const result = useGLTF(url) as unknown as GLTFResult;
  const { nodes, scene } = result;

  useGLTF.preload(url);

  // Get the action to update the loading store
  const { setAssetLoaded } = useLoadingStore((state) => state.actions);

  // Use a ref to ensure setAssetLoaded is called only once per model instance
  const hasReportedLoadRef = useRef(false);

  useEffect(() => {
    // When the scene object is available (model is loaded) and we haven't reported it yet
    if (scene && !hasReportedLoadRef.current) {
      setAssetLoaded(slug as AssetId);
      hasReportedLoadRef.current = true; // Mark as reported
    }
  }, [scene, slug, setAssetLoaded]); // Dependencies for the effect

  if (!nodes || !nodes.mesh_0) {
    return <group dispose={null} />;
  }

  return (
    <group dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_0.geometry as BufferGeometry}
        material={nodes.mesh_0.material as MeshStandardMaterial}
      />
    </group>
  );
}
