// Performance optimization utilities for Nexus 3D

/**
 * Device capability detection
 */
export const getDeviceCapabilities = () => {
  const canvas = document.createElement('canvas')
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
  
  if (!gl) {
    return { tier: 'low', supportsWebGL2: false }
  }

  const renderer = gl.getParameter(gl.RENDERER)
  const vendor = gl.getParameter(gl.VENDOR)
  const version = gl.getParameter(gl.VERSION)
  
  // Basic GPU tier detection
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  const isIntegratedGPU = /Intel|AMD.*Integrated|Mali|Adreno/i.test(renderer)
  const supportsWebGL2 = !!gl.getExtension('EXT_color_buffer_float')

  let tier: 'low' | 'medium' | 'high' = 'medium'
  
  if (isMobile || isIntegratedGPU) {
    tier = 'low'
  } else if (renderer.includes('GeForce') || renderer.includes('Radeon')) {
    tier = 'high'
  }

  return {
    tier,
    supportsWebGL2: !!gl.getExtension('EXT_color_buffer_float'),
    isMobile,
    renderer,
    vendor,
    version,
    maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
    maxViewportDims: gl.getParameter(gl.MAX_VIEWPORT_DIMS),
  }
}

/**
 * Quality settings based on device capabilities
 */
export const getQualitySettings = (capabilities: ReturnType<typeof getDeviceCapabilities>) => {
  const baseSettings = {
    pixelRatio: 1,
    shadows: true,
    antialias: true,
    toneMapping: true,
    environmentLighting: true,
    postProcessing: false,
    maxLights: 4,
    shadowMapSize: 1024,
  }

  switch (capabilities.tier) {
    case 'high':
      return {
        ...baseSettings,
        pixelRatio: Math.min(window.devicePixelRatio, 2),
        shadowMapSize: 2048,
        postProcessing: true,
        maxLights: 8,
      }
    
    case 'medium':
      return {
        ...baseSettings,
        pixelRatio: Math.min(window.devicePixelRatio, 1.5),
        shadowMapSize: 1024,
        maxLights: 4,
      }
    
    case 'low':
      return {
        ...baseSettings,
        pixelRatio: 1,
        shadows: false,
        antialias: false,
        environmentLighting: false,
        maxLights: 2,
        shadowMapSize: 512,
      }
    
    default:
      return baseSettings
  }
}

/**
 * Performance monitoring
 */
export class PerformanceTracker {
  private fps: number[] = []
  private renderTimes: number[] = []
  private maxSamples = 60

  updateFPS(fps: number) {
    this.fps.push(fps)
    if (this.fps.length > this.maxSamples) {
      this.fps.shift()
    }
  }

  updateRenderTime(time: number) {
    this.renderTimes.push(time)
    if (this.renderTimes.length > this.maxSamples) {
      this.renderTimes.shift()
    }
  }

  getAverageFPS() {
    return this.fps.reduce((a, b) => a + b, 0) / this.fps.length || 0
  }

  getAverageRenderTime() {
    return this.renderTimes.reduce((a, b) => a + b, 0) / this.renderTimes.length || 0
  }

  isPerformanceGood() {
    return this.getAverageFPS() >= 55 && this.getAverageRenderTime() < 16.67
  }

  getPerformanceGrade() {
    const avgFPS = this.getAverageFPS()
    const avgRenderTime = this.getAverageRenderTime()
    
    if (avgFPS >= 55 && avgRenderTime < 16.67) return 'A'
    if (avgFPS >= 45 && avgRenderTime < 22.22) return 'B'
    if (avgFPS >= 30 && avgRenderTime < 33.33) return 'C'
    return 'D'
  }
}

/**
 * Debounced resize handler
 */
export const createResizeHandler = (callback: () => void, delay = 250) => {
  let timeoutId: NodeJS.Timeout
  
  return () => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(callback, delay)
  }
}

/**
 * Memory management utilities
 */
export const disposeObject = (object: any) => {
  if (object.geometry) {
    object.geometry.dispose()
  }
  
  if (object.material) {
    if (Array.isArray(object.material)) {
      object.material.forEach((material: any) => {
        if (material.map) material.map.dispose()
        if (material.lightMap) material.lightMap.dispose()
        if (material.bumpMap) material.bumpMap.dispose()
        if (material.normalMap) material.normalMap.dispose()
        if (material.specularMap) material.specularMap.dispose()
        if (material.envMap) material.envMap.dispose()
        material.dispose()
      })
    } else {
      if (object.material.map) object.material.map.dispose()
      if (object.material.lightMap) object.material.lightMap.dispose()
      if (object.material.bumpMap) object.material.bumpMap.dispose()
      if (object.material.normalMap) object.material.normalMap.dispose()
      if (object.material.specularMap) object.material.specularMap.dispose()
      if (object.material.envMap) object.material.envMap.dispose()
      object.material.dispose()
    }
  }
}

/**
 * Lighthouse score estimation
 */
export const estimateLighthouseScore = (
  fcp: number, // First Contentful Paint
  lcp: number, // Largest Contentful Paint
  fid: number, // First Input Delay
  cls: number, // Cumulative Layout Shift
  ttfb: number // Time to First Byte
) => {
  const fcpScore = fcp <= 1800 ? 100 : Math.max(0, 100 - (fcp - 1800) / 50)
  const lcpScore = lcp <= 2500 ? 100 : Math.max(0, 100 - (lcp - 2500) / 50)
  const fidScore = fid <= 100 ? 100 : Math.max(0, 100 - (fid - 100) / 10)
  const clsScore = cls <= 0.1 ? 100 : Math.max(0, 100 - (cls - 0.1) * 1000)
  const ttfbScore = ttfb <= 800 ? 100 : Math.max(0, 100 - (ttfb - 800) / 20)

  return Math.round((fcpScore + lcpScore + fidScore + clsScore + ttfbScore) / 5)
} 