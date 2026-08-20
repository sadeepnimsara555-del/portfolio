import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Stars } from "@react-three/drei";
import * as THREE from "three";

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Floating wireframe torus knot */
function TorusKnot() {
  const mesh = useRef(null);

  useFrame(({ clock }) => {
    if (!mesh.current || prefersReducedMotion) return;
    const t = clock.getElapsedTime();
    mesh.current.rotation.x = t * 0.12;
    mesh.current.rotation.y = t * 0.18;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8} enabled={!prefersReducedMotion}>
      <mesh ref={mesh} position={[2.5, 0.3, -2]}>
        <torusKnotGeometry args={[1, 0.32, 200, 32]} />
        <meshStandardMaterial
          color="#6366f1"
          wireframe
          transparent
          opacity={0.18}
        />
      </mesh>
    </Float>
  );
}

/** Icosahedron with distortion */
function IcoSphere() {
  const mesh = useRef(null);

  useFrame(({ clock }) => {
    if (!mesh.current || prefersReducedMotion) return;
    const t = clock.getElapsedTime();
    mesh.current.rotation.x = t * 0.08;
    mesh.current.rotation.z = t * 0.06;
  });

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={1.2} enabled={!prefersReducedMotion}>
      <mesh ref={mesh} position={[-2.8, -0.5, -1]}>
        <icosahedronGeometry args={[1.2, 1]} />
        <MeshDistortMaterial
          color="#3b82f6"
          wireframe
          transparent
          opacity={0.14}
          distort={0.3}
          speed={prefersReducedMotion ? 0 : 1.5}
        />
      </mesh>
    </Float>
  );
}

/** Particle field */
function Particles({ count = 800 }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
    }
    return arr;
  }, [count]);

  const ref = useRef(null);
  useFrame(({ clock }) => {
    if (!ref.current || prefersReducedMotion) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#a5b4fc"
        size={0.025}
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  );
}

/** Ambient glow ring */
function GlowRing() {
  const mesh = useRef(null);
  useFrame(({ clock }) => {
    if (!mesh.current || prefersReducedMotion) return;
    mesh.current.rotation.x = Math.PI / 2.3 + Math.sin(clock.getElapsedTime() * 0.3) * 0.05;
    mesh.current.rotation.z = clock.getElapsedTime() * 0.04;
  });

  return (
    <mesh ref={mesh} position={[0, 0, -3]}>
      <torusGeometry args={[3.5, 0.02, 8, 120]} />
      <meshStandardMaterial
        color="#8b5cf6"
        transparent
        opacity={0.2}
        emissive="#8b5cf6"
        emissiveIntensity={0.8}
      />
    </mesh>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 55 }}
      style={{ background: "transparent" }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.6} color="#6366f1" />
      <pointLight position={[-5, -3, -3]} intensity={0.4} color="#3b82f6" />

      <Stars
        radius={40}
        depth={30}
        count={1200}
        factor={2}
        saturation={0}
        fade
        speed={prefersReducedMotion ? 0 : 0.4}
      />

      <Particles />
      <TorusKnot />
      <IcoSphere />
      <GlowRing />
    </Canvas>
  );
}
