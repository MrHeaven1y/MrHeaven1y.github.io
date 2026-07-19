'use client';

import { useRef, useCallback, Suspense } from 'react';
import { Canvas as R3FCanvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

import NeuralNetwork from '@/components/three/NeuralNetwork';
import Particles from '@/components/three/Particles';

// ─── Camera Controller ──────────────────────────────────────────────
function CameraController() {
  const { camera, pointer } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    const cam = camera as THREE.PerspectiveCamera;
    cam.position.x += (pointer.x * 0.5 - cam.position.x) * 0.02;
    cam.position.y += (pointer.y * 0.3 - cam.position.y) * 0.02;
    cam.position.z += (8 - cam.position.z) * 0.02;
    cam.lookAt(target.current);
  });

  return null;
}

// ─── Scene Internals ────────────────────────────────────────────────
function SceneContent() {
  return (
    <>
      <color attach="background" args={['#050507']} />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#00f5ff" />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#7c3aed" />

      <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <NeuralNetwork />
      </Float>

      <Particles />

      <Stars
        radius={50}
        depth={50}
        count={800}
        factor={2}
        saturation={0}
        fade
        speed={0.5}
      />

      <CameraController />
    </>
  );
}

// ─── Main HeroScene ─────────────────────────────────────────────────
interface HeroSceneProps {
  onCreated?: () => void;
}

export default function HeroScene({ onCreated }: HeroSceneProps) {
  const handleCreated = useCallback(() => {
    onCreated?.();
  }, [onCreated]);

  return (
    <R3FCanvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 8], fov: 60, near: 0.1, far: 100 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      onCreated={handleCreated}
    >
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
    </R3FCanvas>
  );
}