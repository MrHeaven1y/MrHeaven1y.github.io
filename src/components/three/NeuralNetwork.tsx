'use client';

import { useRef, useMemo, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// ─── Constants ───────────────────────────────────────────────────────
const INPUT_COUNT = 8;
const HIDDEN_COUNT = 12;
const OUTPUT_COUNT = 6;
const TOTAL_NODES = INPUT_COUNT + HIDDEN_COUNT + OUTPUT_COUNT;
const FLOW_PARTICLE_COUNT = 100;

const CYAN = new THREE.Color(0x00f5ff);
const PURPLE = new THREE.Color(0x7c3aed);
const WHITE = new THREE.Color(0xffffff);

const LAYER_X = [-4, 0, 4] as const;
const LAYER_RADII = [2, 2.5, 1.5] as const;
const LAYER_COUNTS = [INPUT_COUNT, HIDDEN_COUNT, OUTPUT_COUNT] as const;

// ─── Helpers ─────────────────────────────────────────────────────────
function createNodePositions(): Float32Array {
  const positions = new Float32Array(TOTAL_NODES * 3);
  let idx = 0;

  for (let layer = 0; layer < 3; layer++) {
    const count = LAYER_COUNTS[layer];
    const radius = LAYER_RADII[layer];
    const x = LAYER_X[layer];

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      positions[idx++] = x;
      positions[idx++] = Math.sin(angle) * radius;
      positions[idx++] = Math.cos(angle) * radius;
    }
  }

  return positions;
}

interface EdgeDef {
  startIdx: number;
  endIdx: number;
}

function createEdges(): EdgeDef[] {
  const edges: EdgeDef[] = [];
  const inputStart = 0;
  const hiddenStart = INPUT_COUNT;
  const outputStart = INPUT_COUNT + HIDDEN_COUNT;

  // Input → Hidden
  for (let i = 0; i < INPUT_COUNT; i++) {
    for (let j = 0; j < HIDDEN_COUNT; j++) {
      edges.push({ startIdx: inputStart + i, endIdx: hiddenStart + j });
    }
  }

  // Hidden → Output
  for (let i = 0; i < HIDDEN_COUNT; i++) {
    for (let j = 0; j < OUTPUT_COUNT; j++) {
      edges.push({ startIdx: hiddenStart + i, endIdx: outputStart + j });
    }
  }

  return edges;
}

// ─── Component ───────────────────────────────────────────────────────
export default function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const instancedRef = useRef<THREE.InstancedMesh>(null);
  const edgesRef = useRef<THREE.LineSegments>(null);
  const flowRef = useRef<THREE.Points>(null);

  const { pointer } = useThree();

  // Pre-compute node positions
  const nodePositions = useMemo(() => createNodePositions(), []);

  // Pre-compute edges
  const edges = useMemo(() => createEdges(), []);

  // Node base colors (for emissive)
  const nodeColors = useMemo(() => {
    const colors: THREE.Color[] = [];
    const blend = new THREE.Color();

    for (let i = 0; i < INPUT_COUNT; i++) {
      colors.push(CYAN.clone());
    }
    for (let i = 0; i < HIDDEN_COUNT; i++) {
      const t = i / (HIDDEN_COUNT - 1);
      blend.copy(CYAN).lerp(PURPLE, t);
      colors.push(blend.clone());
    }
    for (let i = 0; i < OUTPUT_COUNT; i++) {
      colors.push(PURPLE.clone());
    }

    return colors;
  }, []);

  // Node geometry + material
  const nodeGeometry = useMemo(
    () => new THREE.SphereGeometry(0.08, 16, 16),
    []
  );
  const nodeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0x111111,
        emissive: 0x00f5ff,
        emissiveIntensity: 0.6,
        roughness: 0.3,
        metalness: 0.8,
      }),
    []
  );

  // Edge geometry
  const edgeGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(edges.length * 6); // 2 vertices per edge

    for (let i = 0; i < edges.length; i++) {
      const { startIdx, endIdx } = edges[i];
      const s3 = startIdx * 3;
      const e3 = endIdx * 3;
      const i6 = i * 6;

      positions[i6] = nodePositions[s3];
      positions[i6 + 1] = nodePositions[s3 + 1];
      positions[i6 + 2] = nodePositions[s3 + 2];
      positions[i6 + 3] = nodePositions[e3];
      positions[i6 + 4] = nodePositions[e3 + 1];
      positions[i6 + 5] = nodePositions[e3 + 2];
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [edges, nodePositions]);

  const edgeMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.06,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  // Flow particles — state stored in refs for performance
  const flowState = useMemo(() => {
    const progress = new Float32Array(FLOW_PARTICLE_COUNT);
    const speed = new Float32Array(FLOW_PARTICLE_COUNT);
    const edgeIndices = new Int32Array(FLOW_PARTICLE_COUNT);
    const totalEdges = edges.length;

    for (let i = 0; i < FLOW_PARTICLE_COUNT; i++) {
      progress[i] = Math.random();
      speed[i] = 0.3 + Math.random() * 0.7; // variable speeds
      edgeIndices[i] = Math.floor(Math.random() * totalEdges);
    }

    return { progress, speed, edgeIndices, totalEdges };
  }, [edges]);

  const flowGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(FLOW_PARTICLE_COUNT * 3);
    const colors = new Float32Array(FLOW_PARTICLE_COUNT * 3);

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  const flowMaterial = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.02,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        vertexColors: true,
        sizeAttenuation: true,
      }),
    []
  );

  // Dummy object for instanced mesh transforms
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tempColor = useMemo(() => new THREE.Color(), []);

  // Phase offsets for floating animation
  const phaseOffsets = useMemo(() => {
    const offsets = new Float32Array(TOTAL_NODES);
    for (let i = 0; i < TOTAL_NODES; i++) {
      offsets[i] = Math.random() * Math.PI * 2;
    }
    return offsets;
  }, []);

  // Project pointer to approximate 3D position
  const getPointer3D = useCallback(
    (px: number, py: number): THREE.Vector3 => {
      return new THREE.Vector3(px * 6, py * 4, 0);
    },
    []
  );

  // ─── Animation Loop ─────────────────────────────────────────────
  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    const instanced = instancedRef.current;
    const group = groupRef.current;

    if (!instanced || !group) return;

    // Subtle group rotation
    group.rotation.y += delta * 0.05;

    // Project mouse to 3D
    const pointer3D = getPointer3D(pointer.x, pointer.y);

    // ── Update Nodes ──
    for (let i = 0; i < TOTAL_NODES; i++) {
      const i3 = i * 3;
      const baseX = nodePositions[i3];
      const baseY = nodePositions[i3 + 1];
      const baseZ = nodePositions[i3 + 2];

      // Floating animation
      const floatY = Math.sin(time * 0.8 + phaseOffsets[i]) * 0.1;
      const floatZ = Math.cos(time * 0.6 + phaseOffsets[i] * 1.3) * 0.05;

      dummy.position.set(baseX, baseY + floatY, baseZ + floatZ);

      // Mouse proximity — increase scale when near
      const dx = dummy.position.x - pointer3D.x;
      const dy = dummy.position.y - pointer3D.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const proximity = Math.max(0, 1 - dist / 2); // 0..1, 1 = very close

      const scale = 1 + proximity * 0.8;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      instanced.setMatrixAt(i, dummy.matrix);

      // Color: boost emissive based on proximity
      const baseColor = nodeColors[i];
      const intensity = 0.4 + proximity * 2.0;
      tempColor.setRGB(
        baseColor.r * intensity,
        baseColor.g * intensity,
        baseColor.b * intensity
      );
      instanced.setColorAt(i, tempColor);
    }

    instanced.instanceMatrix.needsUpdate = true;
    if (instanced.instanceColor) instanced.instanceColor.needsUpdate = true;

    // ── Update Edge Opacity (pulse) ──
    const edgesMesh = edgesRef.current;
    if (edgesMesh) {
      const mat = edgesMesh.material as THREE.LineBasicMaterial;
      mat.opacity = 0.04 + Math.sin(time * 0.5) * 0.02;
    }

    // ── Update Flow Particles ──
    const flowPoints = flowRef.current;
    if (flowPoints) {
      const posAttr = flowPoints.geometry.attributes.position;
      const colorAttr = flowPoints.geometry.attributes.color;
      const posArr = posAttr.array as Float32Array;
      const colArr = colorAttr.array as Float32Array;
      const { progress, speed, edgeIndices, totalEdges } = flowState;

      for (let i = 0; i < FLOW_PARTICLE_COUNT; i++) {
        // Advance progress
        progress[i] += delta * speed[i] * 0.5;

        if (progress[i] >= 1) {
          progress[i] = 0;
          edgeIndices[i] = Math.floor(Math.random() * totalEdges);
        }

        const edge = edges[edgeIndices[i]];
        const s3 = edge.startIdx * 3;
        const e3 = edge.endIdx * 3;
        const t = progress[i];

        const i3 = i * 3;
        // Lerp position
        posArr[i3] = nodePositions[s3] + (nodePositions[e3] - nodePositions[s3]) * t;
        posArr[i3 + 1] =
          nodePositions[s3 + 1] +
          (nodePositions[e3 + 1] - nodePositions[s3 + 1]) * t +
          Math.sin(t * Math.PI) * 0.15; // slight arc
        posArr[i3 + 2] =
          nodePositions[s3 + 2] +
          (nodePositions[e3 + 2] - nodePositions[s3 + 2]) * t;

        // Color gradient: cyan → purple based on x position
        const xPos = posArr[i3];
        const colorT = (xPos + 4) / 8; // map [-4, 4] to [0, 1]
        const clampedT = Math.max(0, Math.min(1, colorT));

        colArr[i3] = CYAN.r + (PURPLE.r - CYAN.r) * clampedT;
        colArr[i3 + 1] = CYAN.g + (PURPLE.g - CYAN.g) * clampedT;
        colArr[i3 + 2] = CYAN.b + (PURPLE.b - CYAN.b) * clampedT;
      }

      posAttr.needsUpdate = true;
      colorAttr.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Nodes — single instanced draw call */}
      <instancedMesh
        ref={instancedRef}
        args={[nodeGeometry, nodeMaterial, TOTAL_NODES]}
        frustumCulled={false}
      />

      {/* Edges */}
      <lineSegments
        ref={edgesRef}
        geometry={edgeGeometry}
        material={edgeMaterial}
        frustumCulled={false}
      />

      {/* Data Flow Particles */}
      <points
        ref={flowRef}
        geometry={flowGeometry}
        material={flowMaterial}
        frustumCulled={false}
      />
    </group>
  );
}
