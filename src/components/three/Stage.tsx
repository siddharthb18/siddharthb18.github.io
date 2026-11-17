"use client";

import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";

// The page's one WebGL canvas. Each 3D scene is a drei <View> placed in the DOM and drawn here,
// so the scenes share a single context. It sits behind the page; the boxes holding views are transparent.
export default function Stage() {
  return (
    <Canvas
      eventSource={document.body}
      eventPrefix="client"
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: -1 }}
      aria-hidden="true"
    >
      <View.Port />
    </Canvas>
  );
}
