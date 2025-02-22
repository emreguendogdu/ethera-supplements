import { useGLTF } from "@react-three/drei"
import { useRef } from "react"

export default function Bodybuilder(props) {
  const { nodes, materials } = useGLTF("/3d/bodybuilder_base_mesh1k.glb")
  const meshRef = useRef()

  // materials.defaultMat.color = new THREE.Color(0x888888) // Grayish color, can be adjusted to suit
  materials.defaultMat.metalness = 0.95 // Full metallic effect
  materials.defaultMat.roughness = 0.44 // Slightly rough, adjust for shininess
  materials.envMapIntensity = 1.5
  materials.castShadow = true
  materials.receiveShadow = true

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_2.geometry}
        material={materials.defaultMat}
        ref={meshRef}
      />
    </group>
  )
}

// useGLTF.preload("/3d/bodybuilder_base_mesh1k.glb")
