"use client";

import React, { useRef, useState, useEffect } from "react";

interface DraggableWrapperProps {
  children: React.ReactNode;
  onTranslateX?: (x: number) => void;
  maxDrag?: number;
}

const DraggableWrapper: React.FC<DraggableWrapperProps> = ({
  children,
  onTranslateX,
  maxDrag = 300,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);

  const draggingRef = useRef(false);
  const originXRef = useRef(0);
  const translateXRef = useRef(0);

  const clampX = (x: number) => Math.max(-maxDrag, Math.min(maxDrag, x));

  const handleMouseDown = (e: React.MouseEvent) => {
    draggingRef.current = true;
    originXRef.current = e.clientX - translateXRef.current;
    e.preventDefault();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    draggingRef.current = true;
    originXRef.current = e.touches[0].clientX - translateXRef.current;
  };

  const handleMove = (clientX: number) => {
    if (!draggingRef.current) return;
    let x = clientX - originXRef.current;
    x = clampX(x);
    translateXRef.current = x;
    setTranslateX(x);
    onTranslateX?.(x);
  };

  const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX);
  const handleTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);

  const handleMouseUp = () => (draggingRef.current = false);
  const handleTouchEnd = () => (draggingRef.current = false);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      className=""
      style={{
        position: "fixed",
        left: "50%",
        top: "40%",
        cursor: draggingRef.current ? "grabbing" : "grab",
        transform: `translateX(${translateX}px)`,
        touchAction: "none",
        userSelect: "none",
      }}
    >
      {children}
    </div>
  );
};

export default DraggableWrapper;
