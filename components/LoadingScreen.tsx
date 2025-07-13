'use client'

import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('Starting...')

  useEffect(() => {
    const stages = [
      { progress: 20, text: 'Loading Three.js...' },
      { progress: 40, text: 'Building Rotterdam scene...' },
      { progress: 60, text: 'Optimizing materials...' },
      { progress: 80, text: 'Preparing animations...' },
      { progress: 100, text: 'Ready!' },
    ]

    let currentStage = 0
    const interval = setInterval(() => {
      if (currentStage < stages.length) {
        setProgress(stages[currentStage].progress)
        setLoadingText(stages[currentStage].text)
        currentStage++
      } else {
        clearInterval(interval)
      }
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-delft-50 to-delft-100 dark:from-delft-900 dark:to-delft-950 z-50">
      <div className="text-center">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-dutch-orange to-dutch-red rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-slow">
            <span className="text-white font-bold text-2xl">N</span>
          </div>
          <h1 className="text-3xl font-bold text-delft-900 dark:text-delft-100 mb-2">
            Nexus 3D
          </h1>
          <p className="text-delft-600 dark:text-delft-400">
            Rotterdam Portfolio Experience
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-80 max-w-sm mx-auto">
          <div className="bg-delft-200 dark:bg-delft-800 rounded-full h-3 mb-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-dutch-orange to-dutch-red h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-delft-700 dark:text-delft-300 text-sm font-medium">
            {loadingText}
          </p>
        </div>

        {/* Loading Animation */}
        <div className="mt-8 flex justify-center space-x-2">
          <div className="w-3 h-3 bg-dutch-orange rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-dutch-orange rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-dutch-orange rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>

        {/* Shimmer Effect */}
        <div className="mt-6 w-64 h-2 bg-delft-200 dark:bg-delft-800 rounded-full mx-auto shimmer"></div>

        {/* Performance Tip */}
        <div className="mt-8 text-xs text-delft-500 dark:text-delft-500 max-w-md mx-auto">
          <p>
            💡 Tip: Use Chrome or Firefox with hardware acceleration for best performance
          </p>
        </div>
      </div>
    </div>
  )
} 