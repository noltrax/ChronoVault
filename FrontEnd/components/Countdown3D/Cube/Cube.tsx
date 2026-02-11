import React, { forwardRef } from "react";
import "./Cube.css";

interface CubeProps {
  style?: React.CSSProperties; // applies to root cube
  faceStyle?: React.CSSProperties; // applies to all faces
}

const Cube = forwardRef<HTMLDivElement, CubeProps>(
  ({ style, faceStyle }, ref) => {
    return (
      <div className="cube" style={style} ref={ref}>
        <div className="face front" style={faceStyle} />
        <div className="face back" style={faceStyle} />
        <div className="face right" style={faceStyle} />
        <div className="face left" style={faceStyle} />
        <div className="face top" style={faceStyle} />
        <div className="face bottom" style={faceStyle} />
      </div>
    );
  },
);

Cube.displayName = "Cube";

export default Cube;
