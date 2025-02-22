"use client"

import { useGLTF } from "@react-three/drei"

export function Tub({ slug }) {
  const { nodes, materials } = useGLTF(`/3d/${slug}-tub.glb`)

  useGLTF.preload(`/3d/${slug}-tub.glb`)

  return (
    <group dispose={null}>
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
