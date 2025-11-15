import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export const LavaSphere = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Load the GLB model using drei's useGLTF hook
  const { scene } = useGLTF('/models/lava1.glb');
  
  // Clone the scene and apply lava material
  const clonedScene = scene.clone();
  
  // Apply lava material to all meshes
  clonedScene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      // Create a custom material for the cracked lava effect
      child.material = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#1a0a00'), // Very dark base for cracks
        emissive: new THREE.Color('#ff4500'), // Bright orange-red glow
        emissiveIntensity: 1.5,
        roughness: 0.8,
        metalness: 0.2,
      });
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  useFrame((state) => {
    if (groupRef.current) {
      // Smooth rotation like the original
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef} scale={[2.5, 2.5, 2.5]}>
      <primitive object={clonedScene} />
      
      {/* Inner bright glow sphere - matches reference image */}
      <mesh scale={[2.3, 2.3, 2.3]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#ff6b00"
          emissive="#ff4500"
          emissiveIntensity={3}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Mid glow layer */}
      <mesh scale={[2.7, 2.7, 2.7]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#ff8c00"
          emissive="#ff6b00"
          emissiveIntensity={1.5}
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Outer atmospheric glow - bright rim like reference */}
      <mesh scale={[3.1, 3.1, 3.1]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#ffff00"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Multiple point lights for dramatic lava glow effect */}
      <pointLight position={[0, 0, 0]} intensity={4} color="#ff4500" distance={12} />
      <pointLight position={[2, 2, 2]} intensity={2} color="#ff6b00" distance={10} />
      <pointLight position={[-2, -2, -2]} intensity={2} color="#ffd700" distance={10} />
      <pointLight position={[0, 3, 0]} intensity={1.5} color="#ff8c00" distance={8} />
      <pointLight position={[0, -3, 0]} intensity={1.5} color="#ff4500" distance={8} />
    </group>
  );
};

// Preload the model
useGLTF.preload('/models/lava1.glb');
