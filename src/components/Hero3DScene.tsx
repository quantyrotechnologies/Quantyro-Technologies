"use client";
import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, RoundedBox, Cylinder, Torus } from '@react-three/drei';
import * as THREE from 'three';

// --- TECH PALETTE ---
const TECH_DARK = "#1E2A38";
const TECH_BASE = "#D5E3EE";
const TECH_LIGHT = "#F0F6FB";
const NEON_CYAN = "#00F0FF";
const NEON_BLUE = "#1768D6";
const NEON_ORANGE = "#FF5500";
const NEON_GREEN = "#00FF66";

// --- ROTATING QUANTUM CYBER CORE ---
function QuantumReactor({ position }: { position: [number, number, number] }) {
  const outerRingRef = useRef<THREE.Group>(null);
  const midRingRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (outerRingRef.current) outerRingRef.current.rotation.z += delta * 0.8;
    if (midRingRef.current) {
      midRingRef.current.rotation.x += delta * 1.0;
      midRingRef.current.rotation.y += delta * 0.7;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y -= delta * 1.2;
    }
  });

  return (
    <group position={position}>
      <Float speed={2.5} rotationIntensity={0.6} floatIntensity={1.0}>
        <mesh ref={coreRef}>
          <octahedronGeometry args={[0.38, 0]} />
          <meshStandardMaterial
            color={NEON_CYAN}
            emissive={NEON_CYAN}
            emissiveIntensity={1.8}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        <group ref={midRingRef}>
          <Torus args={[0.55, 0.02, 12, 24]}>
            <meshStandardMaterial
              color={NEON_BLUE}
              emissive={NEON_BLUE}
              emissiveIntensity={1.2}
              roughness={0.2}
            />
          </Torus>
        </group>

        <group ref={outerRingRef} rotation={[Math.PI / 4, 0, 0]}>
          <Torus args={[0.78, 0.022, 12, 32]}>
            <meshStandardMaterial
              color={NEON_CYAN}
              emissive={NEON_CYAN}
              emissiveIntensity={1.0}
              transparent
              opacity={0.85}
            />
          </Torus>
          {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
            <mesh
              key={i}
              position={[Math.cos(angle) * 0.78, Math.sin(angle) * 0.78, 0]}
            >
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshBasicMaterial color="#FFFFFF" />
            </mesh>
          ))}
        </group>
      </Float>

      <Cylinder args={[0.45, 0.6, 0.35, 8]} position={[0, -0.65, 0]}>
        <meshStandardMaterial color={TECH_DARK} roughness={0.6} metalness={0.3} />
      </Cylinder>
    </group>
  );
}

// --- HIGH-TECH SERVER BLADE MONOLITH ---
function TechServerTower({
  position,
  height,
  width,
  depth,
  accent = NEON_CYAN,
}: {
  position: [number, number, number];
  height: number;
  width: number;
  depth: number;
  accent?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      const targetScale = hovered ? 1.04 : 1.0;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 6);
    }
  });

  return (
    <group
      ref={meshRef}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      <RoundedBox
        args={[width, height, depth]}
        radius={0.04}
        smoothness={2}
        position={[0, height / 2, 0]}
      >
        <meshStandardMaterial
          color={hovered ? TECH_LIGHT : TECH_BASE}
          roughness={0.7}
          metalness={0.15}
        />
      </RoundedBox>

      {/* Cyber Circuit Inset Panel */}
      <mesh position={[0, height / 2, depth / 2 + 0.01]}>
        <planeGeometry args={[width * 0.75, height * 0.85]} />
        <meshStandardMaterial
          color="#0E1A29"
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>

      {/* LED Status Matrix Columns */}
      <group position={[0, height / 2, depth / 2 + 0.02]}>
        {Array.from({ length: 5 }).map((_, i) => (
          <mesh key={i} position={[0, (i - 2) * (height * 0.15), 0]}>
            <planeGeometry args={[width * 0.5, 0.04]} />
            <meshBasicMaterial
              color={i === 0 ? NEON_GREEN : i === 4 ? NEON_ORANGE : accent}
              transparent
              opacity={0.85}
            />
          </mesh>
        ))}
      </group>

      {/* Rooftop Hologram Emitter / Cap */}
      <mesh position={[0, height + 0.06, 0]}>
        <boxGeometry args={[width * 0.85, 0.12, depth * 0.85]} />
        <meshStandardMaterial
          color={hovered ? accent : TECH_DARK}
          emissive={hovered ? accent : "#000000"}
          emissiveIntensity={hovered ? 0.8 : 0}
        />
      </mesh>
    </group>
  );
}

// --- SCANNING RADAR DISH ---
function HighTechRadar({ position }: { position: [number, number, number] }) {
  const radarRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (radarRef.current) {
      radarRef.current.rotation.y += delta * 1.2;
    }
  });

  return (
    <group position={position}>
      <Cylinder args={[0.07, 0.14, 2.0, 12]} position={[0, 1.0, 0]}>
        <meshStandardMaterial color={TECH_DARK} roughness={0.8} />
      </Cylinder>

      <group ref={radarRef} position={[0, 2.0, 0]}>
        <mesh rotation={[Math.PI / 6, 0, 0]}>
          <cylinderGeometry args={[0.45, 0.1, 0.15, 16, 1, true]} />
          <meshStandardMaterial
            color={TECH_BASE}
            roughness={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh position={[0, 0.15, 0.25]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color={NEON_CYAN} />
        </mesh>
        <mesh
          position={[0, 0.3, 0.7]}
          rotation={[Math.PI / 3, 0, 0]}
        >
          <coneGeometry args={[0.55, 1.0, 12, 1, true]} />
          <meshBasicMaterial
            color={NEON_CYAN}
            transparent
            opacity={0.08}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  );
}

// --- GLOWING LASER DATA STREAM CONDUIT ---
function HighTechDataConduit({
  points,
  color = NEON_CYAN,
  speed = 1.2,
  pulseCount = 2,
}: {
  points: THREE.Vector3[];
  color?: string;
  speed?: number;
  pulseCount?: number;
}) {
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);
  const tubeGeo = useMemo(() => new THREE.TubeGeometry(curve, 48, 0.022, 6, false), [curve]);
  const pulseMeshes = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    pulseMeshes.current.forEach((mesh, index) => {
      if (mesh) {
        const offset = (t * 0.25 + index / pulseCount) % 1;
        const pt = curve.getPointAt(offset);
        mesh.position.copy(pt);
      }
    });
  });

  return (
    <group>
      <mesh geometry={tubeGeo}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          roughness={0.2}
          transparent
          opacity={0.75}
        />
      </mesh>

      {Array.from({ length: pulseCount }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            pulseMeshes.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
      ))}
    </group>
  );
}

// --- FLOATING HOLOGRAPHIC DATA CRYSTALS ---
function FloatingHoloCrystal({
  position,
  color = NEON_CYAN,
  speed = 1.0,
}: {
  position: [number, number, number];
  color?: string;
  speed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.8 * speed;
      meshRef.current.rotation.y += delta * 1.1 * speed;
    }
  });

  return (
    <Float speed={2.0 * speed} rotationIntensity={1.2} floatIntensity={1.2} position={position}>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[0.2, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.1}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[0.34, 0.012, 6, 20]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} />
      </mesh>
    </Float>
  );
}

// --- ISOMETRIC TECH WORLD SCENE ---
function IsometricTechWorld({ scrollOffset = 0 }: { scrollOffset: number }) {
  const { pointer } = useThree();
  const sceneRef = useRef<THREE.Group>(null);

  const conduit1 = useMemo(
    () => [
      new THREE.Vector3(-2.2, 0.3, 1.4),
      new THREE.Vector3(-0.4, 1.2, 1.0),
      new THREE.Vector3(1.6, 1.6, -0.2),
      new THREE.Vector3(3.0, 1.0, 0.8),
    ],
    []
  );

  const conduit2 = useMemo(
    () => [
      new THREE.Vector3(0.2, 0.4, 1.8),
      new THREE.Vector3(1.6, 1.1, 1.2),
      new THREE.Vector3(3.0, 1.0, 0.8),
      new THREE.Vector3(4.2, 2.0, -0.6),
    ],
    []
  );

  const conduit3 = useMemo(
    () => [
      new THREE.Vector3(-3.4, 0.3, 0.4),
      new THREE.Vector3(-2.2, 0.3, 1.4),
      new THREE.Vector3(-0.8, 0.7, -1.2),
      new THREE.Vector3(1.2, 1.1, -1.8),
    ],
    []
  );

  useFrame((_, delta) => {
    if (sceneRef.current) {
      const targetRotY = pointer.x * 0.18 + 0.38;
      const targetRotX = -pointer.y * 0.10 - 0.22;

      sceneRef.current.rotation.y = THREE.MathUtils.lerp(
        sceneRef.current.rotation.y,
        targetRotY,
        delta * 3.5
      );
      sceneRef.current.rotation.x = THREE.MathUtils.lerp(
        sceneRef.current.rotation.x,
        targetRotX,
        delta * 3.5
      );

      const targetY = scrollOffset * -2.2;
      const targetZ = scrollOffset * -1.5;
      sceneRef.current.position.y = THREE.MathUtils.lerp(
        sceneRef.current.position.y,
        targetY,
        delta * 4.0
      );
      sceneRef.current.position.z = THREE.MathUtils.lerp(
        sceneRef.current.position.z,
        targetZ,
        delta * 4.0
      );
    }
  });

  return (
    <group ref={sceneRef} position={[0.2, -1.5, 0]} rotation={[-0.22, 0.38, 0]}>
      {/* High-Tech Isometric Grid Matrix Floor */}
      <gridHelper
        args={[32, 32, NEON_BLUE, "#D0E2EE"]}
        position={[0, -0.06, 0]}
      />

      {/* Quantum Reactor Core */}
      <QuantumReactor position={[1.2, 0.9, -0.2]} />

      {/* High-Tech Server Towers */}
      <TechServerTower position={[3.0, 0, 0.8]} height={2.4} width={1.2} depth={1.0} accent={NEON_CYAN} />
      <TechServerTower position={[-0.6, 0, 1.0]} height={1.8} width={1.0} depth={1.0} accent={NEON_BLUE} />
      <TechServerTower position={[-2.4, 0, 1.4]} height={1.4} width={0.9} depth={0.9} accent={NEON_ORANGE} />
      <TechServerTower position={[0.8, 0, -2.4]} height={3.0} width={1.3} depth={1.1} accent={NEON_CYAN} />
      <TechServerTower position={[3.6, 0, -1.6]} height={2.5} width={1.0} depth={1.0} accent={NEON_BLUE} />
      <TechServerTower position={[-1.2, 0, -2.0]} height={2.0} width={1.1} depth={1.0} accent={NEON_GREEN} />

      {/* Radar Arrays */}
      <HighTechRadar position={[4.5, 0, -0.4]} />
      <HighTechRadar position={[-3.5, 0, -1.2]} />

      {/* Base Server Platforms */}
      <RoundedBox args={[2.6, 0.18, 2.2]} radius={0.06} position={[1.2, 0.08, -0.2]}>
        <meshStandardMaterial color={TECH_DARK} roughness={0.7} />
      </RoundedBox>
      <RoundedBox args={[2.0, 0.14, 1.8]} radius={0.05} position={[-2.4, 0.06, 1.4]}>
        <meshStandardMaterial color={TECH_DARK} roughness={0.7} />
      </RoundedBox>

      {/* Laser Conduits */}
      <HighTechDataConduit points={conduit1} color={NEON_CYAN} speed={1.3} pulseCount={2} />
      <HighTechDataConduit points={conduit2} color={NEON_BLUE} speed={1.1} pulseCount={2} />
      <HighTechDataConduit points={conduit3} color={NEON_ORANGE} speed={0.9} pulseCount={2} />

      {/* Floating Holo Crystals */}
      <FloatingHoloCrystal position={[-0.6, 2.1, 1.0]} color={NEON_CYAN} speed={1.0} />
      <FloatingHoloCrystal position={[3.0, 2.7, 0.8]} color={NEON_BLUE} speed={0.8} />
      <FloatingHoloCrystal position={[-2.4, 1.8, 1.4]} color={NEON_ORANGE} speed={1.2} />
      <FloatingHoloCrystal position={[4.2, 2.4, -0.6]} color={NEON_CYAN} speed={0.7} />
    </group>
  );
}

// --- CONTAINER EXPORT ---
export default function Hero3DScene() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById('hero');
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const heroHeight = rect.height || window.innerHeight;
      const progress = Math.min(Math.max(-rect.top / heroHeight, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="absolute inset-x-0 top-[80px] bottom-0 -z-10 pointer-events-auto overflow-hidden select-none"
      aria-hidden="true"
      style={{
        maskImage: 'radial-gradient(ellipse 100% 90% at 50% 50%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.85) 85%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 100% 90% at 50% 50%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.85) 85%, transparent 100%)',
      }}
    >
      <Canvas
        shadows={false}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{
          position: [0, 1.2, 8.2],
          fov: 44,
          near: 0.1,
          far: 50,
        }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight
          position={[10, 14, 8]}
          intensity={1.5}
          color="#FFFFFF"
        />
        <directionalLight
          position={[-8, 6, -6]}
          intensity={0.6}
          color="#A8D4F5"
        />

        <IsometricTechWorld scrollOffset={scrollProgress} />
      </Canvas>
    </div>
  );
}
