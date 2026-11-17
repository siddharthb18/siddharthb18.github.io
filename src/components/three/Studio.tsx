"use client";

import { Environment, Lightformer } from "@react-three/drei";

/** Soft studio lighting from procedural light panels (no HDR file to download). */
export default function Studio() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 6, 6]} intensity={0.9} />
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={2.6} position={[0, 6, -4]} rotation-x={Math.PI / 2.4} scale={[14, 5, 1]} />
        <Lightformer form="rect" intensity={1.4} position={[-7, 1.5, 1]} rotation-y={Math.PI / 2} scale={[9, 2.2, 1]} />
        <Lightformer form="rect" intensity={1.4} position={[7, 1.5, 1]} rotation-y={-Math.PI / 2} scale={[9, 2.2, 1]} />
      </Environment>
    </>
  );
}
