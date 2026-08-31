// src/design/scene/NeuralField.jsx
import React, { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ------------------------------------------------------------------ *
 *  Palette — kept in sync with tailwind.config.js
 * ------------------------------------------------------------------ */
const SIGNAL = new THREE.Color("#00ff9d");
const CYBER = new THREE.Color("#00e5ff");

/* ------------------------------------------------------------------ *
 *  Drifting particle field
 * ------------------------------------------------------------------ */
function ParticleField({ count = 1400, reduced }) {
  const pointsRef = useRef(null);

  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const c = new THREE.Color();

    for (let i = 0; i < count; i++) {
      // Distribute in a flattened shell so the camera sits inside the cloud.
      const r = 6 + Math.random() * 16;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.cos(phi) * 0.55;
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

      c.copy(Math.random() > 0.62 ? CYBER : SIGNAL);
      c.multiplyScalar(0.45 + Math.random() * 0.55);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      sizes[i] = 0.02 + Math.random() * 0.07;
    }

    return { positions, colors, sizes };
  }, [count]);

  useFrame((state) => {
    if (reduced || !pointsRef.current) return;
    const t = state.clock.elapsedTime;
    pointsRef.current.rotation.y = t * 0.028;
    pointsRef.current.rotation.x = Math.sin(t * 0.12) * 0.06;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={0.06}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ *
 *  Central wireframe core
 * ------------------------------------------------------------------ */
function Core({ reduced }) {
  const outer = useRef(null);
  const inner = useRef(null);

  useFrame((state) => {
    if (reduced) return;
    const t = state.clock.elapsedTime;
    if (outer.current) {
      outer.current.rotation.y = t * 0.16;
      outer.current.rotation.x = t * 0.09;
    }
    if (inner.current) {
      inner.current.rotation.y = -t * 0.24;
      inner.current.rotation.z = t * 0.13;
      const s = 1 + Math.sin(t * 1.1) * 0.035;
      inner.current.scale.setScalar(s);
    }
  });

  return (
    // Pushed right and well back so it frames the layout instead of sitting
    // behind the headline, where the wireframe competed with the text.
    <group position={[4.2, 0.4, -7]} scale={0.9}>
      <mesh ref={outer}>
        <icosahedronGeometry args={[3.1, 1]} />
        <meshBasicMaterial
          color={SIGNAL}
          wireframe
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={inner}>
        <icosahedronGeometry args={[1.85, 0]} />
        <meshBasicMaterial
          color={CYBER}
          wireframe
          transparent
          opacity={0.22}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ *
 *  Perspective grid floor
 * ------------------------------------------------------------------ */
function GridFloor({ reduced }) {
  const ref = useRef(null);

  const grid = useMemo(() => {
    const g = new THREE.GridHelper(70, 46, SIGNAL, SIGNAL);
    g.material.transparent = true;
    g.material.opacity = 0.09;
    g.material.depthWrite = false;
    g.material.blending = THREE.AdditiveBlending;
    return g;
  }, []);

  useFrame((state) => {
    if (reduced || !ref.current) return;
    // Slide the grid toward the camera and wrap, for a sense of travel.
    const span = 70 / 46;
    ref.current.position.z = (state.clock.elapsedTime * 0.9) % span;
  });

  return (
    <group position={[0, -6.5, 0]}>
      <primitive ref={ref} object={grid} />
    </group>
  );
}

/* ------------------------------------------------------------------ *
 *  Pointer parallax
 * ------------------------------------------------------------------ */
function CameraRig({ reduced, intensity = 1 }) {
  const { camera } = useThree();
  const target = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (reduced) return;
    // state.pointer is normalised to [-1, 1] and already smoothed by r3f.
    target.current.x = state.pointer.x * 1.1 * intensity;
    target.current.y = state.pointer.y * 0.6 * intensity;

    camera.position.x += (target.current.x - camera.position.x) * 0.035;
    camera.position.y += (target.current.y - camera.position.y) * 0.035;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ------------------------------------------------------------------ *
 *  Public component
 * ------------------------------------------------------------------ */
export default function NeuralField({
  density = 1,
  parallax = 1,
  className = "",
}) {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  // Keep the particle budget sane on phones.
  const isSmall = typeof window !== "undefined" && window.innerWidth < 768;
  const count = Math.round((isSmall ? 650 : 1400) * density);

  return (
    <div
      className={`absolute inset-0 ${className}`}
      aria-hidden="true"
      style={{ contain: "strict" }}
    >
      <Canvas
        camera={{ position: [0, 0, 11], fov: 58 }}
        dpr={[1, 1.75]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: false,
        }}
        // Pause the render loop when the scene is offscreen or the tab is hidden.
        frameloop={reduced ? "demand" : "always"}
      >
        <fog attach="fog" args={["#03060f", 12, 34]} />
        <ParticleField count={count} reduced={reduced} />
        <Core reduced={reduced} />
        <GridFloor reduced={reduced} />
        <CameraRig reduced={reduced} intensity={parallax} />
      </Canvas>
    </div>
  );
}
