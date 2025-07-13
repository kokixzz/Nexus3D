import React from 'react'
import { Stats } from '@react-three/drei'

interface DreiStatsPanelProps {
  visible: boolean
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}

export default function DreiStatsPanel({ 
  visible, 
  position = 'top-left' 
}: DreiStatsPanelProps) {
  if (!visible) return null

  const getPositionClasses = () => {
    switch (position) {
      case 'top-right':
        return 'top-4 right-4'
      case 'bottom-left':
        return 'bottom-4 left-4'
      case 'bottom-right':
        return 'bottom-4 right-4'
      default:
        return 'top-4 left-4'
    }
  }

  return (
    <div className={`fixed ${getPositionClasses()} z-50 pointer-events-none`}>
      <div className="bg-delft-950/90 backdrop-blur-sm rounded-lg p-3 border border-delft-700/50">
        <div className="text-delft-100 font-bold text-sm mb-2">Performance</div>
        <div className="text-delft-400 text-xs mb-2">
          Real-time stats powered by Three.js
        </div>
        <div className="text-delft-500 text-xs text-center">
          🌷 Nextus 3D Performance 🌷
        </div>
        <div className="text-delft-400 text-xs text-center mt-1">
          Press [H] to hide
        </div>
      </div>
    </div>
  )
}

// Canvas Stats Component (to be used inside Canvas)
export function CanvasStats() {
  return <Stats showPanel={0} className="stats-panel" />
} 