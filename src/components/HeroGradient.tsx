"use client";
import React, { useRef, useState, useSyncExternalStore } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    // Plane is sized [2,2] so writing position straight to clip space makes it
    // cover the viewport exactly, independent of the camera.
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const FRAGMENT = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2  uMouse;
  uniform vec2  uRes;
  varying vec2  vUv;

  // Ashima 3D simplex noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  // Three octaves is enough for soft blobs and keeps the per-pixel cost low.
  float fbm(vec3 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 3; i++) {
      v += a * snoise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    float aspect = uRes.x / max(uRes.y, 1.0);
    vec2 p = vec2(vUv.x * aspect, vUv.y);

    float t = uTime * 0.05;
    vec2  m = uMouse * 0.10;

    // Domain warping is what gives the blobs their slow, liquid drift.
    float w1 = fbm(vec3(p * 1.5 + m, t));
    float w2 = fbm(vec3(p * 1.9 - m, t + 11.0));
    vec2 warped = p + 0.4 * vec2(w1, w2);
    float n = fbm(vec3(warped * 1.3, t * 1.2));

    vec3 blue = vec3(0.0902, 0.4078, 0.8392); // --accent  #1768D6
    vec3 cyan = vec3(0.0549, 0.7373, 0.8314); // --accent-2 #0EBCD4

    vec3 col = mix(blue, cyan, clamp(w2 * 0.5 + 0.5, 0.0, 1.0));

    float body = smoothstep(0.00, 0.75, n) * 0.55;
    float halo = smoothstep(-0.25, 0.65, w1) * 0.35;
    float alpha = (body + halo) * 0.62;

    // Keep the left column clear so the headline never fights the gradient.
    alpha *= smoothstep(0.02, 0.60, vUv.x);
    // Soften the outer edges so the canvas never shows a hard seam.
    alpha *= smoothstep(0.0, 0.16, vUv.y) * smoothstep(1.0, 0.86, vUv.y);
    alpha *= smoothstep(1.0, 0.92, vUv.x);

    gl_FragColor = vec4(col, clamp(alpha, 0.0, 1.0));
  }
`;

function GradientPlane({ animate }: { animate: boolean }) {
  const { size } = useThree();

  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Built once so three keeps the same uniform objects across renders; the
  // per-frame writes below go through the material ref, never this value.
  const [initialUniforms] = useState(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uRes: { value: new THREE.Vector2(1, 1) },
  }));

  useFrame((state, dt) => {
    const mat = materialRef.current;
    if (!mat) return;
    if (animate) mat.uniforms.uTime.value += dt;
    mat.uniforms.uRes.value.set(size.width, size.height);
    mat.uniforms.uMouse.value.lerp(state.pointer, 0.03);
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={initialUniforms}
        vertexShader={VERTEX}
        fragmentShader={FRAGMENT}
        transparent
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
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

export default function HeroGradient() {
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false
  );

  return (
    <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        camera={{ position: [0, 0, 1] }}
      >
        <GradientPlane animate={!reduced} />
      </Canvas>
    </div>
  );
}
