import React, { forwardRef } from "react";
import "./Cube.css";

interface CubeProps {
  style?: React.CSSProperties;
}

const Cube = forwardRef<HTMLDivElement, CubeProps>(({ style }, ref) => {
  return (
    <div className="cube" style={style} ref={ref}>
      <div className="face front" />
      <div className="face back" />
      <div className="face right" />
      <div className="face left" />
      <div className="face top" />
      <div className="face bottom" />
    </div>
  );
});

Cube.displayName = "Cube";

export default Cube;
