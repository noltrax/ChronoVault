"use client";

import React, { useEffect, useState } from "react";
import Cube from "@/components/Countdown3D/Cube/Cube";
import { motion, scale } from "framer-motion";
import "./CubeLoading.css";

export default function CubeLoading({
  onIntroDone,
  onScaleDone,
  bgColor = "#065f46",
}: {
  onIntroDone?: () => void;
  onScaleDone?: () => void;
  bgColor?: string;
}) {
  const [phase, setPhase] = useState<"intro" | "idle" | "scale" | "done">(
    "intro",
  );

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    const introTimer = setTimeout(() => {
      setPhase("idle");
      onIntroDone?.();

      const idleTimer = setTimeout(() => {
        setPhase("scale");

        const scaleTimer = setTimeout(() => {
          setPhase("done");
          onScaleDone?.();
        }, 1000);

        timers.push(scaleTimer);
      }, 1000);

      timers.push(idleTimer);
    }, 2500);

    timers.push(introTimer);

    return () => timers.forEach((t) => clearTimeout(t));
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <div className="cube-wrapper">
        <motion.div
          className="cube-scale"
          animate={
            phase === "scale"
              ? { scale: 1000, backgroundColor: bgColor, borderRadius: 0 }
              : phase === "done"
                ? { scale: 1000, backgroundColor: bgColor, borderRadius: 0 } // keep scale after done
                : { scale: 2 } // intro/idle
          }
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <div
            className={`cube-ground-rotator ${
              phase === "intro" ? "cube-intro" : "cube-idle"
            }`}
          >
            <Cube style={{ zIndex: 10 }} />
          </div>
        </motion.div>
      </div>

      <div className="reveal-logo-wrapper">
        <motion.img
          src="/logo2.png"
          alt="Website Logo"
          className="reveal-logo"
          initial={{ clipPath: "inset(0 100% 0 0)", opacity: 1 }}
          animate={{
            clipPath: "inset(0 0 0 0)",
            opacity: phase === "scale" ? 0 : 1,
          }}
          transition={{
            clipPath: { duration: 2, ease: "linear" },
            opacity: { duration: 0.6, ease: "easeInOut" },
          }}
        />
      </div>
    </div>
  );
}
