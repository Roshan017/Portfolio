import React from "react";
import * as THREE from "three";
const HeroLight = () => {
  return (
    <>
      <ambientLight intensity={1} />
      <spotLight
        angle={0.3}
        intensity={300}
        position={[2, 4, 15]}
        color={"white"}
        penumbra={0.2}
      />

      <spotLight
        position={[3, 4, -1]}
        penumbra={0.2}
        intensity={30}
        angle={0.1}
        color={"gold"}
      />
      <pointLight
        angle={0.3}
        position={[-0.4, 0, 1.7]}
        intensity={20}
        color={"blue"}
        penumbra={0.4}
      />
      <primitive
        position={[1, 2, 4]}
        object={new THREE.RectAreaLight("blue", 8, 3, 2)}
        intensity={10}
        rotation={[-Math.PI / 4, Math.PI / 4, 0]}
      />
    </>
  );
};

export default HeroLight;
