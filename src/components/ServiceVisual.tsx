"use client";
import React, { useRef, useState, useEffect, useSyncExternalStore } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox, MeshDistortMaterial } from '@react-three/drei';
import type * as THREE from 'three';

export type ServiceVisualKind = 'software' | 'ai' | 'cloud' | 'mobile' | 'commerce';

const ACCENT = '#1768D6';
const ACCENT_2 = '#0EBCD4';
const INK = '#0A172F';
const EMERALD = '#00FFB2';

/* ---------- 01 Custom Software: solid core inside a wireframe shell ---------- */
function SoftwareScene() {
  const core = useRef<THREE.Mesh>(null);
  const shell = useRef<THREE.Mesh>(null);

  useFrame((_, dt) => {
    if (core.current) {
      core.current.rotation.x += dt * 0.35;
      core.current.rotation.y += dt * 0.48;
    }
    if (shell.current) {
      shell.current.rotation.y -= dt * 0.2;
      shell.current.rotation.z += dt * 0.15;
    }
  });

  return (
    <Float speed={2.0} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={core}>
        <boxGeometry args={[1.35, 1.35, 1.35]} />
        <meshStandardMaterial color={ACCENT} metalness={0.45} roughness={0.2} />
      </mesh>
      <mesh ref={shell} scale={1.85}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color={ACCENT_2} wireframe transparent opacity={0.4} />
      </mesh>
    </Float>
  );
}

/* ---------- 02 AI & ML: morphing blob orbited by satellite nodes ---------- */
function AiScene() {
  const orbit = useRef<THREE.Group>(null);

  useFrame((_, dt) => {
    if (orbit.current) {
      orbit.current.rotation.y += dt * 0.6;
      orbit.current.rotation.x += dt * 0.22;
    }
  });

  return (
    <>
      <Float speed={1.8} rotationIntensity={0.55} floatIntensity={1.0}>
        <mesh>
          <sphereGeometry args={[1.25, 64, 64]} />
          <MeshDistortMaterial
            color={ACCENT}
            distort={0.45}
            speed={2.8}
            metalness={0.5}
            roughness={0.16}
          />
        </mesh>
      </Float>
      <group ref={orbit}>
        {[
          [2.1, 0, 0],
          [-1.6, 1.1, 0.6],
          [0.5, -1.9, -0.9],
          [-0.8, -0.9, 1.8],
        ].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]}>
            <sphereGeometry args={[0.14, 20, 20]} />
            <meshStandardMaterial color={ACCENT_2} emissive={ACCENT_2} emissiveIntensity={0.6} />
          </mesh>
        ))}
      </group>
    </>
  );
}

/* ---------- 03 Cloud & DevOps: nested rings revolving around a core ---------- */
function CloudScene() {
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);
  const r3 = useRef<THREE.Mesh>(null);

  useFrame((_, dt) => {
    if (r1.current) r1.current.rotation.z += dt * 0.45;
    if (r2.current) r2.current.rotation.z -= dt * 0.6;
    if (r3.current) r3.current.rotation.z += dt * 0.35;
  });

  return (
    <Float speed={1.6} rotationIntensity={0.3} floatIntensity={0.7}>
      <mesh>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial color={INK} metalness={0.65} roughness={0.25} />
      </mesh>
      <mesh ref={r1} rotation={[Math.PI / 2.1, 0, 0]}>
        <torusGeometry args={[1.5, 0.045, 16, 120]} />
        <meshStandardMaterial color={ACCENT} metalness={0.55} roughness={0.2} />
      </mesh>
      <mesh ref={r2} rotation={[Math.PI / 2.6, Math.PI / 3, 0]}>
        <torusGeometry args={[1.9, 0.035, 16, 120]} />
        <meshStandardMaterial color={ACCENT_2} metalness={0.55} roughness={0.2} />
      </mesh>
      <mesh ref={r3} rotation={[Math.PI / 1.7, Math.PI / 5, 0]}>
        <torusGeometry args={[1.15, 0.03, 16, 120]} />
        <meshStandardMaterial color={ACCENT} metalness={0.55} roughness={0.2} />
      </mesh>
    </Float>
  );
}

/* ---------- 04 Mobile Apps: handset turning on its long axis ---------- */
function MobileScene() {
  const phone = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (phone.current) {
      phone.current.rotation.y = Math.sin(clock.elapsedTime * 0.8) * 0.85;
      phone.current.rotation.x = Math.sin(clock.elapsedTime * 0.55) * 0.14;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.85}>
      <group ref={phone}>
        <RoundedBox args={[1.25, 2.4, 0.14]} radius={0.13} smoothness={4}>
          <meshStandardMaterial color={INK} metalness={0.6} roughness={0.25} />
        </RoundedBox>
        <mesh position={[0, 0.05, 0.077]}>
          <planeGeometry args={[1.03, 1.95]} />
          <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={0.4} />
        </mesh>
        {[0.55, 0.2, -0.15].map((y, i) => (
          <mesh key={y} position={[i % 2 ? 0.12 : -0.06, y, 0.079]}>
            <planeGeometry args={[i % 2 ? 0.5 : 0.74, 0.1]} />
            <meshBasicMaterial color={ACCENT_2} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

/* ---------- 05 E-Commerce: interlocking knot ---------- */
function CommerceScene() {
  const knot = useRef<THREE.Mesh>(null);

  useFrame((_, dt) => {
    if (knot.current) {
      knot.current.rotation.x += dt * 0.3;
      knot.current.rotation.y += dt * 0.42;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.35} floatIntensity={0.85}>
      <mesh ref={knot}>
        <torusKnotGeometry args={[0.95, 0.28, 180, 28]} />
        <meshStandardMaterial color={ACCENT_2} metalness={0.6} roughness={0.18} />
      </mesh>
    </Float>
  );
}

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function subscribeReducedMotion(onChange: () => void) {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return () => {};
  }
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  if (!mq) return () => {};
  if (mq.addEventListener) {
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  } else if ((mq as any).addListener) {
    (mq as any).addListener(onChange);
    return () => (mq as any).removeListener(onChange);
  }
  return () => {};
}

const SCENES: Record<ServiceVisualKind, React.ComponentType> = {
  software: SoftwareScene,
  ai: AiScene,
  cloud: CloudScene,
  mobile: MobileScene,
  commerce: CommerceScene,
};

export default function ServiceVisual({ kind }: { kind: ServiceVisualKind }) {
  const holder = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const Scene = SCENES[kind];

  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false
  );

  useEffect(() => {
    const el = holder.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '200px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={holder} className="w-full h-full min-h-[190px]" aria-hidden="true">
      {inView && (
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 5.2], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          frameloop={reduced ? 'demand' : 'always'}
        >
          <ambientLight intensity={1.3} />
          <directionalLight position={[4, 5, 4]} intensity={2.4} />
          <directionalLight position={[-4, -2, -3]} intensity={1.1} color={ACCENT_2} />
          <Scene />
        </Canvas>
      )}
    </div>
  );
}
