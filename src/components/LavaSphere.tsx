import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export const LavaSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <group>
      {/* Main lava sphere */}
      <Sphere ref={meshRef} args={[2.5, 128, 128]}>
        <MeshDistortMaterial
          color="#FF4500"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
      
      {/* Inner glow sphere */}
      <Sphere args={[2.3, 64, 64]}>
        <meshStandardMaterial
          color="#FF6B00"
          emissive="#FF4500"
          emissiveIntensity={2}
          transparent
          opacity={0.6}
        />
      </Sphere>

      {/* Outer glow */}
      <Sphere args={[2.8, 32, 32]}>
        <meshStandardMaterial
          color="#FFD700"
          emissive="#FF8C00"
          emissiveIntensity={1}
          transparent
          opacity={0.2}
        />
      </Sphere>

      {/* Point lights for dramatic effect */}
      <pointLight position={[0, 0, 0]} intensity={2} color="#FF4500" />
      <pointLight position={[3, 3, 3]} intensity={1} color="#FF6B00" />
      <pointLight position={[-3, -3, -3]} intensity={1} color="#FFD700" />
    </group>
  );
};
