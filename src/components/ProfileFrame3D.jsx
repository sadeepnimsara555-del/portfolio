import { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Clean & Simple 3D Avatar with subtle tilt & sleek glowing bezel
 */
function SimpleAvatarMesh() {
  const groupRef = useRef(null);
  const ringRef = useRef(null);

  // Load the profile photo as texture
  const texture = useLoader(THREE.TextureLoader, "/profile.jpg");
  texture.colorSpace = THREE.SRGBColorSpace;

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();

    // Smooth subtle mouse tilt parallax
    const targetRotX = -pointer.y * 0.25;
    const targetRotY = pointer.x * 0.3;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.06);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.06);

    // Subtle gentle ring spin
    if (ringRef.current && !prefersReducedMotion) {
      ringRef.current.rotation.z = t * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.8} rotationIntensity={0.1} floatIntensity={0.25} enabled={!prefersReducedMotion}>
        {/* ── Profile Image Disc ── */}
        <mesh position={[0, 0, 0.02]}>
          <circleGeometry args={[1.38, 64]} />
          <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
        </mesh>

        {/* ── Sleek Inner Bezel Ring (Indigo) ── */}
        <mesh position={[0, 0, 0.03]}>
          <ringGeometry args={[1.37, 1.44, 64]} />
          <meshStandardMaterial
            color="#6366f1"
            emissive="#4f46e5"
            emissiveIntensity={0.6}
            roughness={0.2}
            metalness={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* ── Subtle Outer Accent Bezel (Cyan/Violet) ── */}
        <mesh position={[0, 0, 0.01]}>
          <ringGeometry args={[1.44, 1.50, 64]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={0.3}
            roughness={0.3}
            metalness={0.9}
            transparent
            opacity={0.85}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* ── 3D Solid Backing Base ── */}
        <mesh position={[0, 0, -0.04]}>
          <cylinderGeometry args={[1.50, 1.50, 0.08, 64]} />
          <meshStandardMaterial
            color="#0a0f1e"
            metalness={0.8}
            roughness={0.3}
          />
        </mesh>

        {/* ── Single Subtle Glowing Orbit Ring ── */}
        <mesh ref={ringRef} position={[0, 0, 0]}>
          <torusGeometry args={[1.72, 0.015, 16, 80]} />
          <meshStandardMaterial
            color="#818cf8"
            emissive="#6366f1"
            emissiveIntensity={0.7}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>
      </Float>
    </group>
  );
}

/**
 * Clean & Minimalist 3D Profile Frame
 */
export default function ProfileFrame3D() {
  return (
    <div className="w-[260px] h-[260px] md:w-[290px] md:h-[290px] relative flex items-center justify-center">
      {/* Soft background glow */}
      <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-indigo-500/20 via-blue-500/15 to-violet-500/20 blur-xl pointer-events-none" />

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 48 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="z-10"
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[2, 3, 3]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-2, -2, 2]} intensity={1.2} color="#818cf8" />

        <SimpleAvatarMesh />
      </Canvas>
    </div>
  );
}
