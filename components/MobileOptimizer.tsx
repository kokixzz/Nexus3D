'use client'

import { useEffect, useState } from 'react'

interface MobileOptimizerProps {
  onMobileDetected: (isMobile: boolean) => void
  onOrientationChange: (orientation: 'portrait' | 'landscape') => void
  onPerformanceMode: (mode: 'power-saver' | 'performance') => void
}

export default function MobileOptimizer({ 
  onMobileDetected, 
  onOrientationChange, 
  onPerformanceMode 
}: MobileOptimizerProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('landscape')
  const [batteryLevel, setBatteryLevel] = useState(1)
  const [isLowPowerMode, setIsLowPowerMode] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || 
                   /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                   'ontouchstart' in window
      setIsMobile(mobile)
      onMobileDetected(mobile)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [onMobileDetected])

  useEffect(() => {
    const handleOrientationChange = () => {
      const newOrientation = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
      setOrientation(newOrientation)
      onOrientationChange(newOrientation)
    }

    handleOrientationChange()
    window.addEventListener('orientationchange', handleOrientationChange)
    window.addEventListener('resize', handleOrientationChange)
    
    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange)
      window.removeEventListener('resize', handleOrientationChange)
    }
  }, [onOrientationChange])

  useEffect(() => {
    const checkBattery = async () => {
      try {
        // @ts-ignore - Battery API not in TypeScript yet
        const battery = await navigator.getBattery?.()
        if (battery) {
          setBatteryLevel(battery.level)
          setIsLowPowerMode(battery.level < 0.2 || battery.dischargingTime < 3600)
          
          battery.addEventListener('levelchange', () => {
            setBatteryLevel(battery.level)
            setIsLowPowerMode(battery.level < 0.2)
          })
        }
      } catch (error) {
        console.log('Battery API not supported')
      }
    }

    if (isMobile) {
      checkBattery()
    }
  }, [isMobile])

  useEffect(() => {
    const performanceMode = isLowPowerMode || batteryLevel < 0.3 ? 'power-saver' : 'performance'
    onPerformanceMode(performanceMode)
  }, [isLowPowerMode, batteryLevel, onPerformanceMode])

  useEffect(() => {
    if (isMobile) {
      const preventDefault = (e: Event) => e.preventDefault()
      document.addEventListener('contextmenu', preventDefault)
      return () => document.removeEventListener('contextmenu', preventDefault)
    }
  }, [isMobile])

  useEffect(() => {
    if (isMobile) {
      const preventDefault = (e: TouchEvent) => {
        if (e.touches.length > 1) {
          e.preventDefault()
        }
      }
      document.addEventListener('touchstart', preventDefault, { passive: false })
      document.addEventListener('touchmove', preventDefault, { passive: false })
      
      return () => {
        document.removeEventListener('touchstart', preventDefault)
        document.removeEventListener('touchmove', preventDefault)
      }
    }
  }, [isMobile])

  if (isMobile && isLowPowerMode) {
    return (
      <div className="fixed top-4 left-4 right-4 z-50 bg-yellow-500 text-white p-3 rounded-lg shadow-lg">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">
            Low battery - Quality reduced for better performance
          </span>
        </div>
      </div>
    )
  }

  if (isMobile && orientation === 'portrait') {
    return (
      <div className="fixed inset-0 bg-delft-900 z-50 flex items-center justify-center p-6">
        <div className="text-center text-white">
          <div className="text-6xl mb-4">📱</div>
          <h3 className="text-xl font-bold mb-2">Better Experience in Landscape</h3>
          <p className="text-delft-300 mb-4">
            Rotate your device for the best 3D viewing experience
          </p>
          <button 
            onClick={() => setOrientation('landscape')}
            className="bg-dutch-orange text-white px-6 py-2 rounded-lg font-semibold"
          >
            Continue Anyway
          </button>
        </div>
      </div>
    )
  }

  return null
} 