"use client";

import { PerspectiveCamera, View } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const N = 22000;
const COMET = 900;

/** Lorenz system, sigma 10, rho 28, beta 8/3, integrated with RK4 at h = 0.005. */
function lorenz() {
  const p = new Float32Array(N * 3);
  let x = 0.1, y = 0, z = 0;
  const s = 10, r = 28, b = 8 / 3, h = 0.005;
  const f = (x: number, y: number, z: number) => [s * (y - x), x * (r - z) - y, x * y - b * z];
  for (let i = -1800; i < N; i++) { // the first 1800 steps settle onto the attractor and are not drawn
    const k1 = f(x, y, z);
    const k2 = f(x + (h / 2) * k1[0], y + (h / 2) * k1[1], z + (h / 2) * k1[2]);
    const k3 = f(x + (h / 2) * k2[0], y + (h / 2) * k2[1], z + (h / 2) * k2[2]);
    const k4 = f(x + h * k3[0], y + h * k3[1], z + h * k3[2]);
    x += (h / 6) * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]);
    y += (h / 6) * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]);
    z += (h / 6) * (k1[2] + 2 * k2[2] + 2 * k3[2] + k4[2]);
    if (i < 0) continue;
    p[i * 3] = x * 0.12;
    p[i * 3 + 1] = (z - 24) * 0.12;
    p[i * 3 + 2] = y * 0.12;
  }
  return p;
}

function Scene({ still }: { still: boolean }) {
  const pos = useMemo(lorenz, []);
  const { trail, comet } = useMemo(() => {
    const attr = new THREE.BufferAttribute(pos, 3);
    const g1 = new THREE.BufferGeometry();
    g1.setAttribute("position", attr);
    const g2 = new THREE.BufferGeometry();
    g2.setAttribute("position", attr);
    return {
      trail: new THREE.Line(g1, new THREE.LineBasicMaterial({ color: "#ececee", transparent: true, opacity: 0.28 })),
      comet: new THREE.Points(g2, new THREE.PointsMaterial({ color: "#6aa8ff", size: 0.045, sizeAttenuation: true })),
    };
  }, [pos]);
  const head = useRef<THREE.Mesh>(null);
  const group = useRef<THREE.Group>(null);
  const t = useRef(still ? N : 0);

  useFrame((state, dt) => {
    if (!still) t.current += Math.min(dt, 0.05) * 4200;
    const drawn = Math.min(N, Math.floor(t.current));
    trail.geometry.setDrawRange(0, drawn);
    const loop = N * 0.7;
    const hi = t.current < N ? Math.max(1, drawn - 1) : Math.floor(N - loop + ((t.current - N) % loop));
    comet.geometry.setDrawRange(Math.max(0, hi - COMET), Math.min(COMET, hi));
    head.current?.position.set(pos[hi * 3], pos[hi * 3 + 1], pos[hi * 3 + 2]);
    const g = group.current;
    if (g && !still) {
      g.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.6 + state.pointer.x * 0.12;
      g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, 0.12 + state.pointer.y * 0.1, 0.03);
    }
  });

  return (
    <group ref={group} rotation={[0.12, 0, 0]}>
      <primitive object={trail} />
      <primitive object={comet} />
      <mesh ref={head}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

export default function Attractor({ still }: { still: boolean }) {
  return (
    <View className="view-fill">
      <PerspectiveCamera makeDefault position={[0, 0, 10.5]} fov={36} />
      <Scene still={still} />
    </View>
  );
}
