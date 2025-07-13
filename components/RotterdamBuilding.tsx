'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface RotterdamBuildingProps {
  isMobile?: boolean
}

export default function RotterdamBuilding({ isMobile = false }: RotterdamBuildingProps) {
  const buildingRef = useRef<THREE.Group>(null)
  const materialsRef = useRef<THREE.MeshStandardMaterial[]>([])

  // Create materials with Dutch colors
  const materials = useMemo(() => {
    const delftBlue = new THREE.MeshStandardMaterial({
      color: '#0284c7',
      roughness: 0.1,
      metalness: 0.8,
    })
    
    const dutchOrange = new THREE.MeshStandardMaterial({
      color: '#ff6600',
      roughness: 0.3,
      metalness: 0.2,
    })
    
    const glass = new THREE.MeshStandardMaterial({
      color: '#e2e8f0',
      roughness: 0.1,
      metalness: 0.9,
      transparent: true,
      opacity: 0.8,
    })
    
    const concrete = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.8,
      metalness: 0.1,
    })

    materialsRef.current = [delftBlue, dutchOrange, glass, concrete]
    return { delftBlue, dutchOrange, glass, concrete }
  }, [])

  // Animation loop
  useFrame((state) => {
    if (buildingRef.current) {
      // Subtle floating animation
      buildingRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      
      // Subtle rotation
      buildingRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.02
    }
  })

  return (
    <group ref={buildingRef} position={[0, 0, 0]}>
      {/* Main Tower - Inspired by Rotterdam's modern architecture */}
      <mesh
        position={[0, 2, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[2, 8, 2]} />
        <primitive object={materials.delftBlue} attach="material" />
      </mesh>

      {/* Secondary Tower */}
      <mesh
        position={[3, 1, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1.5, 6, 1.5]} />
        <primitive object={materials.dutchOrange} attach="material" />
      </mesh>

      {/* Glass Connector - Modern Dutch design */}
      <mesh
        position={[1.5, 4, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[4, 0.5, 1]} />
        <primitive object={materials.glass} attach="material" />
      </mesh>

      {/* Base Platform */}
      <mesh
        position={[0, -1.75, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[6, 0.5, 4]} />
        <primitive object={materials.concrete} attach="material" />
      </mesh>

      {/* Decorative Elements - Dutch tiles inspired */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 8) * Math.PI * 2) * 3,
            3 + Math.sin((i / 8) * Math.PI * 4) * 0.5,
            Math.sin((i / 8) * Math.PI * 2) * 3,
          ]}
          castShadow
        >
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshStandardMaterial color={i % 2 === 0 ? '#0284c7' : '#ff6600'} />
        </mesh>
      ))}

      {/* Windmill Reference - Subtle nod to Dutch heritage */}
      <group position={[5, 2, 5]}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.1, 4, 0.1]} />
          <primitive object={materials.concrete} attach="material" />
        </mesh>
        {/* Windmill blades */}
        {Array.from({ length: 4 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              Math.cos((i / 4) * Math.PI * 2) * 1,
              2 + Math.sin((i / 4) * Math.PI * 2) * 1,
              0,
            ]}
            rotation={[0, 0, (i / 4) * Math.PI * 2]}
            castShadow
          >
            <boxGeometry args={[2, 0.05, 0.2]} />
            <meshStandardMaterial color="#94a3b8" />
          </mesh>
        ))}
      </group>

      {/* Water Feature - Canal reference */}
      <mesh
        position={[0, -2.2, 8]}
        receiveShadow
      >
        <boxGeometry args={[12, 0.1, 2]} />
        <meshStandardMaterial 
          color="#0284c7" 
          transparent 
          opacity={0.7}
          roughness={0}
          metalness={0.1}
        />
      </mesh>
    </group>
  )
} 