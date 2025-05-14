import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { useGLTF } from "@react-three/drei";
import { Suspense } from "react";

import HeroLight from "./HeroLight";
import Particles from "./Particles";

function HeroExp() {
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const New = useGLTF("/models/New-transformed.glb");
  return (
    <Canvas shadows camera={{ position: [0, 0, 15], fov: 45 }}>
      <Suspense fallback={null}>
        <HeroLight />
        <Particles count={100} />
        <OrbitControls
          enablePan={false}
          enableZoom={!isTablet}
          maxDistance={20}
          minDistance={5}
          minPolarAngle={Math.PI / 5}
          maxPolarAngle={Math.PI / 2}
          minAzimuthAngle={-Math.PI / 3} // Left limit
          maxAzimuthAngle={Math.PI / 4} // Right limit
        />

        <group
          rotation={isMobile ? [-0, -Math.PI / 3.5, 0] : [0, -Math.PI / 3.5, 0]}
          scale={isMobile ? 1.95 : 2.5}
          position={isMobile ? [2.25, -4.45, 0] : [2.65, -3, 0]}
        >
          <primitive object={New.scene} />
        </group>
      </Suspense>
    </Canvas>
  );
}

export default HeroExp;
