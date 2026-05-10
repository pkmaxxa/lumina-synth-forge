import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Stars } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useRef } from "react";
import * as THREE from "three";

function Orb() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock, mouse }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.15 + mouse.x * 0.4;
    ref.current.rotation.x = mouse.y * 0.3;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
      <Sphere ref={ref} args={[1.6, 128, 128]}>
        <MeshDistortMaterial
          color="#5ad6ff"
          emissive="#7a3bff"
          emissiveIntensity={0.4}
          roughness={0.15}
          metalness={0.85}
          distort={0.45}
          speed={1.6}
        />
      </Sphere>
      <Sphere args={[2.1, 64, 64]}>
        <meshBasicMaterial color="#7a3bff" transparent opacity={0.06} side={THREE.BackSide} />
      </Sphere>
    </Float>
  );
}

function Particles({ count = 1500 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = 6 + Math.random() * 14;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.02;
      ref.current.rotation.x = clock.getElapsedTime() * 0.01;
    }
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#a8e7ff" transparent opacity={0.85} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

export default function Scene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#7a3bff" />
      <pointLight position={[-5, -3, -2]} intensity={1.5} color="#5ad6ff" />
      <directionalLight position={[0, 10, 5]} intensity={0.6} />

      <Orb />
      <Particles />
      <Stars radius={60} depth={40} count={2500} factor={3} saturation={0.6} fade speed={0.4} />

      <EffectComposer>
        <Bloom intensity={1.2} luminanceThreshold={0.15} luminanceSmoothing={0.9} mipmapBlur />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new THREE.Vector2(0.0008, 0.0012)}
          radialModulation={false}
          modulationOffset={0}
        />
      </EffectComposer>
    </Canvas>
  );
}
