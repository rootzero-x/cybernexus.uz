/*
 * react-three-fiber works by mutating live three.js objects (camera, meshes,
 * materials) from inside useFrame, and by seeding geometry with Math.random()
 * inside useMemo. Those are the library's intended patterns, but the newer
 * react-hooks compiler rules read them as impure renders and illegal
 * mutations. They are disabled for these two files only.
 */
 
/*
 * react-three-fiber works by mutating live three.js objects (camera, meshes,
 * materials) from inside useFrame, and by seeding geometry with Math.random()
 * inside useMemo. Those are the library's intended patterns, but the newer
 * react-hooks compiler rules read them as impure renders and illegal
 * mutations. They are disabled for this file only.
 */
// src/design/scene/CharacterStage.jsx
import React, { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

const MODEL_URL = "/models/cyber-operative.glb";

/**
 * The rigged character, playing its idle clip.
 *
 * The GLB is served from /public so it is cached by the CDN and never bundled;
 * the whole stage is behind a lazy import so a visitor who never scrolls to it
 * pays nothing.
 */
function Character({ scale = 1, yOffset = -1.1 }) {
  const group = useRef(null);
  const { scene, animations } = useGLTF(MODEL_URL);
  const { actions, names } = useAnimations(animations, group);

  // Clone so the same GLB can be mounted on more than one page at a time
  // without the two instances fighting over one skeleton.
  const model = useMemo(() => scene.clone(true), [scene]);

  // Normalise the rig: exported models arrive at arbitrary sizes and origins,
  // so the figure is measured and re-centred to a known height. Without this
  // the framing depends on whatever the exporter happened to emit.
  const fit = useMemo(() => {
    const box = new THREE.Box3().setFromObject(model);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const height = size.y || 1;
    const unit = 2.6 / height; // target ~2.6 world units tall

    return {
      unit,
      // Bring the feet to y=0, then the caller's yOffset positions the group.
      offset: new THREE.Vector3(-center.x, -box.min.y, -center.z),
    };
  }, [model]);

  useEffect(() => {
    const first = names[0];
    if (!first || !actions[first]) return;

    const action = actions[first];
    action.reset().setLoop(THREE.LoopRepeat, Infinity).fadeIn(0.6).play();
    return () => action.fadeOut(0.3);
  }, [actions, names]);

  useEffect(() => {
    model.traverse((child) => {
      if (!child.isMesh) return;
      child.castShadow = true;
      child.receiveShadow = false;
      // Tone the material toward the site's palette without flattening it.
      if (child.material) {
        child.material.envMapIntensity = 0.8;
        child.material.needsUpdate = true;
      }
    });
  }, [model]);

  // A slow turntable so the silhouette reads from more than one angle.
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = Math.sin(t * 0.22) * 0.42;
    group.current.position.y = yOffset + Math.sin(t * 0.7) * 0.035;
  });

  return (
    <group ref={group} position={[0, yOffset, 0]} scale={scale * fit.unit}>
      <primitive object={model} position={fit.offset} />
    </group>
  );
}

/** Neon key lights that match the design tokens. */
function Rig() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 6, 4]} intensity={1.15} color="#ffffff" />
      {/* Mint key from the left, cyan rim from behind-right. */}
      <spotLight
        position={[-4, 3, 3]}
        angle={0.6}
        penumbra={0.9}
        intensity={22}
        color="#00ff9d"
        distance={18}
      />
      <spotLight
        position={[4, 2.5, -3]}
        angle={0.7}
        penumbra={1}
        intensity={26}
        color="#00e5ff"
        distance={18}
      />
      <Environment preset="city" environmentIntensity={0.35} />
    </>
  );
}

export default function CharacterStage({
  className = "",
  scale = 1,
  // The rig is normalised to ~2.6 units tall with its feet at y=0, so this
  // drops the figure so it sits centred in frame.
  yOffset = -1.35,
}) {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.15, 5.4], fov: 34 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={reduced ? "demand" : "always"}
        shadows
      >
        <Suspense fallback={null}>
          <Rig />
          <Character scale={scale} yOffset={yOffset} />
          <ContactShadows
            position={[0, yOffset - 0.02, 0]}
            opacity={0.5}
            scale={7}
            blur={2.6}
            far={4}
            color="#00ff9d"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Warm the cache as soon as this chunk is parsed.
useGLTF.preload(MODEL_URL);
