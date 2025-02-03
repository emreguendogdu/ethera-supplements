"use client"

import { OrbitControls } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { AresCase } from "@/components/3d/products/AresCase"

function Environment({ children }) {
  const lightRef = useRef()
  useFrame(({ clock }) => {
    if (lightRef.current) {
      isMovingForward
        ? (lightRef.current.position.x += 0.05)
        : (lightRef.current.position.x -= 0.05)

      lightRef.current.position.x >= 8
        ? setIsMovingForward(false)
        : lightRef.current.position.x <= -15 && setIsMovingForward(true)

      // console.log(lightRef.current.position.x)
    }
  })
  return (
    <>
      <group className="relative -translate-y-1/2">
        <directionalLight position={[0, 0, 5]} />
        <directionalLight position={[0, 0, -5]} />
        <directionalLight position={[0, 6, 0]} />
        <directionalLight position={[5, 0, 0]} />
        <directionalLight position={[-5, 0, 0]} />
        {children}
        <ambientLight intensity={0.5} />
      </group>
    </>
  )
}

export default function ProductCanvas() {
  // controls.minPolarAngle = Math.PI / 2
  // controls.maxPolarAngle = Math.PI / 2
  return (
    <div id="canvas-container" className="w-full h-full">
      <Canvas camera={{ position: [0, -0.25, 4], fov: 50 }}>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
        <Environment>
          <AresCase />
        </Environment>
      </Canvas>
    </div>
  )
}
