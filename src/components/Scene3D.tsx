import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { LavaSphere } from './LavaSphere';
import { Suspense } from 'react';

export const Scene3D = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          <ambientLight intensity={0.5} />
          <LavaSphere />
        </Suspense>
      </Canvas>
    </div>
  );
};
