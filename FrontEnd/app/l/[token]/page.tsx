"use client";

import { useEffect, useState } from "react";
import Countdown from "@/components/Countdown3D/Countdown/Countdown";
import DigitalBackground from "@/components/Digitalbg/DigitalBackground";
import CubeLoading from "@/components/Loading/CubeLoading";
import MessageReveal from "@/components/MessageReveal/MessageReveal";
import axios from "axios";
import { useParams } from "next/navigation";

interface MessageResponse {
  status: "waiting" | "revealed" | "expired" | "not_found";
  content?: string;
  show_at?: string;
}

export default function VaultPage() {
  const { token } = useParams();

  const [messageData, setMessageData] = useState<MessageResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const [countdownDone, setCountdownDone] = useState(false);
  const [cubeDone, setCubeDone] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const [startSeconds, setStartSeconds] = useState<number | null>(null);

  useEffect(() => {
    if (!token) return;

    const fetchMessage = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/messages/link/${token}`,
        );

        const data = res.data.data;

        setMessageData({
          status: data.status,
          show_at: data.show_at,
          content: data.content,
        });

        if (data.status === "revealed") {
          setStartSeconds(10);
        }

        if (data.status === "waiting" && data.show_at) {
          const showTime = new Date(data.show_at).getTime();
          const nowTime = Date.now();

          const seconds = Math.max(Math.floor((showTime - nowTime) / 1000), 0);

          setStartSeconds(seconds);
        }
      } catch {
        setMessageData({ status: "not_found" });
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, [token, cubeDone]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-green-400">
        Loading...
      </div>
    );
  }

  if (!countdownDone && startSeconds !== null) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center relative">
        <DigitalBackground />
        <Countdown
          startSeconds={startSeconds}
          cubeSize={20}
          spacing={2}
          startAngle={-10}
          onComplete={() => {
            setCountdownDone(true);
          }}
        />
      </div>
    );
  }

  if (countdownDone && !revealed) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <DigitalBackground />
        <CubeLoading
          bgColor="#065f46"
          onIntroDone={() => {
            setCubeDone(true);
          }}
          onScaleDone={() => {
            setRevealed(true);
          }}
        />
      </div>
    );
  }

  if (revealed || messageData?.status === "revealed") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#065f46] p-6 relative">
        {messageData?.content && (
          <MessageReveal message={messageData.content} />
        )}
      </div>
    );
  }

  if (messageData?.status === "expired") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-green-400">
        This message has expired.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-green-400">
      Message not found.
    </div>
  );
}
