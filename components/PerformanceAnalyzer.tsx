'use client'

import { useState, useEffect, useRef } from 'react'
import { usePerformance } from '../hooks/usePerformance'

interface PerformanceReport {
  timestamp: number
  fps: number
  renderTime: number
  gpuMemory: number
  grade: string
  lighthouseScore: number
  suggestions: string[]
}

export default function PerformanceAnalyzer() {
  const { metrics, qualitySettings, getOptimizationSuggestions } = usePerformance()
  const [isVisible, setIsVisible] = useState(false)
  const [reports, setReports] = useState<PerformanceReport[]>([])
  const [currentReport, setCurrentReport] = useState<PerformanceReport | null>(null)
  const intervalRef = useRef<NodeJS.Timeout>()

  // Generate performance report
  const generateReport = () => {
    const suggestions = getOptimizationSuggestions()
    const lighthouseScore = estimateLighthouseScore()
    
    const report: PerformanceReport = {
      timestamp: Date.now(),
      fps: metrics.fps,
      renderTime: metrics.renderTime,
      gpuMemory: metrics.gpuMemory,
      grade: metrics.grade,
      lighthouseScore,
      suggestions
    }
    
    setCurrentReport(report)
    setReports(prev => [...prev.slice(-9), report]) // Keep last 10 reports
  }

  // Estimate Lighthouse score based on performance metrics
  const estimateLighthouseScore = () => {
    const fpsScore = metrics.fps >= 60 ? 100 : Math.max(0, (metrics.fps / 60) * 100)
    const renderTimeScore = metrics.renderTime <= 16.67 ? 100 : Math.max(0, 100 - (metrics.renderTime - 16.67) * 2)
    const memoryScore = metrics.gpuMemory <= 100 ? 100 : Math.max(0, 100 - (metrics.gpuMemory - 100))
    
    return Math.round((fpsScore + renderTimeScore + memoryScore) / 3)
  }

  // Auto-generate reports
  useEffect(() => {
    if (isVisible) {
      generateReport()
      intervalRef.current = setInterval(generateReport, 5000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isVisible, metrics])

  // Keyboard shortcut to toggle analyzer
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'p' && e.ctrlKey) {
        e.preventDefault()
        setIsVisible(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed top-4 right-4 z-50 bg-delft-600 text-white p-2 rounded-lg shadow-lg hover:bg-delft-700 transition-colors"
        title="Performance Analyzer (Ctrl+P)"
      >
        📊
      </button>
    )
  }

  return (
    <div className="fixed top-4 right-4 z-50 bg-white dark:bg-delft-900 rounded-lg shadow-2xl p-4 w-80 max-h-96 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-delft-900 dark:text-delft-100">
          Performance Analyzer
        </h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-delft-500 hover:text-delft-700 transition-colors"
        >
          ✕
        </button>
      </div>

      {/* Current Metrics */}
      <div className="mb-4 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-delft-600 dark:text-delft-400">FPS</span>
          <span className={`text-sm font-bold ${metrics.fps >= 55 ? 'text-green-600' : metrics.fps >= 30 ? 'text-yellow-600' : 'text-red-600'}`}>
            {metrics.fps}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-delft-600 dark:text-delft-400">Render Time</span>
          <span className={`text-sm font-bold ${metrics.renderTime <= 16.67 ? 'text-green-600' : metrics.renderTime <= 33.33 ? 'text-yellow-600' : 'text-red-600'}`}>
            {metrics.renderTime.toFixed(1)}ms
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-delft-600 dark:text-delft-400">GPU Memory</span>
          <span className={`text-sm font-bold ${metrics.gpuMemory <= 100 ? 'text-green-600' : metrics.gpuMemory <= 200 ? 'text-yellow-600' : 'text-red-600'}`}>
            {metrics.gpuMemory.toFixed(1)}MB
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-delft-600 dark:text-delft-400">Grade</span>
          <span className={`text-sm font-bold px-2 py-1 rounded ${
            metrics.grade === 'A' ? 'bg-green-100 text-green-800' :
            metrics.grade === 'B' ? 'bg-yellow-100 text-yellow-800' :
            metrics.grade === 'C' ? 'bg-orange-100 text-orange-800' :
            'bg-red-100 text-red-800'
          }`}>
            {metrics.grade}
          </span>
        </div>
      </div>

      {/* Lighthouse Score */}
      {currentReport && (
        <div className="mb-4 p-3 bg-delft-50 dark:bg-delft-800 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-delft-700 dark:text-delft-300">
              Lighthouse Score
            </span>
            <div className="flex items-center space-x-2">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                currentReport.lighthouseScore >= 90 ? 'bg-green-500' :
                currentReport.lighthouseScore >= 70 ? 'bg-yellow-500' :
                currentReport.lighthouseScore >= 50 ? 'bg-orange-500' :
                'bg-red-500'
              }`}>
                {currentReport.lighthouseScore}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quality Settings */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-delft-700 dark:text-delft-300 mb-2">
          Current Quality Settings
        </h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>Pixel Ratio: {qualitySettings.pixelRatio}</div>
          <div>Shadows: {qualitySettings.shadows ? '✓' : '✗'}</div>
          <div>Antialias: {qualitySettings.antialias ? '✓' : '✗'}</div>
          <div>Max Lights: {qualitySettings.maxLights}</div>
        </div>
      </div>

      {/* Optimization Suggestions */}
      {currentReport && currentReport.suggestions.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-delft-700 dark:text-delft-300 mb-2">
            Optimization Suggestions
          </h4>
          <ul className="text-xs text-delft-600 dark:text-delft-400 space-y-1">
            {currentReport.suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start">
                <span className="text-dutch-orange mr-1">•</span>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Performance History */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-delft-700 dark:text-delft-300 mb-2">
          Performance History
        </h4>
        <div className="h-16 flex items-end space-x-1">
          {reports.slice(-10).map((report, index) => (
            <div
              key={index}
              className={`w-3 rounded-t ${
                report.grade === 'A' ? 'bg-green-500' :
                report.grade === 'B' ? 'bg-yellow-500' :
                report.grade === 'C' ? 'bg-orange-500' :
                'bg-red-500'
              }`}
              style={{ height: `${(report.fps / 60) * 100}%` }}
              title={`${report.fps} FPS - Grade ${report.grade}`}
            />
          ))}
        </div>
      </div>

      {/* Export Report */}
      <div className="flex space-x-2">
        <button
          onClick={() => {
            const dataStr = JSON.stringify(reports, null, 2)
            const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
            const exportFileDefaultName = 'nexus-3d-performance-report.json'
            
            const linkElement = document.createElement('a')
            linkElement.setAttribute('href', dataUri)
            linkElement.setAttribute('download', exportFileDefaultName)
            linkElement.click()
          }}
          className="flex-1 bg-delft-600 text-white px-3 py-1 rounded text-xs hover:bg-delft-700 transition-colors"
        >
          Export Report
        </button>
        <button
          onClick={() => setReports([])}
          className="flex-1 bg-delft-200 text-delft-800 px-3 py-1 rounded text-xs hover:bg-delft-300 transition-colors"
        >
          Clear History
        </button>
      </div>

      {/* Keyboard Shortcut Hint */}
      <div className="mt-2 text-xs text-delft-400 text-center">
        Press Ctrl+P to toggle
      </div>
    </div>
  )
} 