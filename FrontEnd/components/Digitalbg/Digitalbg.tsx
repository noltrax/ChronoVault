"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useMotionTemplate } from "motion/react";

const CHARSET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>?!@#$%^&*()_+:'[]{},.";

function generateRandomString(len: number) {
  let result = "";
  for (let i = 0; i < len; i++) {
    result += CHARSET[Math.floor(Math.random() * CHARSET.length)];
  }
  return result;
}

export default function DigitalBackground() {
  const [mounted, setMounted] = useState(false);
  const [text, setText] = useState("");

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const lastUpdate = useRef(0);

  // ✅ MUST be declared BEFORE conditional return
  const mask = useMotionTemplate`
    radial-gradient(520px at ${mouseX}px ${mouseY}px, white, transparent 70%)
  `;

  useEffect(() => {
    setMounted(true);
    setText(generateRandomString(7000));

    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastUpdate.current < 60) return;
      lastUpdate.current = now;

      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setText(generateRandomString(7000));
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mounted]);

  // ✅ Safe now
  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-emerald-500/25 via-cyan-500/15 to-transparent"
        style={{ maskImage: mask, WebkitMaskImage: mask }}
      />

      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-pink-500/10 to-transparent mix-blend-screen"
        style={{ maskImage: mask, WebkitMaskImage: mask }}
      />

      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-yellow-400/15 via-orange-500/10 to-red-500/15 mix-blend-overlay"
        animate={{ filter: ["hue-rotate(0deg)", "hue-rotate(360deg)"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{ maskImage: mask, WebkitMaskImage: mask }}
      />

      <motion.div
        className="
    absolute inset-0
    font-mono leading-tight
    whitespace-pre-wrap break-all
    bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500
    bg-clip-text text-transparent
    mix-blend-overlay

    select-none
    pointer-events-none
  "
        style={{
          userSelect: "none",
          WebkitUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      >
        {text}
      </motion.div>
    </div>
  );
}
