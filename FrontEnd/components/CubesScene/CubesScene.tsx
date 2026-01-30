"use client";
import React, { useRef, useEffect } from "react";
import Cube from "@/components/Countdown3D/Cube/Cube";

interface CubesSceneProps {
  animate?: boolean;
}

export default function CubesScene({ animate = false }: CubesSceneProps) {
  const cubesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!animate) return;
    let animationFrame: number;

    const animateCubes = () => {
      cubesRef.current.forEach((cube, i) => {
        if (!cube) return;
        const angle = performance.now() / 1000 + i;
        cube.style.transform = `rotateX(${angle}rad) rotateY(${angle}rad) translateY(${
          Math.sin(angle) * 20
        }px)`;
      });
      animationFrame = requestAnimationFrame(animateCubes);
    };

    animationFrame = requestAnimationFrame(animateCubes);
    return () => cancelAnimationFrame(animationFrame);
  }, [animate]);

  return (
    <>
      {[...Array(20)].map((_, i) => (
        <Cube
          key={i}
          ref={(el) => {
            if (el) cubesRef.current[i] = el!;
          }}
        />
      ))}
    </>
  );
}
