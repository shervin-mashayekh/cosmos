import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

export const LavaSphere = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [model, setModel] = useState<THREE.Group | null>(null);

  // Load the OBJ model
  useEffect(() => {
    const loader = new OBJLoader();
    loader.load(
      '/models/lava1.obj',
      (object) => {
        // Scale the model appropriately
        object.scale.set(2.5, 2.5, 2.5);
        
        // Apply lava material to all meshes in the model
        object.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            // Create a custom material for the cracked lava effect
            child.material = new THREE.MeshStandardMaterial({
              color: new THREE.Color('#1a0a00'), // Very dark base for cracks
              emissive: new THREE.Color('#ff4500'), // Bright orange-red glow
              emissiveIntensity: 1.2,
              roughness: 0.8,
              metalness: 0.2,
            });
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        
        setModel(object);
      },
      undefined,
      (error) => {
        console.error('Error loading OBJ model:', error);
      }
    );
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Smooth rotation like the original
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {model && <primitive object={model.clone()} />}
      
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
