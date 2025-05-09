import { Canvas } from "@react-three/fiber";
import OrbitControlsWrapper from "../../Funtions/OrbitControls";
import { useMediaQuery } from "react-responsive";

function HeroExp() {
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
      <ambientLight intensity={0.2} color={"#1a1a40"} />
      <directionalLight position={[5, 5, 5]} intensity={5} />

      <OrbitControlsWrapper
        enabledPan={false}
        enableZoom={!isTablet}
        maxDistance={20}
        minDistance={5}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
      />

      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="teal" />
      </mesh>
    </Canvas>
  );
}

export default HeroExp;
