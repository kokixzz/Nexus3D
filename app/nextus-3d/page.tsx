'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, PerspectiveCamera, Preload } from '@react-three/drei'
import LoadingScreen from '../../components/LoadingScreen'
import { useKeyboardControls } from '../../hooks/useKeyboardControls'

const ErasmusBridge = dynamic(() => import('../../components/ErasmusBridge'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-delft-100/20 animate-pulse" />,
})

const DutchTulip = dynamic(() => import('../../components/DutchTulip'), {
  ssr: false,
})

const DreiStatsPanel = dynamic(() => import('../../components/DreiStatsPanel'), {
  ssr: false,
})

const CanvasStats = dynamic(() => import('../../components/DreiStatsPanel').then(mod => ({ default: mod.CanvasStats })), {
  ssr: false,
})

function Scene3D() {
  const { showTulip, showPerformance } = useKeyboardControls()

  return (
    <>
      <Preload all />
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={0.8}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-10, -10, -10]} intensity={0.2} color="#4a90a4" />
      <Environment preset="city" />
      <PerspectiveCamera makeDefault position={[5, 3, 8]} fov={60} />
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={3}
        maxDistance={20}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
        autoRotate={false}
        autoRotateSpeed={0.5}
        enableDamping={true}
        dampingFactor={0.05}
      />
      <Suspense fallback={null}>
        <ErasmusBridge position={[0, 0, 0]} scale={1.2} />
      </Suspense>
      <Suspense fallback={null}>
        <DutchTulip 
          position={[3, 0, 2]} 
          visible={showTulip}
          scale={0.8}
        />
      </Suspense>
      {showPerformance && (
        <Suspense fallback={null}>
          <CanvasStats />
        </Suspense>
      )}
    </>
  )
}

export default function NextusPage() {
  const { showTulip, showPerformance } = useKeyboardControls()

  return (
    <div className="min-h-screen bg-gradient-to-br from-delft-50 to-delft-200 dark:from-delft-950 dark:to-delft-900">
      <link rel="preload" href="/_next/static/chunks/three.js" as="script" />
      <header className="absolute top-0 left-0 right-0 z-10 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-dutch-orange to-dutch-red rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-delft-800 dark:text-delft-100">
                Nextus 3D
              </h1>
              <p className="text-sm text-delft-600 dark:text-delft-300">
                Rotterdam Portfolio Experience
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-xs text-delft-600 dark:text-delft-400">
              NL / EN
            </div>
          </div>
        </div>
      </header>
      <div className="absolute bottom-6 left-6 z-10">
        <div className="bg-delft-800/90 backdrop-blur-sm rounded-lg p-4 max-w-sm border border-delft-700/50">
          <h3 className="text-delft-100 font-bold text-sm mb-2">Controls</h3>
          <div className="space-y-1 text-xs text-delft-300">
            <div className="flex justify-between">
              <span>Rotate:</span>
              <span className="text-delft-100">Mouse drag</span>
            </div>
            <div className="flex justify-between">
              <span>Zoom:</span>
              <span className="text-delft-100">Mouse wheel</span>
            </div>
            <div className="flex justify-between">
              <span>Show tulip:</span>
              <span className="text-delft-100 font-mono">[T]</span>
            </div>
            <div className="flex justify-between">
              <span>Performance:</span>
              <span className="text-delft-100 font-mono">[H]</span>
            </div>
            <div className="flex justify-between">
              <span>Hide all:</span>
              <span className="text-delft-100 font-mono">[ESC]</span>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-delft-700/50">
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${showTulip ? 'bg-green-400' : 'bg-delft-600'}`} />
                <span className="text-delft-300">Tulip</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${showPerformance ? 'bg-green-400' : 'bg-delft-600'}`} />
                <span className="text-delft-300">Stats</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-20 right-6 z-10">
        <div className="bg-delft-800/90 backdrop-blur-sm rounded-lg p-4 max-w-xs border border-delft-700/50">
          <h3 className="text-delft-100 font-bold text-sm mb-2">🏗️ Rotterdam</h3>
          <p className="text-xs text-delft-300 leading-relaxed">
            De iconische Erasmusbrug - het symbool van moderne Rotterdam. 
            Gebouwd in 1996, verbindt deze brug Noord en Zuid Rotterdam.
          </p>
          <div className="mt-3 pt-2 border-t border-delft-700/50">
            <div className="text-xs text-delft-400">
              <span className="text-delft-200">Tech:</span> Next.js 14 + React Three Fiber
            </div>
          </div>
        </div>
      </div>
      <Canvas
        shadows
        className="w-full h-screen"
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        gl={{ 
          antialias: true,
          alpha: false,
          powerPreference: "high-performance"
        }}
      >
        <Suspense fallback={null}>
          <Scene3D />
        </Suspense>
      </Canvas>
      <Suspense fallback={null}>
        <DreiStatsPanel visible={showPerformance} position="top-right" />
      </Suspense>
      <footer className="absolute bottom-6 right-6 z-10">
        <div className="text-xs text-delft-600 dark:text-delft-400">
          Made with ❤️ in Rotterdam
        </div>
      </footer>
    </div>
  )
} 