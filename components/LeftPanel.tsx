'use client'

import { useState, useEffect } from 'react'

interface LeftPanelProps {
  isVisible?: boolean
  onToggle?: () => void
  isMobile?: boolean
}

interface NavigationItem {
  id: string
  label: string
  icon: string
  description: string
  active?: boolean
}

export default function LeftPanel({ isVisible = true, onToggle, isMobile = false }: LeftPanelProps) {
  const [activeSection, setActiveSection] = useState('overview')
  const [isCollapsed, setIsCollapsed] = useState(isMobile)
  const [performanceMode, setPerformanceMode] = useState('balanced')

  const navigationItems: NavigationItem[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: '🏗️',
      description: 'Rotterdam Architecture',
      active: true
    },
    {
      id: 'erasmus',
      label: 'Erasmus Bridge',
      icon: '🌉',
      description: 'Iconic Rotterdam Landmark'
    },
    {
      id: 'performance',
      label: 'Performance',
      icon: '⚡',
      description: 'Real-time Metrics'
    },
    {
      id: 'controls',
      label: 'Controls',
      icon: '🎮',
      description: 'Interaction Guide'
    }
  ]

  const performanceModes = [
    { id: 'power-saver', label: 'Power Saver', icon: '🔋', description: 'Battery optimized' },
    { id: 'balanced', label: 'Balanced', icon: '⚖️', description: 'Performance & quality' },
    { id: 'performance', label: 'Performance', icon: '🚀', description: 'Maximum quality' }
  ]

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId)
  }

  const renderOverviewSection = () => (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-dutch-orange/10 to-dutch-red/10 rounded-lg p-4 border border-dutch-orange/20">
        <h3 className="font-semibold text-delft-900 dark:text-delft-100 mb-2 flex items-center">
          <span className="mr-2">🇳🇱</span>
          Rotterdam Experience
        </h3>
        <p className="text-sm text-delft-700 dark:text-delft-300 leading-relaxed">
          Experience the architectural beauty of Rotterdam through interactive 3D visualization. 
          Built with cutting-edge WebGL technology and inspired by traditional Delft Blue design.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-delft-50 dark:bg-delft-800 rounded-lg p-3 text-center">
          <div className="text-2xl mb-1">⚡</div>
          <div className="text-xs font-medium text-delft-900 dark:text-delft-100">60fps</div>
          <div className="text-xs text-delft-600 dark:text-delft-400">Performance</div>
        </div>
        <div className="bg-delft-50 dark:bg-delft-800 rounded-lg p-3 text-center">
          <div className="text-2xl mb-1">🎨</div>
          <div className="text-xs font-medium text-delft-900 dark:text-delft-100">Dutch</div>
          <div className="text-xs text-delft-600 dark:text-delft-400">Design</div>
        </div>
      </div>

      <div className="bg-delft-100 dark:bg-delft-800 rounded-lg p-3">
        <h4 className="font-medium text-delft-900 dark:text-delft-100 mb-2 text-sm">Tech Stack</h4>
        <div className="space-y-1 text-xs text-delft-700 dark:text-delft-300">
          <div>• Next.js 14 + React Three Fiber</div>
          <div>• TypeScript + Tailwind CSS</div>
          <div>• WebGL + Three.js</div>
          <div>• Performance Optimized</div>
        </div>
      </div>
    </div>
  )

  const renderErasmusSection = () => (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-delft-600/10 to-delft-800/10 rounded-lg p-4 border border-delft-600/20">
        <h3 className="font-semibold text-delft-900 dark:text-delft-100 mb-2 flex items-center">
          <span className="mr-2">🌉</span>
          Erasmus Bridge
        </h3>
        <p className="text-sm text-delft-700 dark:text-delft-300 leading-relaxed">
          The iconic Erasmus Bridge, completed in 1996, connects North and South Rotterdam. 
          Known as "The Swan" for its elegant design, it's a symbol of modern Rotterdam.
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-delft-600 dark:text-delft-400">Length:</span>
          <span className="text-delft-900 dark:text-delft-100 font-medium">802m</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-delft-600 dark:text-delft-400">Height:</span>
          <span className="text-delft-900 dark:text-delft-100 font-medium">139m</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-delft-600 dark:text-delft-400">Completed:</span>
          <span className="text-delft-900 dark:text-delft-100 font-medium">1996</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-delft-600 dark:text-delft-400">Architect:</span>
          <span className="text-delft-900 dark:text-delft-100 font-medium">Ben van Berkel</span>
        </div>
      </div>

      <div className="bg-delft-50 dark:bg-delft-800 rounded-lg p-3">
        <h4 className="font-medium text-delft-900 dark:text-delft-100 mb-2 text-sm">Fun Facts</h4>
        <div className="space-y-1 text-xs text-delft-700 dark:text-delft-300">
          <div>• Nicknamed "The Swan"</div>
          <div>• Featured in many films</div>
          <div>• LED lighting system</div>
          <div>• Pedestrian & cycle friendly</div>
        </div>
      </div>
    </div>
  )

  const renderPerformanceSection = () => (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-lg p-4 border border-green-500/20">
        <h3 className="font-semibold text-delft-900 dark:text-delft-100 mb-2 flex items-center">
          <span className="mr-2">⚡</span>
          Performance Monitor
        </h3>
        <p className="text-sm text-delft-700 dark:text-delft-300 leading-relaxed">
          Real-time performance metrics and optimization settings for the best 3D experience.
        </p>
      </div>

      <div className="space-y-3">
        <div className="bg-delft-50 dark:bg-delft-800 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-delft-900 dark:text-delft-100">FPS</span>
            <span className="text-sm text-green-600 font-bold">60</span>
          </div>
          <div className="w-full bg-delft-200 dark:bg-delft-700 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>

        <div className="bg-delft-50 dark:bg-delft-800 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-delft-900 dark:text-delft-100">Render Time</span>
            <span className="text-sm text-blue-600 font-bold">12ms</span>
          </div>
          <div className="w-full bg-delft-200 dark:bg-delft-700 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '72%' }}></div>
          </div>
        </div>

        <div className="bg-delft-50 dark:bg-delft-800 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-delft-900 dark:text-delft-100">Memory</span>
            <span className="text-sm text-orange-600 font-bold">45MB</span>
          </div>
          <div className="w-full bg-delft-200 dark:bg-delft-700 rounded-full h-2">
            <div className="bg-orange-500 h-2 rounded-full" style={{ width: '45%' }}></div>
          </div>
        </div>
      </div>

      <div className="bg-delft-100 dark:bg-delft-800 rounded-lg p-3">
        <h4 className="font-medium text-delft-900 dark:text-delft-100 mb-3 text-sm">Performance Mode</h4>
        <div className="space-y-2">
          {performanceModes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setPerformanceMode(mode.id)}
              className={`w-full flex items-center p-2 rounded-lg text-left transition-colors ${
                performanceMode === mode.id
                  ? 'bg-dutch-orange text-white'
                  : 'bg-delft-50 dark:bg-delft-700 hover:bg-delft-100 dark:hover:bg-delft-600'
              }`}
            >
              <span className="mr-2">{mode.icon}</span>
              <div>
                <div className="text-sm font-medium">{mode.label}</div>
                <div className="text-xs opacity-80">{mode.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  const renderControlsSection = () => (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-lg p-4 border border-purple-500/20">
        <h3 className="font-semibold text-delft-900 dark:text-delft-100 mb-2 flex items-center">
          <span className="mr-2">🎮</span>
          Interaction Controls
        </h3>
        <p className="text-sm text-delft-700 dark:text-delft-300 leading-relaxed">
          Learn how to interact with the 3D environment and access advanced features.
        </p>
      </div>

      <div className="space-y-3">
        <div className="bg-delft-50 dark:bg-delft-800 rounded-lg p-3">
          <h4 className="font-medium text-delft-900 dark:text-delft-100 mb-2 text-sm">Mouse Controls</h4>
          <div className="space-y-2 text-xs text-delft-700 dark:text-delft-300">
            <div className="flex justify-between">
              <span>Rotate:</span>
              <span className="text-delft-900 dark:text-delft-100 font-medium">Left drag</span>
            </div>
            <div className="flex justify-between">
              <span>Zoom:</span>
              <span className="text-delft-900 dark:text-delft-100 font-medium">Scroll wheel</span>
            </div>
            <div className="flex justify-between">
              <span>Pan:</span>
              <span className="text-delft-900 dark:text-delft-100 font-medium">Right drag</span>
            </div>
            <div className="flex justify-between">
              <span>Reset:</span>
              <span className="text-delft-900 dark:text-delft-100 font-medium">Double-click</span>
            </div>
          </div>
        </div>

        <div className="bg-delft-50 dark:bg-delft-800 rounded-lg p-3">
          <h4 className="font-medium text-delft-900 dark:text-delft-100 mb-2 text-sm">Keyboard Shortcuts</h4>
          <div className="space-y-2 text-xs text-delft-700 dark:text-delft-300">
            <div className="flex justify-between">
              <span>Performance:</span>
              <kbd className="bg-delft-200 dark:bg-delft-700 px-1 rounded text-xs">Ctrl+P</kbd>
            </div>
            <div className="flex justify-between">
              <span>Toggle Tulip:</span>
              <kbd className="bg-delft-200 dark:bg-delft-700 px-1 rounded text-xs">T</kbd>
            </div>
            <div className="flex justify-between">
              <span>Hide All:</span>
              <kbd className="bg-delft-200 dark:bg-delft-700 px-1 rounded text-xs">ESC</kbd>
            </div>
            <div className="flex justify-between">
              <span>Fullscreen:</span>
              <kbd className="bg-delft-200 dark:bg-delft-700 px-1 rounded text-xs">F11</kbd>
            </div>
          </div>
        </div>

        <div className="bg-delft-50 dark:bg-delft-800 rounded-lg p-3">
          <h4 className="font-medium text-delft-900 dark:text-delft-100 mb-2 text-sm">Touch Controls</h4>
          <div className="space-y-2 text-xs text-delft-700 dark:text-delft-300">
            <div className="flex justify-between">
              <span>Rotate:</span>
              <span className="text-delft-900 dark:text-delft-100 font-medium">Single finger</span>
            </div>
            <div className="flex justify-between">
              <span>Zoom:</span>
              <span className="text-delft-900 dark:text-delft-100 font-medium">Pinch</span>
            </div>
            <div className="flex justify-between">
              <span>Pan:</span>
              <span className="text-delft-900 dark:text-delft-100 font-medium">Two fingers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return renderOverviewSection()
      case 'erasmus':
        return renderErasmusSection()
      case 'performance':
        return renderPerformanceSection()
      case 'controls':
        return renderControlsSection()
      default:
        return renderOverviewSection()
    }
  }

  if (!isVisible) return null

    return (
    <>
      {/* Mobile Toggle Button */}
      {isMobile && isCollapsed && (
        <button
          onClick={() => setIsCollapsed(false)}
          className="fixed top-4 left-4 z-30 bg-dutch-orange hover:bg-dutch-red text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 slide-in-left"
          title="Open Navigation"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

            {/* Backdrop for Mobile */}
      {isMobile && !isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-10"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      {/* Panel */}
      <div className={`fixed top-0 left-0 h-full z-20 transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-16' : isMobile ? 'w-full' : 'w-80'
      } ${isMobile && !isCollapsed ? 'slide-in-left' : ''}`}>
        <div className="h-full bg-white/95 dark:bg-delft-900/95 backdrop-blur-xl border-r border-delft-200 dark:border-delft-700 shadow-xl">
        {/* Header */}
        <div className="p-4 border-b border-delft-200 dark:border-delft-700">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-dutch-orange to-dutch-red rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">N</span>
                </div>
                <h2 className="text-lg font-bold text-delft-900 dark:text-delft-100">
                  Nexus 3D
                </h2>
              </div>
            )}
                         <button
               onClick={() => setIsCollapsed(!isCollapsed)}
               className="p-2 rounded-lg hover:bg-delft-100 dark:hover:bg-delft-800 transition-colors"
               title={isCollapsed ? 'Expand panel' : 'Collapse panel'}
             >
               <svg className="w-4 h-4 text-delft-600 dark:text-delft-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isCollapsed ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7m8 14l-7-7 7-7"} />
               </svg>
             </button>
             {isMobile && !isCollapsed && (
               <button
                 onClick={() => setIsCollapsed(true)}
                 className="p-2 rounded-lg hover:bg-delft-100 dark:hover:bg-delft-800 transition-colors"
                 title="Close panel"
               >
                 <svg className="w-4 h-4 text-delft-600 dark:text-delft-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                 </svg>
               </button>
             )}
          </div>
        </div>

        {/* Navigation */}
        {!isCollapsed && (
          <div className="p-4 border-b border-delft-200 dark:border-delft-700">
            <nav className="space-y-1">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSectionChange(item.id)}
                  className={`w-full flex items-center p-3 rounded-lg text-left transition-all duration-200 ${
                    activeSection === item.id
                      ? 'bg-dutch-orange text-white shadow-lg'
                      : 'hover:bg-delft-100 dark:hover:bg-delft-800 text-delft-700 dark:text-delft-300'
                  }`}
                >
                  <span className="text-lg mr-3">{item.icon}</span>
                  <div>
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs opacity-80">{item.description}</div>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        )}

        {/* Content */}
        {!isCollapsed && (
          <div className="flex-1 overflow-y-auto p-4">
            {renderContent()}
          </div>
        )}

        {/* Collapsed Navigation */}
        {isCollapsed && (
          <div className="flex-1 flex flex-col items-center py-4 space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSectionChange(item.id)}
                className={`p-3 rounded-lg transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-dutch-orange text-white shadow-lg'
                    : 'hover:bg-delft-100 dark:hover:bg-delft-800 text-delft-700 dark:text-delft-300'
                }`}
                title={item.label}
              >
                <span className="text-lg">{item.icon}</span>
              </button>
            ))}
          </div>
        )}

        {/* Footer */}
        {!isCollapsed && (
          <div className="p-4 border-t border-delft-200 dark:border-delft-700">
            <div className="text-center">
              <div className="text-xs text-delft-600 dark:text-delft-400 mb-1">
                Made with ❤️ in Rotterdam
              </div>
              <div className="text-xs text-delft-500 dark:text-delft-500">
                Next.js 14 + React Three Fiber
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  )
} 