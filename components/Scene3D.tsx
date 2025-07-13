'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stats } from '@react-three/drei'
import { Suspense, useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import RotterdamBuilding from './RotterdamBuilding'

import { usePerformance } from '../hooks/usePerformance'

function Scene() {
  const { qualitySettings } = usePerformance()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <>
      {/* Lighting - Adaptive based on quality settings */}
      <ambientLight intensity={isMobile ? 0.6 : 0.4} />
      {qualitySettings.shadows && (
        <directionalLight
          position={[10, 10, 5]}
          intensity={isMobile ? 0.8 : 1}
          castShadow
          shadow-mapSize={[qualitySettings.shadowMapSize, qualitySettings.shadowMapSize]}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
      )}
      <pointLight 
        position={[-10, -10, -10]} 
        intensity={isMobile ? 0.3 : 0.5} 
        color="#0284c7" 
      />
      
      {/* Simple environment lighting without Environment component */}
      {qualitySettings.environmentLighting && (
        <hemisphereLight
          args={["#87CEEB", "#654321", 0.3]}
        />
      )}
      
      {/* Ground */}
      <mesh receiveShadow position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#e2e8f0" />
      </mesh>
      
      {/* Rotterdam Building */}
      <Suspense fallback={null}>
        <RotterdamBuilding isMobile={isMobile} />
      </Suspense>
      
      {/* Controls - Mobile optimized */}
      <OrbitControls
        enablePan={!isMobile}
        enableZoom={true}
        enableRotate={true}
        minDistance={isMobile ? 3 : 5}
        maxDistance={isMobile ? 20 : 30}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
        autoRotate={true}
        autoRotateSpeed={isMobile ? 0.3 : 0.5}
        dampingFactor={isMobile ? 0.1 : 0.05}
        enableDamping={true}
        touches={{
          ONE: THREE.TOUCH.ROTATE,
          TWO: THREE.TOUCH.DOLLY_PAN,
        }}
        // Mobile-specific settings
        rotateSpeed={isMobile ? 0.5 : 1}
        zoomSpeed={isMobile ? 0.8 : 1}
        panSpeed={isMobile ? 0.5 : 1}
      />
      
      {/* Performance Monitor */}

      
      {/* Development Stats */}
      {process.env.NODE_ENV === 'development' && <Stats />}
    </>
  )
}

export default function Scene3D() {
  const { qualitySettings } = usePerformance()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
  }, [])

  return (
    <div className="w-full h-full canvas-container">
      <Canvas
        shadows={qualitySettings.shadows}
        dpr={[1, qualitySettings.pixelRatio]}
        gl={{
          powerPreference: isMobile ? 'default' : 'high-performance',
          antialias: qualitySettings.antialias,
          stencil: false,
          depth: true,
          alpha: false,
          // Mobile-specific optimizations
          preserveDrawingBuffer: false,
          failIfMajorPerformanceCaveat: isMobile,
        }}
        camera={{ 
          position: isMobile ? [8, 8, 8] : [10, 10, 10], 
          fov: isMobile ? 60 : 50 
        }}
        onCreated={({ gl }) => {
          if (qualitySettings.toneMapping) {
            gl.toneMapping = THREE.ACESFilmicToneMapping
            gl.toneMappingExposure = 1
            gl.outputEncoding = THREE.sRGBEncoding
          }
          
          // Mobile-specific settings
          if (isMobile) {
            gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
            gl.shadowMap.enabled = qualitySettings.shadows
            gl.shadowMap.type = THREE.PCFSoftShadowMap
          }
        }}
        performance={{ 
          min: isMobile ? 0.3 : 0.5, // Lower minimum for mobile
          max: isMobile ? 0.8 : 1.0,
          debounce: isMobile ? 500 : 200
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      
      {/* Mobile-specific UI overlays */}
      {isMobile && (
        <div className="absolute bottom-4 left-4 z-10 bg-white/90 dark:bg-delft-900/90 backdrop-blur-sm rounded-lg p-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-delft-500 rounded-full"></div>
            <span className="text-xs text-delft-700 dark:text-delft-300">
              Touch to rotate • Pinch to zoom
            </span>
          </div>
        </div>
      )}
    </div>
  )
} 