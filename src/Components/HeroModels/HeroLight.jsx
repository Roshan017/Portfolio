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
        position={[1, 5, 5]}
        penumbra={0.5}
        intensity={120}
        angle={0.2}
        color={"white"}
      />
      <pointLight
        angle={0.3}
        position={[-0.4, 0, 1.2]}
        intensity={20}
        color={"blue"}
        penumbra={0.4}
      />
      <primitive
        position={[1, 2, 4]}
        object={new THREE.RectAreaLight("blue", 8, 3, 2)}
        intensity={20}
        rotation={[-Math.PI / 4, Math.PI / 4, 0]}
      />
    </>
  );
};

export default HeroLight;
