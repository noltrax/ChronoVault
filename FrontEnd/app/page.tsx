"use client";

import { useState } from "react";
import Countdown from "@/components/Countdown3D/Countdown/Countdown";
import { motion, AnimatePresence } from "framer-motion";
import DigitalBackground from "@/components/Digitalbg/Digitalbg";
import { Button } from "@/components/ui/button";

export default function CountdownDemoPage() {
  const [start, setStart] = useState(false);
  const [explode, setExplode] = useState(false);
  const [revealed, setRevealed] = useState(false);

  // Simulate a short countdown for demo
  const demoSeconds = 5; // 5 seconds countdown

  const handleStart = () => {
    setStart(true);
    setExplode(false);
    setRevealed(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black p-6 relative">
      <DigitalBackground />

      {!start && (
        <Button
          onClick={handleStart}
          className="bg-[rgba(116,212,71,0.85)] hover:bg-[rgba(116,212,71,0.7)] text-black font-semibold"
        >
          Start Countdown Demo
        </Button>
      )}

      {start && !revealed && (
        <Countdown
          startSeconds={demoSeconds}
          cubeSize={20}
          spacing={2}
          onComplete={() => setExplode(true)}
        />
      )}

      {/* Trigger reveal after explosion */}
      <AnimatePresence>
        {explode && !revealed && (
          <motion.div
            key="explode-delay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            onAnimationComplete={() => setRevealed(true)}
          />
        )}
      </AnimatePresence>

      {/* Reveal message */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            key="demo-message"
            initial={{ opacity: 0, scale: 0.5, rotateX: -90 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-[rgba(116,212,71,0.85)] text-center text-lg max-w-xl mt-6"
          >
            🎉 Demo Message Revealed! 🎉
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
