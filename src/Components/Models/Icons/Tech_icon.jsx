import { Environment, Float, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const Tech_icon = ({ model }) => {
  const scene = useGLTF(model.modelPath);

  return (
    <Canvas>
      <ambientLight intensity={0.3} />
      <directionalLight position={[0, 0, 4]} intensity={0.6} />
      <OrbitControls enableZoom={false} />
      <Environment preset="city" />
      <Float speed={5.5} rotationIntensity={1.2} floatIntensity={2}>
        <group scale={model.scale}>
          <primitive object={scene.scene} rotation={model.rotation} />
        </group>
      </Float>
    </Canvas>
  );
};

export default Tech_icon;
