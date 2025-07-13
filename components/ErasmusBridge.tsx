import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Cylinder, Sphere } from '@react-three/drei'
import * as THREE from 'three'

interface ErasmusBridgeProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  autoRotate?: boolean
}

export default function ErasmusBridge({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0], 
  scale = 1,
  autoRotate = true 
}: ErasmusBridgeProps) {
  const groupRef = useRef<THREE.Group>(null)
  
  // Reduced auto-rotation for better performance
  useFrame((state) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += 0.001
    }
  })

  // Simplified materials with Rotterdam colors
  const materials = useMemo(() => ({
    steel: new THREE.MeshBasicMaterial({ color: '#c0c0c0' }),
    cable: new THREE.MeshBasicMaterial({ color: '#ffffff' }),
    deck: new THREE.MeshBasicMaterial({ color: '#4a5568' }),
    pylon: new THREE.MeshBasicMaterial({ color: '#e2e8f0' }),
    water: new THREE.MeshBasicMaterial({ 
      color: '#4a90a4',
      transparent: true,
      opacity: 0.7,
    }),
  }), [])

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Main Pylon (Simplified) */}
      <group position={[0, 0, 0]}>
        <Box args={[0.3, 0.2, 0.3]} position={[0, -0.1, 0]} material={materials.steel} />
        <Box args={[0.15, 3, 0.15]} position={[0, 1.5, 0]} material={materials.pylon} />
        <Box 
          args={[0.1, 2.5, 0.1]} 
          position={[0.8, 1.2, 0]} 
          rotation={[0, 0, -0.3]} 
          material={materials.steel} 
        />
        <Sphere args={[0.1]} position={[0, 3, 0]} material={materials.steel} />
      </group>

      {/* Simplified Bridge Deck */}
      <group position={[0, 0.5, 0]}>
        <Box args={[4, 0.05, 0.4]} position={[-1, 0, 0]} material={materials.deck} />
        <Box args={[4, 0.05, 0.4]} position={[1, 0, 0]} material={materials.deck} />
      </group>

      {/* Simplified Cables (Reduced count) */}
      <group>
        {Array.from({ length: 4 }, (_, i) => {
          const x = -1.5 + (i * 1)
          const height = 2.5 - Math.abs(x) * 0.2
          return (
            <Cylinder
              key={i}
              args={[0.005, 0.005, height]}
              position={[x, height / 2 + 0.5, 0.2]}
              material={materials.cable}
            />
          )
        })}
      </group>

      {/* Simplified River */}
      <Box 
        args={[6, 0.01, 3]} 
        position={[0, -0.5, 0]} 
        material={materials.water} 
      />
    </group>
  )
} 