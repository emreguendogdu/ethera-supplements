"use client"

import { OrbitControls } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { Tub } from "@/components/3d/Tub"
import useDeviceSize from "@/hooks/useDeviceSize"

function Environment({ children }) {
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

export default function ProductCanvas({ slug }) {
  const { isMobile } = useDeviceSize()
  return (
    <div
      id="canvas-container"
      className="w-full h-[50vh] md:w-full md:h-[100vh] md:flex-1 md:sticky md:top-0 self-center"
    >
      <Canvas
        camera={{
          position: [0, isMobile ? 0 : -0.25, isMobile ? 3 : 4],
          fov: 50,
        }}
      >
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate={true}
          autoRotateSpeed={0.65}
        />
        <Environment>
          <Tub slug={slug} />
        </Environment>
      </Canvas>
    </div>
  )
}
