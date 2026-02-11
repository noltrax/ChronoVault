"use client";

import { useEffect, useRef } from "react";
import { animate, splitText, stagger } from "animejs";

export default function AnimatedMessage({ message }: { message: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Clear previous content
    ref.current.innerHTML = "";

    // Split message into lines
    const lines = message.split("\n");

    lines.forEach((line, lineIndex) => {
      const lineEl = document.createElement("p");
      lineEl.textContent = line;
      lineEl.className = "inline-block w-full"; // full width so each line stays separate
      ref.current!.appendChild(lineEl);

      // Split line into characters
      const { chars } = splitText(lineEl, { chars: { wrap: "clip" } });

      // Animate chars with stagger, adding delay for line index
      animate(chars, {
        y: [{ to: ["100%", "0%"] }],
        opacity: [0, 1],
        duration: 750,
        delay: stagger(50, { start: lineIndex * 500 }), // stagger lines sequentially
        easing: "easeOutExpo",
        loop: false,
      });
    });
  }, [message]);

  return (
    <div
      ref={ref}
      className="text-[rgba(116,212,71,0.85)] text-center text-lg max-w-xl whitespace-pre-wrap"
    />
  );
}
