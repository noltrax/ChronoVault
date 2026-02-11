"use client";

import { useEffect, useState } from "react";
import Countdown from "@/components/Countdown3D/Countdown/Countdown";
import { motion, AnimatePresence } from "framer-motion";
import DigitalBackground from "@/components/Digitalbg/DigitalBackground";
import CubeLoading from "@/components/Loading/CubeLoading";
import CubeMessageReveal from "@/components/MessageReveal/MessageReveal";
import { Button } from "@/components/ui/button";

interface MessageDemo {
  status: "waiting" | "revealed" | "expired";
  content?: string;
  show_at?: string;
}

export default function CountdownDemoPage() {
  const [messageData, setMessageData] = useState<MessageDemo | null>(null);
  const [loading, setLoading] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [explode, setExplode] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

  // Simulate starting the demo
  const startDemo = () => {
    setLoading(true);
    setIntroDone(false);

    // Simulate CubeLoading intro delay
    setTimeout(() => {
      setIntroDone(true);
      setLoading(false);

      const now = new Date();
      const showAt = new Date(now.getTime() + 5000); // 5 seconds countdown
      setMessageData({
        status: "waiting",
        show_at: showAt.toISOString(),
        content: "🎉 Demo Message Revealed! 🎉",
      });

      const initialSeconds = Math.max(
        Math.floor((showAt.getTime() - Date.now()) / 1000),
        0,
      );
      setSecondsLeft(initialSeconds);
      setExplode(false);
      setRevealed(false);
    }, 1500); // simulate loading intro
  };

  // Automatically reveal message when countdown hits zero
  useEffect(() => {
    if (secondsLeft === 0 && messageData?.status === "waiting") {
      setRevealed(true);
      setMessageData({ ...messageData, status: "revealed" });
    }
  }, [secondsLeft, messageData]);

  // Simulate countdown decrement
  useEffect(() => {
    if (secondsLeft === null || secondsLeft <= 0) return;

    const timer = setTimeout(() => {
      setSecondsLeft(secondsLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [secondsLeft]);

  if (loading || !introDone) {
    return <CubeLoading onIntroDone={() => setIntroDone(true)} />;
  }

  if (!messageData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black p-6 relative">
        <DigitalBackground />
        <Button
          onClick={startDemo}
          className="bg-[rgba(116,212,71,0.85)] hover:bg-[rgba(116,212,71,0.7)] text-black font-semibold"
        >
          Start Countdown Demo
        </Button>
      </div>
    );
  }

  if (
    messageData.status === "waiting" &&
    messageData.show_at &&
    secondsLeft !== null
  ) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center relative">
        <DigitalBackground />
        <Countdown
          startSeconds={secondsLeft}
          cubeSize={20}
          spacing={2}
          startAngle={-10}
          onComplete={() => setExplode(true)}
        />

        <AnimatePresence>
          {explode && !revealed && (
            <motion.div
              key="explode-delay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              onAnimationComplete={() => {
                setRevealed(true);
                setMessageData({ ...messageData, status: "revealed" });
              }}
            />
          )}
        </AnimatePresence>
      </div>
    );
  }

  if (messageData.status === "revealed" || revealed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-950 p-6 relative">
        <DigitalBackground />
        <CubeMessageReveal message={messageData.content || ""} />

        <Button
          onClick={startDemo}
          className="mt-8 bg-[rgba(116,212,71,0.85)] hover:bg-[rgba(116,212,71,0.7)] text-black font-semibold"
        >
          Restart Demo
        </Button>
      </div>
    );
  }

  if (messageData.status === "expired") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-[rgba(116,212,71,0.85)] text-lg">
        This message has expired.
      </div>
    );
  }

  return null;
}
