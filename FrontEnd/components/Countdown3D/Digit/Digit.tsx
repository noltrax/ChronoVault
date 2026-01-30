"use client";

import React from "react";
import Cube from "../Cube/Cube";
import { DIGITS } from "@/utils/Countdown3d/digitMaps";
import "./Digit.css";

interface DigitProps {
  value: number | "colon";
  offsetX?: number;
  offsetY?: number;
  cubeSize?: number;
  spacing?: number;
  rotateY?: number;
  explode?: boolean; // added explode prop
}

const Digit: React.FC<DigitProps> = ({
  value,
  offsetX = 0,
  offsetY = 0,
  cubeSize = 20,
  spacing = 2,
  rotateY = 0,
  explode = false,
}) => {
  const map = DIGITS[value] || DIGITS[0];

  return (
    <div className="digit" style={{ position: "relative" }}>
      {map.map((row, y) =>
        row.map((cell, x) => {
          if (!cell) return null;
          const flatIndex = y * row.length + x;

          // Random explosion values
          const randomX = (Math.random() - 0.5) * 2500; // bigger X range
          const randomY = (Math.random() - 0.5) * 2500; // bigger Y range
          const randomZ = (Math.random() - 0.5) * 2500; // bigger Z range
          const randomRot = Math.random() * 720; // more rotation

          return (
            <Cube
              key={`${x}-${y}`}
              style={{
                width: cubeSize,
                height: cubeSize,
                transform: explode
                  ? `translate3d(${x * (cubeSize + spacing) + offsetX + randomX}px, ${
                      y * (cubeSize + spacing) + offsetY + randomY
                    }px, ${randomZ}px) rotateX(${randomRot}deg) rotateY(${randomRot}deg)`
                  : `translate3d(${x * (cubeSize + spacing) + offsetX}px, ${
                      y * (cubeSize + spacing) + offsetY
                    }px, 0px) rotateX(-30deg) rotateY(${rotateY}deg)`,
                transition: explode ? `all 1s ease-out` : "transform 0.5s ease",
                zIndex: 1000 - flatIndex,
                position: "absolute",
              }}
            />
          );
        }),
      )}
    </div>
  );
};

export default Digit;
