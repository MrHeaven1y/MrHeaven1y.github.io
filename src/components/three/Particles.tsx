'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 1500;

export default function Particles() {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, initialY] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const initY = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      // Random positions in a box: x ∈ [-15, 15], y ∈ [-15, 15], z ∈ [-10, 5]
      pos[i3] = (Math.random() - 0.5) * 30; // x
      pos[i3 + 1] = (Math.random() - 0.5) * 30; // y
      pos[i3 + 2] = -10 + Math.random() * 15; // z

      initY[i] = pos[i3 + 1];
    }

    return [pos, initY];
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.015,
        color: new THREE.Color(0xffffff),
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  useFrame((state, delta) => {
    const points = pointsRef.current;
    if (!points) return;

    // Slowly rotate the entire Points group
    points.rotation.y += delta * 0.02;
    points.rotation.x += delta * 0.01;

    // Gentle wave motion
    const posAttr = points.geometry.attributes.position;
    const posArr = posAttr.array as Float32Array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const x = posArr[i3];
      // offset y by sin(time + x * 0.5) * 0.002
      posArr[i3 + 1] = initialY[i] + Math.sin(time + x * 0.5) * 0.5;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points
      ref={pointsRef}
      geometry={geometry}
      material={material}
      frustumCulled={false}
    />
  );
}