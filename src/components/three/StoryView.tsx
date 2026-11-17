"use client";

import { PerspectiveCamera, RoundedBox, View } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import Studio from "./Studio";
import { story } from "./storyState";

const ACCENT = new THREE.Color("#6aa8ff");
const METAL = "#8e8e93";
const USERS = 2000; // 190K+ users, one dot for about 95 people
const W = 1.1, H = 2.2, D = 1.4;
const ss = (a: number, b: number, x: number) => { const t = THREE.MathUtils.clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };

function Scene({ still }: { still: boolean }) {
  const group = useRef<THREE.Group>(null);
  const mono = useRef<THREE.Mesh>(null);
  const boxes = useRef<(THREE.Mesh | null)[]>([]);
  const pulses = useRef<(THREE.Mesh | null)[]>([]);
  const links = useRef<THREE.LineSegments>(null);
  const notify = useRef<THREE.MeshStandardMaterial>(null);
  const { size, camera } = useThree();

  const { dots, to, delay } = useMemo(() => {
    const to = new Float32Array(USERS * 3), delay = new Float32Array(USERS);
    let n = 0, i = 0;
    const total = 5200;
    while (n < USERS && i < total) {
      const y = 1 - (2 * (i + 0.5)) / total, r = Math.sqrt(1 - y * y), th = Math.PI * (3 - Math.sqrt(5)) * i;
      const x = Math.cos(th) * r, z = Math.sin(th) * r;
      i++;
      if (z > 0.15) continue; // keep the shell behind the services
      to.set([x * 4.6 + 0.6, y * 3.1, z * 3.2 - 0.8], n * 3);
      delay[n] = ((n * 7919) % 1000) / 1000 * 0.55; // fixed spread, no randomness
      n++;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(USERS * 3), 3));
    geo.setDrawRange(0, n);
    const dots = new THREE.Points(geo, new THREE.PointsMaterial({ color: "#ececee", size: 0.04, sizeAttenuation: true, transparent: true, opacity: 0.85 }));
    return { dots, to, delay };
  }, []);

  const linkGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(12), 3));
    return g;
  }, []);

  useFrame(({ clock }) => {
    const aspect = size.width / size.height;
    camera.position.z = aspect < 0.8 ? 15 : aspect < 1.25 ? 11 : 9.6; // pull back on taller stages so all three fit
    const p = still ? 1 : story.p;
    const t = clock.getElapsedTime();
    const split = ss(0.2, 0.45, p);
    const kafka = ss(0.38, 0.55, p);
    const users = ss(0.62, 0.95, p);

    const g = group.current;
    if (g) {
      g.rotation.y = THREE.MathUtils.lerp(-0.6, -0.18, split) + (still ? 0 : Math.sin(t * 0.3) * 0.03);
      g.position.y = still ? 0 : Math.sin(t * 0.6) * 0.04;
    }

    // One block until the split starts, then three services moving apart.
    if (mono.current) mono.current.visible = split <= 0.001;
    const gap = THREE.MathUtils.lerp(W, 2.35, split);
    boxes.current.forEach((b, i) => {
      if (!b) return;
      b.visible = split > 0.001;
      b.position.x = (i - 1) * gap;
      b.position.y = Math.sin(split * Math.PI) * (i - 1) * 0.12;
    });

    // Kafka between services: links, and messages moving along them.
    const pos = linkGeo.attributes.position as THREE.BufferAttribute;
    pos.setXYZ(0, -gap + W / 2, 0, 0); pos.setXYZ(1, -W / 2, 0, 0);
    pos.setXYZ(2, W / 2, 0, 0); pos.setXYZ(3, gap - W / 2, 0, 0);
    pos.needsUpdate = true;
    if (links.current) (links.current.material as THREE.LineBasicMaterial).opacity = kafka * 0.7;
    pulses.current.forEach((m, i) => {
      if (!m) return;
      m.visible = kafka > 0.05;
      const f = (t * 0.6 + i * 0.37) % 1;
      const left = i % 2 === 0;
      const a = left ? -gap + W / 2 : W / 2, b = left ? -W / 2 : gap - W / 2;
      m.position.set(a + (b - a) * (i < 2 ? f : 1 - f), 0, 0);
      m.scale.setScalar(kafka);
    });

    // The notifications service lights up and users fan out from it.
    if (notify.current) notify.current.emissive.copy(ACCENT).multiplyScalar(users * 0.5);
    const arr = (dots.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
    for (let i = 0; i < USERS; i++) {
      const e = ss(0, 1, (users - delay[i]) / 0.45);
      const k = i * 3;
      arr[k] = gap + (to[k] - gap) * e;
      arr[k + 1] = to[k + 1] * e + Math.sin(Math.PI * e) * 0.9;
      arr[k + 2] = to[k + 2] * e;
    }
    dots.geometry.attributes.position.needsUpdate = true;
    dots.visible = users > 0.001;
  });

  return (
    <group ref={group}>
      <RoundedBox ref={mono} args={[W * 3, H, D]} radius={0.12} smoothness={5}>
        <meshStandardMaterial color={METAL} metalness={0.9} roughness={0.22} />
      </RoundedBox>
      {[0, 1, 2].map((i) => (
        <RoundedBox key={i} ref={(el: THREE.Mesh | null) => { boxes.current[i] = el; }} args={[W, H, D]} radius={0.12} smoothness={5} visible={false}>
          {i === 2 ? (
            <meshStandardMaterial ref={notify} color={METAL} metalness={0.9} roughness={0.22} emissive="#000000" />
          ) : (
            <meshStandardMaterial color={METAL} metalness={0.9} roughness={0.22} />
          )}
        </RoundedBox>
      ))}
      <lineSegments ref={links} geometry={linkGeo}>
        <lineBasicMaterial color="#6aa8ff" transparent opacity={0} />
      </lineSegments>
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} ref={(el) => { pulses.current[i] = el; }} visible={false}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshBasicMaterial color="#6aa8ff" />
        </mesh>
      ))}
      <primitive object={dots} />
    </group>
  );
}

export default function StoryView({ still }: { still: boolean }) {
  return (
    <View className="view-fill">
      <PerspectiveCamera makeDefault position={[0, 1.1, 9.6]} fov={36} />
      <Studio />
      <Scene still={still} />
    </View>
  );
}
