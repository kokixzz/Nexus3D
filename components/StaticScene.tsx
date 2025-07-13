'use client'

import { Canvas } from '@react-three/fiber'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function NexusStructure() {
  const groupRef = useRef<THREE.Group>(null!)
  const node1Ref = useRef<THREE.Mesh>(null!)
  const node2Ref = useRef<THREE.Mesh>(null!)
  const node3Ref = useRef<THREE.Mesh>(null!)
  
  // Gentle rotation for the whole structure
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15
    }
    // Individual node subtle movements
    if (node1Ref.current) {
      node1Ref.current.rotation.x += delta * 0.2
    }
    if (node2Ref.current) {
      node2Ref.current.rotation.z += delta * 0.15
    }
    if (node3Ref.current) {
      node3Ref.current.rotation.y += delta * 0.25
    }
  })

  return (
    <group ref={groupRef}>
      {/* Central Hub - The Nexus Core */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <octahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial 
          color="#0284c7"
          metalness={0.3}
          roughness={0.2}
          emissive="#0284c7"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Connection Nodes */}
      <mesh ref={node1Ref} position={[2.5, 1.5, 0]} castShadow receiveShadow>
        <icosahedronGeometry args={[0.6, 0]} />
        <meshStandardMaterial 
          color="#f97316"
          metalness={0.4}
          roughness={0.3}
        />
      </mesh>
      
      <mesh ref={node2Ref} position={[-2.2, -1.2, 1]} castShadow receiveShadow>
        <dodecahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial 
          color="#1e40af"
          metalness={0.2}
          roughness={0.4}
          emissive="#1e40af"
          emissiveIntensity={0.05}
        />
      </mesh>
      
      <mesh ref={node3Ref} position={[1.8, -1.8, -1.5]} castShadow receiveShadow>
        <tetrahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial 
          color="#f97316"
          metalness={0.5}
          roughness={0.1}
        />
      </mesh>
      
      {/* Connection Lines/Tubes */}
      <mesh position={[1.25, 0.75, 0]} rotation={[0, 0, Math.PI / 6]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 2.5, 8]} />
        <meshStandardMaterial 
          color="#64748b"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      <mesh position={[-1.1, -0.6, 0.5]} rotation={[0, 0, -Math.PI / 4]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 2.2, 8]} />
        <meshStandardMaterial 
          color="#64748b"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      <mesh position={[0.9, -0.9, -0.75]} rotation={[Math.PI / 6, 0, Math.PI / 8]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 2.8, 8]} />
        <meshStandardMaterial 
          color="#64748b"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Floating Accent Rings */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2, 0.1, 8, 16]} />
        <meshStandardMaterial 
          color="#0284c7"
          metalness={0.6}
          roughness={0.3}
          transparent
          opacity={0.4}
        />
      </mesh>
      
      <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[2.5, 0.08, 8, 16]} />
        <meshStandardMaterial 
          color="#f97316"
          metalness={0.6}
          roughness={0.3}
          transparent
          opacity={0.3}
        />
      </mesh>
      
      {/* Ground Plane */}
      <mesh position={[0, -3, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial 
          color="#64748b" 
          opacity={0.1} 
          transparent 
        />
      </mesh>
    </group>
  )
}

export default function StaticScene() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [4, 2, 6], fov: 45 }}
        gl={{ antialias: true }}
        shadows
      >
        {/* Softer lighting for background effect */}
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[8, 8, 5]} 
          intensity={0.8}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-8, -8, -8]} intensity={0.3} color="#0284c7" />
        
        {/* Static 3D Content - No Controls */}
        <NexusStructure />
      </Canvas>
    </div>
  )
} 