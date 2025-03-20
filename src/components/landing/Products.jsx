"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Tub } from "../3d/Tub"
import {
  Html,
  OrbitControls,
  ScrollControls,
  useScroll,
} from "@react-three/drei"
import Button from "../ui/Button"
import { useEffect, useRef, useState } from "react"
import { easing } from "maath"

const Rig = (props) => {
  const ref = useRef()
  const scroll = useScroll()

  useFrame((state, delta) => {
    ref.current.rotation.y = -scroll.offset * (Math.PI / 2)

    console.log(scroll.offset)

    // easing.damp3(
    //   state.camera.position,
    //   [-state.pointer.x * 2, state.pointer.y, 3],
    //   0.3,
    //   delta
    // )
  })

  return <group ref={ref} {...props} />
}

const Items = () => {
  const ref = useRef()
  const [hovered, hover] = useState(false)

  useFrame((state, delta) => {
    easing.damp3(ref.current.scale, hovered ? 0.825 : 0.75, 0.1, delta)
    // easing.damp(
    //   ref.current.rotation.x,
    //   Math.sin(state.clock.getElapsedTime()),
    //   0.1,
    //   delta
    // )
    easing.damp3(
      ref.current.rotation,
      [0, Math.sin(state.clock.getElapsedTime()) * 0.125, 0],
      0.25,
      delta
    )
  })

  const pointerOver = (e) => (e.stopPropagation(), hover(true))
  const pointerOut = () => hover(false)

  // Not working well - not priority
  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto"
    return () => (document.body.style.cursor = "auto")
  }, [hovered])

  return (
    <>
      <group
        position={[0, 0, 0]}
        scale={0.75}
        ref={ref}
        onPointerOver={pointerOver}
        onPointerOut={pointerOut}
        castShadow
        receiveShadow
      >
        <Tub slug={"whey-isolate"} />
      </group>
      <Html center position={[0, -1.25, 0]}>
        <div className="w-[200px] flex flex-col items-center justify-center">
          <h3 className="subheading text-xl tracking-wide w-fit">
            Whey Isolate
          </h3>
          <div>
            <Button href="/products/whey-isolate" className="mt-4 w-fit h-fit">
              Shop now
            </Button>
          </div>
        </div>
      </Html>
      <Tub
        slug={"creatine"}
        position={[2.5, 0, 0]}
        rotation={[0, -0.75, 0]}
        scale={[0.5, 0.5, 0.5]}
        castShadow
        receiveShadow
      />
      <Tub
        slug={"pre-workout"}
        position={[-2.5, 0, 0]}
        rotation={[0, -2.25, 0]}
        scale={[0.5, 0.5, 0.5]}
        castShadow
        receiveShadow
      />
    </>
  )
}

export default function Products() {
  return (
    <>
      <section className="relative w-full">
        {/* Don't forget adding mt-[70vh] to section on production */}
        <div className="absolute inset-0 -z-10 bg-black opacity-80"></div>
        <div className="sticky top-0 py-sectionY-m md:py-sectionY min-h-screen flex flex-col justify-center items-center w-full gap-4 md:gap-4 md:justify-start text-center">
          <div>
            <h2 className="relative [&>span]:inline-block">
              <span className="text-neutral-200 h2 leading-none">
                No fluff.
              </span>
              <br />
              <span className="h1 relative leading-none">Only essentials.</span>
            </h2>
          </div>
          <div className="relative w-full min-h-[65vh]">
            <Canvas camera={{ fov: 50, position: [0, 0, 3] }}>
              <OrbitControls enableZoom={false} />
              <ambientLight intensity={1.25} />
              <directionalLight position={[2, 2, 0]} intensity={0.5} />
              <directionalLight position={[-2, 2, 0]} intensity={0.5} />
              <ScrollControls pages={3} infinite>
                <Rig>
                  <Items />
                </Rig>
              </ScrollControls>
            </Canvas>
          </div>
        </div>
      </section>
    </>
  )
}
