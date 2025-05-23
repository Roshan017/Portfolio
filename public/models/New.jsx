/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 New.glb -T 
Files: New.glb [3.48MB] > C:\Users\Roshan Mathew\Desktop\CODE\Portfolio\public\models\New-transformed.glb [1.24MB] (64%)
Author: QuickDriftVR (https://sketchfab.com/QuickDriftVR)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/headphones-2f54d1c5d3c943bfadc72ab656587c90
Title: Headphones
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/New-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <pointLight intensity={1} decay={2} position={[-1.051, 1.14, 0.479]} rotation={[-1.869, -0.542, 2.605]} scale={0.005} />
      <group position={[-32.018, -4.706, -0.278]} scale={0.002}>
        <mesh geometry={nodes.mesh_0.geometry} material={materials.Desk_1} />
        <mesh geometry={nodes.mesh_0_1.geometry} material={materials.Posters} />
        <mesh geometry={nodes.mesh_0_2.geometry} material={materials.Keyboard} />
        <mesh geometry={nodes.mesh_0_3.geometry} material={materials.PaletteMaterial001} />
        <mesh geometry={nodes.mesh_0_4.geometry} material={materials.Carpet} />
        <mesh geometry={nodes.mesh_0_5.geometry} material={materials.PaletteMaterial002} />
        <mesh geometry={nodes.mesh_0_6.geometry} material={materials.PaletteMaterial003} />
        <mesh geometry={nodes.mesh_0_7.geometry} material={materials.Trim_Sheet_Wall} />
        <mesh geometry={nodes.mesh_0_8.geometry} material={materials.Monitor_Single} />
      </group>
      <group position={[-32.018, -4.706, -0.278]} scale={0.002}>
        <mesh geometry={nodes.mesh_2.geometry} material={materials.PaletteMaterial005} />
        <mesh geometry={nodes.mesh_2_1.geometry} material={materials.PaletteMaterial004} />
        <mesh geometry={nodes.mesh_2_2.geometry} material={materials.lambert1} />
      </group>
      <mesh geometry={nodes.mesh_1.geometry} material={nodes.mesh_1.material} position={[-14.727, -0.754, -0.303]} scale={0.001} />
      <mesh geometry={nodes.mesh_3.geometry} material={nodes.mesh_3.material} position={[-2.188, -3.356, 20.156]} rotation={[0, Math.PI / 2, 0]} scale={[0.001, 0.002, 0.002]} />
      <mesh geometry={nodes.mesh_4.geometry} material={nodes.mesh_4.material} position={[-2.079, -1.331, 20.807]} rotation={[0, Math.PI / 2, 0]} scale={0.001} />
    </group>
  )
}

useGLTF.preload('/New-transformed.glb')
