import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { Card } from './ui/card';
import { X } from 'lucide-react';

interface Theme {
  title: string;
  analysis: string;
}

interface CategoryTheme {
  category_name: string;
  themes: Theme[];
}

interface AnalysisResult {
  overarching_themes: {
    prevailing_myth: Theme;
    underlying_drive: Theme;
    core_belief_system: Theme;
  };
  category_themes: CategoryTheme[];
}

interface PlanetProps {
  position: [number, number, number];
  color: string;
  size: number;
  theme: Theme;
  orbitRadius: number;
  orbitSpeed: number;
  onClick: (theme: Theme) => void;
}

function Planet({ position, color, size, theme, orbitRadius, orbitSpeed, onClick }: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime() * orbitSpeed;
      meshRef.current.position.x = Math.cos(time) * orbitRadius;
      meshRef.current.position.z = Math.sin(time) * orbitRadius;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group>
      <Sphere
        ref={meshRef}
        args={[size, 32, 32]}
        position={position}
        onClick={() => onClick(theme)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={hovered ? 0.5 : 0.2}
        />
      </Sphere>
      {hovered && (
        <Text
          position={[position[0], position[1] + size + 0.5, position[2]]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {theme.title}
        </Text>
      )}
    </group>
  );
}

interface SunProps {
  coreBeliefTheme: Theme;
  onClick: (theme: Theme) => void;
}

function Sun({ coreBeliefTheme, onClick }: SunProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <>
      <Sphere
        ref={meshRef}
        args={[2, 64, 64]}
        onClick={() => onClick(coreBeliefTheme)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial 
          color="#FFA500" 
          emissive="#FF6B00"
          emissiveIntensity={hovered ? 1 : 0.6}
        />
      </Sphere>
      {hovered && (
        <Text
          position={[0, 3, 0]}
          fontSize={0.4}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {coreBeliefTheme.title}
        </Text>
      )}
      <pointLight position={[0, 0, 0]} intensity={2} distance={50} />
    </>
  );
}

interface SolarSystemSceneProps {
  analysisResult: AnalysisResult;
  onThemeClick: (theme: Theme) => void;
}

function SolarSystemScene({ analysisResult, onThemeClick }: SolarSystemSceneProps) {
  const planets: Array<{ theme: Theme; color: string; size: number; orbitRadius: number; orbitSpeed: number }> = [];

  // Add overarching themes as inner planets
  planets.push({
    theme: analysisResult.overarching_themes.prevailing_myth,
    color: "#9333EA",
    size: 0.8,
    orbitRadius: 4,
    orbitSpeed: 0.3
  });
  planets.push({
    theme: analysisResult.overarching_themes.underlying_drive,
    color: "#EC4899",
    size: 0.7,
    orbitRadius: 6,
    orbitSpeed: 0.25
  });

  // Add category themes as outer planets
  const colors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#14B8A6"];
  let colorIndex = 0;

  analysisResult.category_themes.forEach((category) => {
    category.themes.forEach((theme, index) => {
      planets.push({
        theme,
        color: colors[colorIndex % colors.length],
        size: 0.6 - (index * 0.05),
        orbitRadius: 8 + (colorIndex * 2),
        orbitSpeed: 0.2 - (colorIndex * 0.02)
      });
      colorIndex++;
    });
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <Sun 
        coreBeliefTheme={analysisResult.overarching_themes.core_belief_system}
        onClick={onThemeClick}
      />
      {planets.map((planet, index) => (
        <Planet
          key={index}
          position={[planet.orbitRadius, 0, 0]}
          color={planet.color}
          size={planet.size}
          theme={planet.theme}
          orbitRadius={planet.orbitRadius}
          orbitSpeed={planet.orbitSpeed}
          onClick={onThemeClick}
        />
      ))}
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={30}
      />
    </>
  );
}

interface CosmosSolarSystemProps {
  analysisResult: AnalysisResult;
}

export function CosmosSolarSystem({ analysisResult }: CosmosSolarSystemProps) {
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);

  return (
    <div className="relative">
      <div className="w-full h-[600px] bg-black/90 rounded-lg overflow-hidden border border-border">
        <Canvas camera={{ position: [0, 8, 15], fov: 60 }}>
          <SolarSystemScene 
            analysisResult={analysisResult}
            onThemeClick={setSelectedTheme}
          />
        </Canvas>
      </div>

      {selectedTheme && (
        <Card className="absolute top-4 right-4 p-6 max-w-md bg-card/95 backdrop-blur border-border">
          <button
            onClick={() => setSelectedTheme(null)}
            className="absolute top-2 right-2 p-1 hover:bg-accent rounded"
          >
            <X className="w-4 h-4" />
          </button>
          <h4 className="text-lg font-bold mb-2 text-primary pr-6">
            {selectedTheme.title}
          </h4>
          <p className="text-sm text-muted-foreground">
            {selectedTheme.analysis}
          </p>
        </Card>
      )}

      <div className="mt-4 text-center text-sm text-muted-foreground">
        <p>Click and drag to rotate • Scroll to zoom • Click celestial bodies to view details</p>
      </div>
    </div>
  );
}
