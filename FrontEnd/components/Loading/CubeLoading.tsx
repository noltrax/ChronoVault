"use client";

import React, { useEffect, useState } from "react";
import Cube from "@/components/Countdown3D/Cube/Cube";
import { motion } from "framer-motion";
import "./CubeLoading.css";

export default function CubeLoading({
  onIntroDone,
  bgColor = "#065f46", // default to your revealed message background (bg-emerald-950)
}: {
  onIntroDone?: () => void;
  bgColor?: string;
}) {
  const [phase, setPhase] = useState<"intro" | "idle" | "scale">("intro");

  useEffect(() => {
    // 1️⃣ Intro phase
    const introTimer = setTimeout(() => {
      setPhase("idle");

      // 2️⃣ Idle phase for 1s
      const idleTimer = setTimeout(() => {
        // 3️⃣ Start scale phase
        setPhase("scale");
      }, 1000);

      return () => clearTimeout(idleTimer);
    }, 2500);

    return () => clearTimeout(introTimer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <div className="cube-wrapper">
        <motion.div
          className="cube-scale"
          animate={
            phase === "scale"
              ? {
                  scale: 1000, // scale up to fill the screen
                  backgroundColor: bgColor,
                  borderRadius: 0,
                }
              : { scale: 2 }
          }
          transition={{ duration: 1, ease: "easeInOut" }}
          onAnimationComplete={() => {
            if (phase === "scale") onIntroDone?.();
          }}
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
