import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

interface Planet3DProps {
  imageUrl: string;
  progress: number;
  scale?: number;
}

export const Planet3D = ({ imageUrl, progress, scale = 1 }: Planet3DProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(TextureLoader, imageUrl);

  // Animate based on progress
  useFrame(() => {
    if (!meshRef.current) return;

    // Interpolate values based on scroll progress
    const targetScale = 0.8 + progress * (0.64 * scale); // 0.8 to 1.44
    const translateX = (-10 + progress * 10) * 0.15; // Convert % to 3D units
    const rotateY = (-20 + progress * 20) * (Math.PI / 180); // Convert deg to radians
    const opacity = Math.max(0.3, progress);

    // Apply transformations
    meshRef.current.scale.setScalar(targetScale);
    meshRef.current.position.x = translateX;
    meshRef.current.rotation.y = rotateY;
    
    // Apply same transformations to glow
    if (glowRef.current) {
      glowRef.current.scale.setScalar(targetScale * 1.15);
      glowRef.current.position.x = translateX;
      glowRef.current.rotation.y = rotateY;
      
      if (glowRef.current.material instanceof THREE.MeshBasicMaterial) {
        glowRef.current.material.opacity = opacity * 0.3;
      }
    }
    
    // Apply opacity through material
    if (meshRef.current.material instanceof THREE.MeshStandardMaterial) {
      meshRef.current.material.opacity = opacity;
      meshRef.current.material.transparent = true;
    }

    // Subtle continuous rotation for life
    meshRef.current.rotation.y += 0.001;
    if (glowRef.current) {
      glowRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group>
      {/* Glow layer */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial 
          color="#ffffff"
          transparent
          opacity={0.3}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Main planet sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial 
          map={texture} 
          metalness={0.1}
          roughness={0.7}
          emissive="#ffffff"
          emissiveIntensity={0.15}
        />
      </mesh>
    </group>
  );
};

export const Planet3DTrail = ({ imageUrl, progress, trailIndex }: { imageUrl: string; progress: number; trailIndex: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(TextureLoader, imageUrl);

  useFrame(() => {
    if (!meshRef.current) return;

    let trailScale, trailTranslateX, trailRotate, trailOpacity;

    if (trailIndex === 1) {
      trailScale = 0.6 + progress * 0.2;
      trailTranslateX = (-20 + progress * 10) * 0.15;
      trailRotate = (-25 + progress * 10) * (Math.PI / 180);
      trailOpacity = 0.15 * (1 - progress);
    } else {
      trailScale = 0.7 + progress * 0.2;
      trailTranslateX = (-15 + progress * 8) * 0.15;
      trailRotate = (-15 + progress * 5) * (Math.PI / 180);
      trailOpacity = 0.2 * (1 - progress);
    }

    meshRef.current.scale.setScalar(trailScale);
    meshRef.current.position.x = trailTranslateX;
    meshRef.current.rotation.y = trailRotate;

    if (glowRef.current) {
      glowRef.current.scale.setScalar(trailScale * 1.15);
      glowRef.current.position.x = trailTranslateX;
      glowRef.current.rotation.y = trailRotate;
      
      if (glowRef.current.material instanceof THREE.MeshBasicMaterial) {
        glowRef.current.material.opacity = trailOpacity * 0.25;
      }
    }

    if (meshRef.current.material instanceof THREE.MeshStandardMaterial) {
      meshRef.current.material.opacity = trailOpacity;
      meshRef.current.material.transparent = true;
    }
  });

  return (
    <group>
      {/* Glow layer for trail */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial 
          color="#ffffff"
          transparent
          opacity={0.25}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Trail sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          map={texture} 
          metalness={0.1}
          roughness={0.9}
          transparent
        />
      </mesh>
    </group>
  );
};
