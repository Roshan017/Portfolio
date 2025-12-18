import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, useGLTF } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { Suspense } from "react";

import HeroLight from "./HeroLight";
import Particles from "./Particles";

useGLTF.preload("/models/New-transformed.glb");

function HeroExp() {
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const model = useGLTF("/models/New-transformed.glb");

  return (
    <Canvas shadows dpr={[1, 1.5]} camera={{ position: [0, 0, 15], fov: 45 }}>
      <Suspense fallback={<Html center>Loading...</Html>}>
        <HeroLight />

        {!isMobile && <Particles count={100} />}

        <OrbitControls
          enablePan={false}
          enableZoom={!isTablet}
          enableDamping={!isMobile}
          maxDistance={20}
          minDistance={5}
          minPolarAngle={Math.PI / 5}
          maxPolarAngle={Math.PI / 2}
          minAzimuthAngle={-Math.PI / 3}
          maxAzimuthAngle={Math.PI / 4}
        />

        <group
          rotation={[0, -Math.PI / 3.5, 0]}
          scale={isMobile ? 1.95 : 2.5}
          position={isMobile ? [2.25, -4.45, 0] : [2.65, -3, 0]}
        >
          <primitive object={model.scene} />
        </group>
      </Suspense>
    </Canvas>
  );
}

export default HeroExp;
