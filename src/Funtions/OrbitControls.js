import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useEffect, useRef } from "react";

export default function OrbitControlsWrapper({
  enableDamping = true,
  dampingFactor = 0.05,
  enablePan = true,
  enableZoom = true,
  enableRotate = true,
  autoRotate = false,
  autoRotateSpeed = 2.0,
  minDistance = 1,
  maxDistance = 1000,
  minPolarAngle = 0,
  maxPolarAngle = Math.PI,
  minAzimuthAngle = -Infinity,
  maxAzimuthAngle = Infinity,
  target = [0, 0, 0], // Optional: center of orbit
}) {
  const { camera, gl } = useThree();
  const controls = useRef();

  useEffect(() => {
    controls.current = new OrbitControls(camera, gl.domElement);
    const ctrl = controls.current;

    ctrl.enableDamping = enableDamping;
    ctrl.dampingFactor = dampingFactor;
    ctrl.enablePan = enablePan;
    ctrl.enableZoom = enableZoom;
    ctrl.enableRotate = enableRotate;
    ctrl.autoRotate = autoRotate;
    ctrl.autoRotateSpeed = autoRotateSpeed;
    ctrl.minDistance = minDistance;
    ctrl.maxDistance = maxDistance;
    ctrl.minPolarAngle = minPolarAngle;
    ctrl.maxPolarAngle = maxPolarAngle;
    ctrl.minAzimuthAngle = minAzimuthAngle;
    ctrl.maxAzimuthAngle = maxAzimuthAngle;
    ctrl.target.set(...target);

    ctrl.update();

    return () => {
      ctrl.dispose();
    };
  }, [
    camera,
    gl,
    enableDamping,
    dampingFactor,
    enablePan,
    enableZoom,
    enableRotate,
    autoRotate,
    autoRotateSpeed,
    minDistance,
    maxDistance,
    minPolarAngle,
    maxPolarAngle,
    minAzimuthAngle,
    maxAzimuthAngle,
    target,
  ]);

  useFrame(() => {
    controls.current?.update();
  });

  return null;
}
