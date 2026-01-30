"use client";
import { useState } from "react";
import Countdown from "@/components/Countdown3D/Countdown/Countdown";
import DigitalBackground from "@/components/Digitalbg/Digitalbg";
import DraggableWrapper from "@/components/Countdown3D/DraggableWrapper/DraggableWrapper";
import CubesScene from "@/components/CubesScene/CubesScene";

export default function CountdownClient({
  secondsLeft,
}: {
  secondsLeft: number;
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const handleCountdownComplete = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/getData"); // your API
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black">
        <CubesScene animate={true} />
      </div>
    );
  }

  if (data) {
    return <div>{/* render your data */}</div>;
  }

  return (
    <div className="w-full h-screen flex items-center justify-center relative">
      <DigitalBackground />
      <Countdown
        startSeconds={secondsLeft}
        onComplete={handleCountdownComplete}
      />
    </div>
  );
}
