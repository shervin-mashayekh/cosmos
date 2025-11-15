import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

export const LavaSphere = () => {
  const groupRef = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const mtlLoader = new MTLLoader();
    mtlLoader.setPath('/models/');
    
    mtlLoader.load('Lava_Planet_2.mtl', (materials) => {
      materials.preload();
      
      const objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.setPath('/models/');
      
      objLoader.load('Lava_Planet_2.obj', (object) => {
        // Scale down the model (it's quite large based on the vertex values)
        object.scale.set(0.01, 0.01, 0.01);
        
        // Center the model
        const box = new THREE.Box3().setFromObject(object);
        const center = box.getCenter(new THREE.Vector3());
        object.position.sub(center);
        
        // Enhance materials with emissive properties
        object.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            const material = child.material as THREE.MeshPhongMaterial;
            if (material.map) {
              material.emissive = new THREE.Color(0xff4500);
              material.emissiveIntensity = 0.5;
              material.shininess = 30;
            }
          }
        });
        
        modelRef.current = object;
        if (groupRef.current) {
          groupRef.current.add(object);
        }
      });
    });
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Lighting */}
      <pointLight position={[0, 0, 0]} intensity={2} color="#ff4500" distance={10} />
      <pointLight position={[3, 3, 3]} intensity={1} color="#ff6b00" distance={8} />
      <pointLight position={[-3, -3, -3]} intensity={1} color="#ffd700" distance={8} />
    </group>
  );
};
