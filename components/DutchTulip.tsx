import React, { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Cylinder } from '@react-three/drei'
import * as THREE from 'three'

interface DutchTulipProps {
  position?: [number, number, number]
  visible?: boolean
  scale?: number
}

export default function DutchTulip({ 
  position = [0, 0, 0], 
  visible = false,
  scale = 1 
}: DutchTulipProps) {
  const groupRef = useRef<THREE.Group>(null)
  const sparkleRef = useRef<THREE.Group>(null)

  // Simplified Dutch tulip colors
  const materials = useMemo(() => ({
    redPetal: new THREE.MeshBasicMaterial({ 
      color: '#dc2626',
      transparent: true,
      opacity: 0,
    }),
    yellowPetal: new THREE.MeshBasicMaterial({ 
      color: '#f59e0b',
      transparent: true,
      opacity: 0,
    }),
    stem: new THREE.MeshBasicMaterial({ 
      color: '#16a34a',
      transparent: true,
      opacity: 0,
    }),
    leaf: new THREE.MeshBasicMaterial({ 
      color: '#15803d',
      transparent: true,
      opacity: 0,
    }),
    center: new THREE.MeshBasicMaterial({ 
      color: '#1f2937',
      transparent: true,
      opacity: 0,
    }),
  }), [])

  // Smooth fade animation
  useFrame((state, delta) => {
    if (groupRef.current) {
      const targetOpacity = visible ? 0.9 : 0
      
      // Animate all materials
      Object.values(materials).forEach(material => {
        material.opacity = THREE.MathUtils.lerp(material.opacity, targetOpacity, delta * 2)
      })

      // Gentle rotation when visible
      if (visible) {
        groupRef.current.rotation.y += delta * 0.3
      }
    }

    // Simple sparkle animation
    if (sparkleRef.current && visible) {
      sparkleRef.current.rotation.z += delta * 2
      sparkleRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.1)
    }
  })

  // Reset rotation when hidden
  useEffect(() => {
    if (!visible && groupRef.current) {
      groupRef.current.rotation.y = 0
    }
  }, [visible])

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Simplified Tulip Flower */}
      <group position={[0, 1, 0]}>
        {/* Red petals (simplified) */}
        <Sphere 
          args={[0.3, 8, 6]} 
          position={[0, 0, 0.2]} 
          material={materials.redPetal}
          scale={[1, 1.2, 0.8]}
        />
        <Sphere 
          args={[0.3, 8, 6]} 
          position={[0.2, 0, -0.1]} 
          material={materials.redPetal}
          scale={[0.8, 1.2, 1]}
        />
        
        {/* Yellow petals */}
        <Sphere 
          args={[0.25, 8, 6]} 
          position={[-0.2, 0, -0.1]} 
          material={materials.yellowPetal}
          scale={[0.8, 1.1, 1]}
        />
        
        {/* Center */}
        <Sphere args={[0.1]} position={[0, 0, 0]} material={materials.center} />
      </group>

      {/* Simplified Stem */}
      <Cylinder 
        args={[0.02, 0.03, 1]} 
        position={[0, 0.5, 0]} 
        material={materials.stem} 
      />

      {/* Simplified Leaves */}
      <group>
        <Sphere 
          args={[0.15, 8, 6]} 
          position={[0.3, 0.3, 0]} 
          material={materials.leaf}
          scale={[0.3, 1, 0.1]}
          rotation={[0, 0, 0.3]}
        />
        <Sphere 
          args={[0.15, 8, 6]} 
          position={[-0.3, 0.2, 0]} 
          material={materials.leaf}
          scale={[0.3, 1, 0.1]}
          rotation={[0, 0, -0.3]}
        />
      </group>

      {/* Simple Sparkle Effects */}
      {visible && (
        <group ref={sparkleRef} position={[0, 1.5, 0]}>
          <Sphere args={[0.02]} position={[0.3, 0, 0]} material={materials.yellowPetal} />
          <Sphere args={[0.02]} position={[-0.3, 0, 0]} material={materials.yellowPetal} />
          <Sphere args={[0.02]} position={[0, 0.3, 0]} material={materials.redPetal} />
          <Sphere args={[0.02]} position={[0, -0.3, 0]} material={materials.redPetal} />
        </group>
      )}
    </group>
  )
} 