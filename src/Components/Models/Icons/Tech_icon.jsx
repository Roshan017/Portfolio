import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useMediaQuery } from "react-responsive";
import { AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";

import TechIconScene from "./TechIconScene";

const Tech_icon = ({ model }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <Canvas
      dpr={[1, Math.min(window.devicePixelRatio, 2)]}
      camera={{ position: [0, 0, 6], fov: 50 }}
      style={{ touchAction: "none", pointerEvents: "none" }}
    >
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      <Suspense fallback={null}>
        <TechIconScene model={model} isMobile={isMobile} />
      </Suspense>
    </Canvas>
  );
};

export default Tech_icon;
