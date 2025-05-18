import { useLoadingStore } from "@/stores/loadingStore"
import { useGLTF } from "@react-three/drei"
import { useEffect, useRef } from "react"
import { Mesh, MeshStandardMaterial } from "three"
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader"

type GLTFResult = GLTF & {
  nodes: {
    Object_2: Mesh
  }
  materials: {
    defaultMat: MeshStandardMaterial
  }
}

export default function Bodybuilder(props: {
  ref: React.RefObject<Mesh>
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
}) {
  const { nodes, materials, scene } = useGLTF(
    "/3d/bodybuilder_base_mesh1k.glb"
  ) as unknown as GLTFResult
  const meshRef = useRef<Mesh>(null)

  materials.defaultMat.metalness = 0.95
  materials.defaultMat.roughness = 0.44 // Slightly rough, adjust for shininess
  materials.defaultMat.envMapIntensity = 1.5

  // Get the action to update the loading store
  const { setAssetLoaded } = useLoadingStore((state) => state.actions)

  // Use a ref to ensure setAssetLoaded is called only once per model instance
  const hasReportedLoadRef = useRef(false)

  useEffect(() => {
    // When the scene object is available (model is loaded) and we haven't reported it yet
    if (scene && !hasReportedLoadRef.current) {
      setAssetLoaded("bodybuilder")
      hasReportedLoadRef.current = true // Mark as reported
    }
  }, [scene, setAssetLoaded]) // Dependencies for the effect

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

useGLTF.preload("/3d/bodybuilder_base_mesh1k.glb")
