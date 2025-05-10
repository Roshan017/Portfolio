import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";

import { Suspense } from "react";

import { Scene } from "./Final";
import HeroLight from "./HeroLight";

function HeroExp() {
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <Canvas shadows camera={{ position: [0, 0, 15], fov: 45 }}>
      <Suspense fallback={null}>
        <HeroLight />
        <OrbitControls
          enabledPan={false}
          enableZoom={!isTablet}
          maxDistance={20}
          minDistance={5}
          minPolarAngle={Math.PI / 5}
          maxPolarAngle={Math.PI / 2}
        />
        <group
          rotation={[0, -Math.PI / 10, 0]}
          scale={isMobile ? 0.7 : 1.7}
          position={[0.7, -2.5, 0]}
        >
          <Scene />
        </group>
      </Suspense>
    </Canvas>
  );
}

export default HeroExp;
