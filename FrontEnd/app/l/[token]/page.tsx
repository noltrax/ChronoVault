"use client";

import { useEffect, useState } from "react";
import Countdown from "@/components/Countdown3D/Countdown/Countdown";
import { motion, AnimatePresence } from "framer-motion";
import DigitalBackground from "@/components/Digitalbg/Digitalbg";

interface MessageResponse {
  status: "locked" | "revealed" | "expired" | "not_found";
  content?: string;
  server_now?: string;
  show_at?: string;
  expires_at?: string;
}

interface VaultPageProps {
  token: string;
}

export default function VaultPage({ token }: VaultPageProps) {
  const [messageData, setMessageData] = useState<MessageResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const [explode, setExplode] = useState(false);

  useEffect(() => {
    const fetchMessage = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/messages/${token}`);
        if (!res.ok) throw new Error("Not found");
        const data: MessageResponse = await res.json();
        setMessageData(data);
        if (data.status === "revealed") setRevealed(true);
      } catch (e) {
        setMessageData({ status: "not_found" });
      } finally {
        setLoading(false);
      }
    };
    fetchMessage();
  }, [token]);

  if (loading || !messageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-[rgba(116,212,71,0.85)]">
        Loading…
      </div>
    );
  }

  if (messageData.status === "locked" && messageData.show_at) {
    const showTime = new Date(messageData.show_at).getTime();
    const nowTime = new Date(messageData.server_now || Date.now()).getTime();
    const secondsLeft = Math.max(Math.floor((showTime - nowTime) / 1000), 0);

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-[rgba(116,212,71,0.85)] to-black p-6 relative">
        <DigitalBackground />
        <Countdown
          startSeconds={secondsLeft}
          cubeSize={20}
          spacing={2}
          onComplete={() => setExplode(true)}
        />

        {/* After explosion, reveal message */}
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
      </div>
    );
  }

  if (messageData.status === "revealed" || revealed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-[rgba(116,212,71,0.85)] to-black p-6 relative">
        <DigitalBackground />
        <AnimatePresence>
          {revealed && (
            <motion.div
              key="revealed-message"
              initial={{ opacity: 0, scale: 0.5, rotateX: -90 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-[rgba(116,212,71,0.85)] text-center text-lg max-w-xl"
            >
              {messageData.content}
            </motion.div>
          )}
        </AnimatePresence>
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-[rgba(116,212,71,0.85)] text-lg">
      Message not found.
    </div>
  );
}
