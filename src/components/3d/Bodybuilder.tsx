import { useLoadingStore } from "@/stores/loadingStore"
import { useGLTF } from "@react-three/drei"
import { useEffect, useRef } from "react"
import { Mesh, MeshStandardMaterial, Scene } from "three"

type GLTFResult = {
  nodes: {
    Object_2: Mesh
  }
  materials: {
    defaultMat: MeshStandardMaterial
  }
  scene: Scene
}

interface BodybuilderProps {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
}

export default function Bodybuilder(props: BodybuilderProps) {
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
