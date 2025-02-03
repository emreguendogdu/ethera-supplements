"use client"

import { useGLTF } from "@react-three/drei"

export function AresCase(props) {
  const { nodes, materials } = useGLTF("/3d/case-Ares.glb")

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_0.geometry}
        material={nodes.mesh_0.material}
        position={[0, 0, 0]}
      />
    </group>
  )
}

useGLTF.preload("/3d/case-Ares.glb")
