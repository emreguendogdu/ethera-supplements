"use client";

import { Canvas } from "@react-three/fiber";
import { Backdrop, ContactShadows, Environment, Html } from "@react-three/drei";
import { useInView } from "react-intersection-observer";
import Items from "./Products";
import DisableRender from "../DisableRender";

export default function ProductsSection() {
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.03125,
  });

  return (
    <section className="w-full h-screen md:h-[100vh]">
      <div id="canvas-container" className="w-full h-full" ref={inViewRef}>
        <Canvas camera={{ fov: 50, position: [0, 0, 3] }} className="z-20">
          {!inView && <DisableRender />}
          <Html
            center
            position={[0, 0.95, 0]}
            className="w-full relative"
            wrapperClass="w-full relative"
          >
            <header className="relative w-full flex flex-col gap-2 items-center justify-center">
              <p className="subheading">Zero Noise — Just Results.</p>
              <h2 className="uppercase">Only 3 Products.</h2>
            </header>
          </Html>
          <ambientLight intensity={0.35} />
          <directionalLight position={[0, -0.5, 0]} intensity={0.5} />
          <directionalLight position={[-1.7, -0.5, -0.9]} intensity={0.75} />
          <directionalLight position={[1.7, -0.5, 0.9]} intensity={0.75} />
          <Items isSectionInView={inView} />
          <Backdrop
            castShadow
            receiveShadow
            floor={4}
            position={[0, -1, -2.2125]}
            scale={[50, 10, 4]}
          >
            <meshStandardMaterial color="#000000" />
          </Backdrop>
          <ContactShadows
            position={[0, -0.8, 0]}
            scale={10}
            blur={8}
            far={2}
            color="#ffffff"
          />

          <Environment preset="city" environmentIntensity={0.5} />
        </Canvas>
      </div>
    </section>
  );
}
