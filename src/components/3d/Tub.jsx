"use client"

import { useGLTF } from "@react-three/drei"

export function Tub(props) {
  const { slug } = props
  const { nodes, materials } = useGLTF(`/3d/${slug}-tub.glb`)

  useGLTF.preload(`/3d/${slug}-tub.glb`)

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_0.geometry}
        material={nodes.mesh_0.material}
      />
    </group>
  )
}
