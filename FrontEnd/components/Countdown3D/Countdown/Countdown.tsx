"use client";

import { useEffect, useState } from "react";
import Digit from "@/components/Countdown3D/Digit/Digit";
import "./Countdown.css";

interface CountdownProps {
  startSeconds?: number; // optional for testing/demo
  targetDate?: string | Date; // optional if using startSeconds
  onComplete?: () => void;
  translateX?: number;
  startAngle?: number;
  cubeSize?: number;
  spacing?: number;
  digitSpacing?: number;
  maxTranslate?: number;
}

interface TimeParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// --------- Helpers ---------
const getTimeParts = (target: Date): TimeParts | null => {
  const now = Date.now();
  const diff = target.getTime() - now;
  if (diff <= 0) return null;

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
};

const formatDigits = (time: TimeParts): (number | "colon")[] => {
  const pad = (n: number) => [Math.floor(n / 10), n % 10];
  const digits: (number | "colon")[] = [];

  if (time.days > 0) digits.push(...pad(time.days), "colon");
  digits.push(
    ...pad(time.hours),
    "colon",
    ...pad(time.minutes),
    "colon",
    ...pad(time.seconds),
  );

  return digits;
};

// --------- Component ---------
const Countdown: React.FC<CountdownProps> = ({
  startSeconds,
  targetDate,
  onComplete,
  translateX = 0,
  startAngle = 0,
  cubeSize = 20,
  spacing = 2,
  digitSpacing,
  maxTranslate = 300,
}) => {
  const target = targetDate ? new Date(targetDate) : null;

  const [time, setTime] = useState<TimeParts | null>(() => {
    if (startSeconds != null) {
      let s = startSeconds;
      const days = Math.floor(s / 86400);
      s %= 86400;
      const hours = Math.floor(s / 3600);
      s %= 3600;
      const minutes = Math.floor(s / 60);
      const seconds = s % 60;
      return { days, hours, minutes, seconds };
    }
    return target ? getTimeParts(target) : null;
  });

  const [explode, setExplode] = useState(false);

  useEffect(() => {
    if (!time) return;

    const interval = setInterval(() => {
      if (startSeconds != null) {
        setTime((prev) => {
          if (!prev) return null;
          let totalSeconds =
            prev.days * 86400 +
            prev.hours * 3600 +
            prev.minutes * 60 +
            prev.seconds -
            1;

          if (totalSeconds < 0) {
            clearInterval(interval);
            // Trigger explosion
            setExplode(true);
            // Call onComplete after a short delay so cubes can animate
            setTimeout(() => onComplete?.(), 1000);
            return null;
          }

          const days = Math.floor(totalSeconds / 86400);
          totalSeconds %= 86400;
          const hours = Math.floor(totalSeconds / 3600);
          totalSeconds %= 3600;
          const minutes = Math.floor(totalSeconds / 60);
          const seconds = totalSeconds % 60;

          return { days, hours, minutes, seconds };
        });
      } else if (target) {
        const t = getTimeParts(target);
        if (!t) {
          clearInterval(interval);
          setExplode(true);
          setTimeout(() => onComplete?.(), 1000);
          return;
        }
        setTime(t);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startSeconds, target, onComplete]);

  // If countdown ended, digits array is empty, but we still want to show cubes exploding
  const digits = time ? formatDigits(time) : explode ? Array(8).fill(0) : [];
  const digitSpacingFinal = digitSpacing ?? cubeSize * 3 + 10;
  const totalWidth = digits.length * digitSpacingFinal;
  const rotateY =
    Math.max(-30, Math.min(30, (translateX / maxTranslate) * 30)) + startAngle;

  return (
    <div className="countdown-wrapper">
      <div
        className="countdown"
        style={{ transform: `translateX(-${totalWidth / 2}px)` }}
      >
        {digits.map((d, i) => (
          <Digit
            key={i}
            value={d}
            cubeSize={cubeSize}
            spacing={spacing}
            offsetX={i * digitSpacingFinal}
            rotateY={rotateY}
            explode={explode} // trigger explosion here
          />
        ))}
      </div>
    </div>
  );
};

export default Countdown;
