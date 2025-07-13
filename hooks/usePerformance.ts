'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { getDeviceCapabilities, getQualitySettings, PerformanceTracker } from '../utils/performance'

export interface PerformanceMetrics {
  fps: number
  renderTime: number
  gpuMemory: number
  grade: string
  isOptimal: boolean
}

export interface QualitySettings {
  pixelRatio: number
  shadows: boolean
  antialias: boolean
  toneMapping: boolean
  environmentLighting: boolean
  postProcessing: boolean
  maxLights: number
  shadowMapSize: number
}

export const usePerformance = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    renderTime: 16.67,
    gpuMemory: 0,
    grade: 'A',
    isOptimal: true,
  })
  
  const [qualitySettings, setQualitySettings] = useState<QualitySettings>({
    pixelRatio: 1,
    shadows: true,
    antialias: true,
    toneMapping: true,
    environmentLighting: true,
    postProcessing: false,
    maxLights: 4,
    shadowMapSize: 1024,
  })
  
  const [isAdaptiveQuality, setIsAdaptiveQuality] = useState(true)
  const trackerRef = useRef<PerformanceTracker>(new PerformanceTracker())
  const lastOptimizationRef = useRef<number>(0)
  const optimizationCooldown = 5000 // 5 seconds

  // Initialize quality settings based on device capabilities
  useEffect(() => {
    const capabilities = getDeviceCapabilities()
    const initialSettings = getQualitySettings(capabilities)
    setQualitySettings(initialSettings)
  }, [])

  // Update performance metrics
  const updateMetrics = useCallback((newMetrics: Partial<PerformanceMetrics>) => {
    setMetrics(prev => {
      const updated = { ...prev, ...newMetrics }
      
      if (newMetrics.fps !== undefined) {
        trackerRef.current.updateFPS(newMetrics.fps)
      }
      
      if (newMetrics.renderTime !== undefined) {
        trackerRef.current.updateRenderTime(newMetrics.renderTime)
      }
      
      updated.grade = trackerRef.current.getPerformanceGrade()
      updated.isOptimal = trackerRef.current.isPerformanceGood()
      
      return updated
    })
  }, [])

  // Adaptive quality adjustment
  const adjustQuality = useCallback((direction: 'up' | 'down') => {
    if (!isAdaptiveQuality) return
    
    const now = Date.now()
    if (now - lastOptimizationRef.current < optimizationCooldown) return
    
    lastOptimizationRef.current = now
    
    setQualitySettings(prev => {
      const newSettings = { ...prev }
      
      if (direction === 'down') {
        // Reduce quality for better performance
        if (newSettings.shadowMapSize > 512) {
          newSettings.shadowMapSize = Math.max(512, newSettings.shadowMapSize / 2)
        } else if (newSettings.shadows) {
          newSettings.shadows = false
        } else if (newSettings.antialias) {
          newSettings.antialias = false
        } else if (newSettings.environmentLighting) {
          newSettings.environmentLighting = false
        } else if (newSettings.maxLights > 2) {
          newSettings.maxLights = Math.max(2, newSettings.maxLights - 1)
        } else if (newSettings.pixelRatio > 1) {
          newSettings.pixelRatio = Math.max(0.5, newSettings.pixelRatio - 0.25)
        }
      } else {
        // Increase quality for better visuals
        if (newSettings.pixelRatio < 2) {
          newSettings.pixelRatio = Math.min(2, newSettings.pixelRatio + 0.25)
        } else if (newSettings.maxLights < 8) {
          newSettings.maxLights = Math.min(8, newSettings.maxLights + 1)
        } else if (!newSettings.environmentLighting) {
          newSettings.environmentLighting = true
        } else if (!newSettings.antialias) {
          newSettings.antialias = true
        } else if (!newSettings.shadows) {
          newSettings.shadows = true
        } else if (newSettings.shadowMapSize < 2048) {
          newSettings.shadowMapSize = Math.min(2048, newSettings.shadowMapSize * 2)
        }
      }
      
      return newSettings
    })
  }, [isAdaptiveQuality])

  // Auto-optimization based on performance
  useEffect(() => {
    if (!isAdaptiveQuality) return
    
    const { fps, isOptimal } = metrics
    
    if (fps < 30) {
      adjustQuality('down')
    } else if (fps > 55 && isOptimal) {
      adjustQuality('up')
    }
  }, [metrics.fps, metrics.isOptimal, adjustQuality, isAdaptiveQuality])

  // Performance monitoring
  const startPerformanceMonitoring = useCallback(() => {
    let frameCount = 0
    let lastTime = performance.now()
    
    const measurePerformance = () => {
      frameCount++
      const currentTime = performance.now()
      const deltaTime = currentTime - lastTime
      
      if (deltaTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / deltaTime)
        const renderTime = deltaTime / frameCount
        
        updateMetrics({ fps, renderTime })
        
        frameCount = 0
        lastTime = currentTime
      }
      
      requestAnimationFrame(measurePerformance)
    }
    
    measurePerformance()
  }, [updateMetrics])

  // Get performance suggestions
  const getOptimizationSuggestions = useCallback(() => {
    const suggestions = []
    
    if (metrics.fps < 30) {
      suggestions.push('Consider reducing shadow quality')
      suggestions.push('Disable anti-aliasing')
      suggestions.push('Lower pixel ratio')
    }
    
    if (metrics.gpuMemory > 100) {
      suggestions.push('Reduce texture sizes')
      suggestions.push('Use simpler geometry')
      suggestions.push('Implement level-of-detail (LOD)')
    }
    
    if (metrics.renderTime > 20) {
      suggestions.push('Optimize materials')
      suggestions.push('Reduce lighting complexity')
      suggestions.push('Use frustum culling')
    }
    
    return suggestions
  }, [metrics])

  // Manual quality adjustment
  const setManualQuality = useCallback((settings: Partial<QualitySettings>) => {
    setQualitySettings(prev => ({ ...prev, ...settings }))
  }, [])

  // Toggle adaptive quality
  const toggleAdaptiveQuality = useCallback(() => {
    setIsAdaptiveQuality(prev => !prev)
  }, [])

  return {
    metrics,
    qualitySettings,
    isAdaptiveQuality,
    updateMetrics,
    adjustQuality,
    startPerformanceMonitoring,
    getOptimizationSuggestions,
    setManualQuality,
    toggleAdaptiveQuality,
  }
} 