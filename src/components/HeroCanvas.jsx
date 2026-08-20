import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Stars } from "@react-three/drei";
import * as THREE from "three";

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ──────────────────────────────────────────────
   Mouse tracker — shared across child components
   ────────────────────────────────────────────── */
function useMousePosition() {
  const mouse = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  useFrame(({ pointer }) => {
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, pointer.x * viewport.width * 0.5, 0.05);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, pointer.y * viewport.height * 0.5, 0.05);
  });

  return mouse;
}

/* ──────────────────────────────────────────────
   Central AI Core — morphing icosahedron
   ────────────────────────────────────────────── */
function AICore() {
  const mesh = useRef(null);
  const innerMesh = useRef(null);
  const mouse = useMousePosition();

  useFrame(({ clock }) => {
    if (!mesh.current || prefersReducedMotion) return;
    const t = clock.getElapsedTime();

    mesh.current.rotation.x = t * 0.08 + mouse.current.y * 0.15;
    mesh.current.rotation.y = t * 0.12 + mouse.current.x * 0.15;
    mesh.current.rotation.z = t * 0.04;

    if (innerMesh.current) {
      innerMesh.current.rotation.x = -t * 0.15;
      innerMesh.current.rotation.y = -t * 0.1;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.5} enabled={!prefersReducedMotion}>
      <group>
        {/* Outer morphing shell */}
        <mesh ref={mesh} position={[0, 0, 0]}>
          <icosahedronGeometry args={[1.6, 4]} />
          <MeshDistortMaterial
            color="#4f46e5"
            transparent
            opacity={0.15}
            wireframe
            distort={0.25}
            speed={prefersReducedMotion ? 0 : 2}
            roughness={0.2}
          />
        </mesh>

        {/* Inner solid core with glow */}
        <mesh ref={innerMesh} position={[0, 0, 0]}>
          <icosahedronGeometry args={[0.6, 3]} />
          <meshStandardMaterial
            color="#6366f1"
            emissive="#6366f1"
            emissiveIntensity={1.5}
            transparent
            opacity={0.7}
            metalness={0.8}
            roughness={0.1}
          />
        </mesh>

        {/* Core glow sphere */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.85, 32, 32]} />
          <meshStandardMaterial
            color="#818cf8"
            emissive="#818cf8"
            emissiveIntensity={0.6}
            transparent
            opacity={0.08}
          />
        </mesh>
      </group>
    </Float>
  );
}

/* ──────────────────────────────────────────────
   Orbital Rings — holographic atom effect
   ────────────────────────────────────────────── */
function OrbitalRing({ radius, tiltX, tiltZ, speed, color, opacity = 0.25, segments = 180 }) {
  const mesh = useRef(null);

  useFrame(({ clock }) => {
    if (!mesh.current || prefersReducedMotion) return;
    mesh.current.rotation.z = tiltZ + clock.getElapsedTime() * speed;
  });

  return (
    <mesh ref={mesh} rotation={[tiltX, 0, 0]}>
      <torusGeometry args={[radius, 0.012, 8, segments]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={opacity}
        emissive={color}
        emissiveIntensity={1.2}
      />
    </mesh>
  );
}

function OrbitalSystem() {
  return (
    <group>
      <OrbitalRing radius={2.4} tiltX={Math.PI / 2.8} tiltZ={0} speed={0.08} color="#6366f1" opacity={0.3} />
      <OrbitalRing radius={2.8} tiltX={Math.PI / 1.8} tiltZ={0.3} speed={-0.05} color="#3b82f6" opacity={0.2} />
      <OrbitalRing radius={3.2} tiltX={Math.PI / 3.5} tiltZ={-0.5} speed={0.03} color="#8b5cf6" opacity={0.15} />
    </group>
  );
}

/* ──────────────────────────────────────────────
   Neural Network Nodes & Connections
   ────────────────────────────────────────────── */
function generateNetworkData(nodeCount = 40) {
  const nodes = [];
  const connections = [];

  for (let i = 0; i < nodeCount; i++) {
    const phi = Math.acos(2 * Math.random() - 1);
    const theta = Math.random() * Math.PI * 2;
    const r = 2.5 + Math.random() * 1.8;

    nodes.push({
      pos: new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      ),
      size: 0.02 + Math.random() * 0.035,
      pulseOffset: Math.random() * Math.PI * 2,
      color: Math.random() > 0.5 ? "#6366f1" : "#3b82f6",
    });
  }

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dist = nodes[i].pos.distanceTo(nodes[j].pos);
      if (dist < 2.2 && Math.random() > 0.4) {
        connections.push({ from: i, to: j, dist });
      }
    }
  }

  return { nodes, connections };
}

function NeuralNode({ position, size, pulseOffset, color }) {
  const mesh = useRef(null);

  useFrame(({ clock }) => {
    if (!mesh.current || prefersReducedMotion) return;
    const pulse = 1 + Math.sin(clock.getElapsedTime() * 2 + pulseOffset) * 0.3;
    mesh.current.scale.setScalar(pulse);
  });

  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[size, 12, 12]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2.5}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

function NeuralConnection({ from, to }) {
  const lineRef = useRef(null);

  const geometry = useMemo(() => {
    const mid = new THREE.Vector3().addVectors(from, to).multiplyScalar(0.5);
    const normal = new THREE.Vector3().subVectors(to, from).cross(new THREE.Vector3(0, 1, 0)).normalize();
    mid.add(normal.multiplyScalar(0.15));
    const curve = new THREE.QuadraticBezierCurve3(from, mid, to);
    const points = curve.getPoints(20);
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [from, to]);

  useFrame(({ clock }) => {
    if (!lineRef.current || prefersReducedMotion) return;
    lineRef.current.material.opacity = 0.06 + Math.sin(clock.getElapsedTime() * 1.5 + from.x * 2) * 0.04;
  });

  return (
    <line ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color="#6366f1" transparent opacity={0.08} />
    </line>
  );
}

function NeuralNetwork() {
  const { nodes, connections } = useMemo(() => generateNetworkData(45), []);
  const group = useRef(null);
  const mouse = useMousePosition();

  useFrame(({ clock }) => {
    if (!group.current || prefersReducedMotion) return;
    group.current.rotation.y = clock.getElapsedTime() * 0.03 + mouse.current.x * 0.06;
    group.current.rotation.x = mouse.current.y * 0.04;
  });

  return (
    <group ref={group}>
      {nodes.map((node, i) => (
        <NeuralNode
          key={`node-${i}`}
          position={node.pos}
          size={node.size}
          pulseOffset={node.pulseOffset}
          color={node.color}
        />
      ))}
      {connections.map((conn, i) => (
        <NeuralConnection
          key={`conn-${i}`}
          from={nodes[conn.from].pos}
          to={nodes[conn.to].pos}
        />
      ))}
    </group>
  );
}

/* ──────────────────────────────────────────────
   Enhanced Particle Field — Deep space dust
   ────────────────────────────────────────────── */
function ParticleField({ count = 1200 }) {
  const ref = useRef(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12 - 3;
    }
    return pos;
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current || prefersReducedMotion) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.015;
    ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.08) * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        color="#a5b4fc"
        size={0.022}
        transparent
        opacity={0.45}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ──────────────────────────────────────────────
   Data Stream Lines — flowing energy beams
   ────────────────────────────────────────────── */
function DataStream({ startAngle, radius, yOffset, speed, color }) {
  const ref = useRef(null);

  const geometry = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 60; i++) {
      const t = i / 60;
      const angle = startAngle + t * Math.PI * 1.2;
      pts.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          yOffset + Math.sin(t * Math.PI * 3) * 0.3,
          Math.sin(angle) * radius
        )
      );
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    return new THREE.TubeGeometry(curve, 80, 0.008, 6, false);
  }, [startAngle, radius, yOffset]);

  useFrame(({ clock }) => {
    if (!ref.current || prefersReducedMotion) return;
    ref.current.material.opacity = 0.15 + Math.sin(clock.getElapsedTime() * speed) * 0.1;
    ref.current.rotation.y = clock.getElapsedTime() * speed * 0.1;
  });

  return (
    <mesh ref={ref} geometry={geometry}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.5}
        transparent
        opacity={0.2}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function DataStreams() {
  return (
    <group>
      <DataStream startAngle={0} radius={3.0} yOffset={0.5} speed={1.2} color="#3b82f6" />
      <DataStream startAngle={Math.PI * 0.7} radius={3.4} yOffset={-0.3} speed={0.9} color="#8b5cf6" />
      <DataStream startAngle={Math.PI * 1.4} radius={2.6} yOffset={0.2} speed={1.5} color="#6366f1" />
    </group>
  );
}

/* ──────────────────────────────────────────────
   Floating Hex Grid — holographic backdrop
   ────────────────────────────────────────────── */
function HexGrid() {
  const group = useRef(null);

  const hexes = useMemo(() => {
    const result = [];
    const size = 0.4;
    const rows = 8;
    const cols = 12;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = (col - cols / 2) * size * 1.75 + (row % 2 === 0 ? 0 : size * 0.875);
        const y = (row - rows / 2) * size * 1.5;
        if (Math.random() > 0.35) {
          result.push({
            pos: [x, y, -6 - Math.random() * 2],
            opacity: Math.random() * 0.06 + 0.02,
          });
        }
      }
    }
    return result;
  }, []);

  useFrame(({ clock }) => {
    if (!group.current || prefersReducedMotion) return;
    group.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.1) * 0.02;
  });

  return (
    <group ref={group}>
      {hexes.map((hex, i) => (
        <mesh key={i} position={hex.pos}>
          <circleGeometry args={[0.18, 6]} />
          <meshStandardMaterial
            color="#3b82f6"
            transparent
            opacity={hex.opacity}
            emissive="#3b82f6"
            emissiveIntensity={0.4}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ──────────────────────────────────────────────
   Animated Lighting Rig
   ────────────────────────────────────────────── */
function AnimatedLights() {
  const light1 = useRef(null);
  const light2 = useRef(null);
  const light3 = useRef(null);

  useFrame(({ clock }) => {
    if (prefersReducedMotion) return;
    const t = clock.getElapsedTime();

    if (light1.current) {
      light1.current.position.x = Math.sin(t * 0.3) * 5;
      light1.current.position.z = Math.cos(t * 0.3) * 5;
    }
    if (light2.current) {
      light2.current.position.y = Math.sin(t * 0.4) * 4;
      light2.current.position.x = Math.cos(t * 0.25) * -4;
    }
    if (light3.current) {
      light3.current.intensity = 0.4 + Math.sin(t * 0.5) * 0.2;
    }
  });

  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight ref={light1} position={[5, 4, 5]} intensity={0.7} color="#6366f1" distance={15} />
      <pointLight ref={light2} position={[-5, -3, -3]} intensity={0.5} color="#3b82f6" distance={15} />
      <pointLight ref={light3} position={[0, 2, 4]} intensity={0.4} color="#8b5cf6" distance={12} />
      <pointLight position={[0, 0, 0]} intensity={0.8} color="#818cf8" distance={5} />
    </>
  );
}

/* ──────────────────────────────────────────────
   Main Canvas Export
   ────────────────────────────────────────────── */
export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 55 }}
      style={{ background: "transparent" }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-hidden="true"
    >
      <AnimatedLights />

      <Stars
        radius={50}
        depth={40}
        count={1500}
        factor={2.5}
        saturation={0}
        fade
        speed={prefersReducedMotion ? 0 : 0.3}
      />

      <AICore />
      <OrbitalSystem />
      <NeuralNetwork />
      <ParticleField />
      <DataStreams />
      <HexGrid />
    </Canvas>
  );
}

