import { Environment, Float, OrbitControls, useGLTF } from "@react-three/drei";

const TechIconScene = ({ model }) => {
  const gltf = useGLTF(model.modelPath);

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[0, 0, 4]} intensity={0.6} />

      <OrbitControls enableZoom={false} enablePan={false} />

      <Environment preset="city" />

      <Float speed={3} rotationIntensity={0.8} floatIntensity={1.2}>
        <group scale={model.scale}>
          <primitive object={gltf.scene} rotation={model.rotation} />
        </group>
      </Float>
    </>
  );
};

export default TechIconScene;
