"use client";

import { useEffect } from "react";
import * as THREE from "three";
import { GUI } from "lil-gui";
import { heroProductsConfig } from "@/config/heroProductsConfig";

const config = heroProductsConfig;

interface HeroProductsGUIProps {
  creatineRef: React.RefObject<THREE.Group | null>;
  preWorkoutRef: React.RefObject<THREE.Group | null>;
  wheyIsolateRef: React.RefObject<THREE.Group | null>;
  productsGroupRef: React.RefObject<THREE.Group | null>;
}

export function HeroProductsGUI({
  creatineRef,
  preWorkoutRef,
  wheyIsolateRef,
  productsGroupRef,
}: HeroProductsGUIProps) {
  useEffect(() => {
    const gui = new GUI();
    gui.title("Product Controls");
    // Position on the right side
    gui.domElement.style.position = "fixed";
    gui.domElement.style.top = "10px";
    gui.domElement.style.left = "auto";
    gui.domElement.style.right = "10px";

    let productsGroupControlsCreated = false;

    // Helper function to create controls for the products group
    const createProductsGroupControls = () => {
      if (!productsGroupRef.current || productsGroupControlsCreated) return;
      productsGroupControlsCreated = true;

      // Set the ref to the initial values
      productsGroupRef.current.position.set(
        config.group.startPos.x,
        config.group.startPos.y,
        config.group.startPos.z
      );
      productsGroupRef.current.rotation.set(
        config.group.startRotation.x,
        config.group.startRotation.y,
        config.group.startRotation.z
      );
      productsGroupRef.current.scale.set(
        config.group.startScale,
        config.group.startScale,
        config.group.startScale
      );

      const folder = gui.addFolder("Products Group");

      // Position controls
      const positionFolder = folder.addFolder("Position");
      const positionObj = {
        x: config.group.startPos.x,
        y: config.group.startPos.y,
        z: config.group.startPos.z,
      };

      positionFolder
        .add(positionObj, "x", -5, 5, 0.01)
        .onChange((value: number) => {
          if (productsGroupRef.current)
            productsGroupRef.current.position.x = value;
        });
      positionFolder
        .add(positionObj, "y", -5, 5, 0.01)
        .onChange((value: number) => {
          if (productsGroupRef.current)
            productsGroupRef.current.position.y = value;
        });
      positionFolder
        .add(positionObj, "z", -5, 5, 0.01)
        .onChange((value: number) => {
          if (productsGroupRef.current)
            productsGroupRef.current.position.z = value;
        });

      // Rotation controls
      const rotationFolder = folder.addFolder("Rotation");
      const rotationObj = {
        x: config.group.startRotation.x,
        y: config.group.startRotation.y,
        z: config.group.startRotation.z,
      };

      rotationFolder
        .add(rotationObj, "x", -2, 2, 0.01)
        .onChange((value: number) => {
          if (productsGroupRef.current)
            productsGroupRef.current.rotation.x = value;
        });
      rotationFolder
        .add(rotationObj, "y", -2, 2, 0.01)
        .onChange((value: number) => {
          if (productsGroupRef.current)
            productsGroupRef.current.rotation.y = value;
        });
      rotationFolder
        .add(rotationObj, "z", -2, 2, 0.01)
        .onChange((value: number) => {
          if (productsGroupRef.current)
            productsGroupRef.current.rotation.z = value;
        });

      // Scale controls
      const scaleFolder = folder.addFolder("Scale");
      const scaleObj = {
        x: config.group.startScale,
        y: config.group.startScale,
        z: config.group.startScale,
        uniform: config.group.startScale,
      };

      scaleFolder
        .add(scaleObj, "uniform", 0.1, 3, 0.01)
        .name("Uniform")
        .onChange((value: number) => {
          if (productsGroupRef.current) {
            productsGroupRef.current.scale.set(value, value, value);
            scaleObj.x = value;
            scaleObj.y = value;
            scaleObj.z = value;
          }
        });

      scaleFolder.add(scaleObj, "x", 0.1, 3, 0.01).onChange((value: number) => {
        if (productsGroupRef.current) productsGroupRef.current.scale.x = value;
      });
      scaleFolder.add(scaleObj, "y", 0.1, 3, 0.01).onChange((value: number) => {
        if (productsGroupRef.current) productsGroupRef.current.scale.y = value;
      });
      scaleFolder.add(scaleObj, "z", 0.1, 3, 0.01).onChange((value: number) => {
        if (productsGroupRef.current) productsGroupRef.current.scale.z = value;
      });
    };

    // Helper function to create controls for a product
    const createProductControls = (
      ref: React.RefObject<THREE.Group | null>,
      name: string,
      initialPosition: [number, number, number],
      initialRotation: [number, number, number]
    ) => {
      if (!ref.current) return;

      // Set the ref to the initial values (final values for preWorkout and wheyIsolate)
      ref.current.position.set(
        initialPosition[0],
        initialPosition[1],
        initialPosition[2]
      );
      ref.current.rotation.set(
        initialRotation[0],
        initialRotation[1],
        initialRotation[2]
      );

      const folder = gui.addFolder(name);

      // Position controls - use initial values instead of reading from ref
      const positionFolder = folder.addFolder("Position");
      const positionObj = {
        x: initialPosition[0],
        y: initialPosition[1],
        z: initialPosition[2],
      };

      positionFolder
        .add(positionObj, "x", -15, 15, 0.01)
        .onChange((value: number) => {
          if (ref.current) ref.current.position.x = value;
        });
      positionFolder
        .add(positionObj, "y", -2, 10, 0.01)
        .onChange((value: number) => {
          if (ref.current) ref.current.position.y = value;
        });
      positionFolder
        .add(positionObj, "z", -15, 15, 0.01)
        .onChange((value: number) => {
          if (ref.current) ref.current.position.z = value;
        });

      // Rotation controls - use initial values instead of reading from ref
      const rotationFolder = folder.addFolder("Rotation");
      const rotationObj = {
        x: initialRotation[0],
        y: initialRotation[1],
        z: initialRotation[2],
      };

      rotationFolder
        .add(rotationObj, "x", -2, 2, 0.01)
        .onChange((value: number) => {
          if (ref.current) ref.current.rotation.x = value;
        });
      rotationFolder
        .add(rotationObj, "y", -2, 2, 0.01)
        .onChange((value: number) => {
          if (ref.current) ref.current.rotation.y = value;
        });
      rotationFolder
        .add(rotationObj, "z", -2, 2, 0.01)
        .onChange((value: number) => {
          if (ref.current) ref.current.rotation.z = value;
        });
    };

    // Wait for refs to be ready, check multiple times
    const checkAndSetup = () => {
      if (productsGroupRef.current) {
        createProductsGroupControls();
      }
      if (creatineRef.current) {
        createProductControls(
          creatineRef,
          "Creatine",
          [
            config.creatine.finalPos.x,
            config.creatine.finalPos.y,
            config.creatine.finalPos.z,
          ] as [number, number, number],
          [
            config.creatine.finalRotation.x,
            config.creatine.finalRotation.y,
            config.creatine.finalRotation.z,
          ] as [number, number, number]
        );
      }
      if (preWorkoutRef.current) {
        createProductControls(
          preWorkoutRef,
          "Pre-Workout",
          [
            config.preWorkout.finalPos.x,
            config.preWorkout.finalPos.y,
            config.preWorkout.finalPos.z,
          ] as [number, number, number],
          [
            config.preWorkout.finalRotation.x,
            config.preWorkout.finalRotation.y,
            config.preWorkout.finalRotation.z,
          ] as [number, number, number]
        );
      }
      if (wheyIsolateRef.current) {
        createProductControls(
          wheyIsolateRef,
          "Whey Isolate",
          [
            config.wheyIsolate.finalPos.x,
            config.wheyIsolate.finalPos.y,
            config.wheyIsolate.finalPos.z,
          ] as [number, number, number],
          [
            config.wheyIsolate.finalRotation.x,
            config.wheyIsolate.finalRotation.y,
            config.wheyIsolate.finalRotation.z,
          ] as [number, number, number]
        );
      }
    };

    // Try immediately, then with delays
    checkAndSetup();
    const timeout1 = setTimeout(checkAndSetup, 100);
    const timeout2 = setTimeout(checkAndSetup, 500);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      gui.destroy();
    };
  }, [creatineRef, preWorkoutRef, wheyIsolateRef, productsGroupRef]);

  return null;
}
