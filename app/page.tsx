'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import LoadingScreen from '@/components/LoadingScreen'

const StaticScene = dynamic(() => import('@/components/StaticScene'), {
  ssr: false,
  loading: () => <LoadingScreen />,
})

const InteractiveScene = dynamic(() => import('@/components/SimpleScene'), {
  ssr: false,
  loading: () => <LoadingScreen />,
})

const PerformanceAnalyzer = dynamic(() => import('@/components/PerformanceAnalyzer'), {
  ssr: false,
})

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-delft-50 to-delft-100 dark:from-delft-900 dark:to-delft-950">
      <header className="absolute top-0 left-0 right-0 z-10 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-dutch-orange to-dutch-red rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <h1 className="text-2xl font-bold text-delft-900 dark:text-delft-100">
              Nexus 3D
            </h1>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-xs text-delft-600 dark:text-delft-400">
              SS
            </div>
          </div>
        </div>
      </header>

      <Suspense fallback={<LoadingScreen />}>
        <StaticScene />
      </Suspense>

      {/* <div className="absolute top-1/2 left-8 z-10 transform -translate-y-1/2 hidden lg:block float-gentle">
        <div className="bg-white/15 dark:bg-delft-900/15 backdrop-blur-md rounded-xl p-6 max-w-xs pulse-glow fade-in-up">
          <h3 className="text-2xl font-bold text-delft-900 dark:text-delft-100 mb-3">
            Interactive
          </h3>
          <p className="text-sm text-delft-700 dark:text-delft-300 leading-relaxed">
            Smooth 60fps animations powered by cutting-edge WebGL technology
          </p>
        </div>
      </div> */}

      <div className="absolute top-1/3 right-8 z-10 hidden lg:block float-gentle" style={{animationDelay: '1s'}}>
        <div className="bg-white/15 dark:bg-delft-900/15 backdrop-blur-md rounded-xl p-6 max-w-xs pulse-glow fade-in-up">
          <h3 className="text-2xl font-bold text-delft-900 dark:text-delft-100 mb-3">
            Optimized
          </h3>
          <p className="text-sm text-delft-700 dark:text-delft-300 leading-relaxed">
            Self-adapting performance for all devices
          </p>
        </div>
      </div>

      <div className="absolute bottom-1/3 left-1/4 z-10 hidden lg:block float-gentle" style={{animationDelay: '2s'}}>
        <div className="bg-white/15 dark:bg-delft-900/15 backdrop-blur-md rounded-xl p-6 max-w-xs pulse-glow fade-in-up">
          <h3 className="text-2xl font-bold text-delft-900 dark:text-delft-100 mb-3">
            Dutch Design
          </h3>
          <p className="text-sm text-delft-700 dark:text-delft-300 leading-relaxed">
            Inspired by Rotterdam's modern architecture and Delft Blue
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 p-4 md:p-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/95 dark:bg-delft-900/95 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
             <div className="text-center mb-8 fade-in-up relative">
               <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-delft-700 via-dutch-orange to-delft-600 bg-clip-text text-transparent mb-4 animate-gradient">
                 Nexus 3D
               </h1>
               <p className="text-lg md:text-xl text-delft-600 dark:text-delft-400 font-light tracking-wide float-gentle">
                 Where Rotterdam Meets Innovation
               </p>
             </div>

             <div className="text-center mb-8">
               <p className="text-base md:text-lg text-delft-700 dark:text-delft-300 leading-relaxed max-w-3xl mx-auto">
                 Experience the <span className="font-semibold text-dutch-orange">architectural beauty</span> of Rotterdam through 
                 interactive 3D visualization. Built with <span className="font-semibold text-delft-600">WebGL</span> technology 
                 and inspired by traditional <span className="font-semibold text-delft-700">Delft Blue</span> design.
               </p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="text-center p-4 fade-in-up" style={{animationDelay: '0.2s'}}>
                 <div className="w-12 h-12 bg-dutch-orange rounded-full flex items-center justify-center mx-auto mb-3 float-gentle hover:scale-110 transition-transform duration-300">
                   <span className="text-white text-xl">⚡</span>
                 </div>
                 <h3 className="font-semibold text-delft-900 dark:text-delft-100 mb-2">60fps Performance</h3>
                 <p className="text-sm text-delft-600 dark:text-delft-400">Smooth animations on all devices</p>
               </div>
               <div className="text-center p-4 fade-in-up" style={{animationDelay: '0.4s'}}>
                 <div className="w-12 h-12 bg-delft-600 rounded-full flex items-center justify-center mx-auto mb-3 float-gentle hover:scale-110 transition-transform duration-300" style={{animationDelay: '1s'}}>
                   <span className="text-white text-xl">🎨</span>
                 </div>
                 <h3 className="font-semibold text-delft-900 dark:text-delft-100 mb-2">Dutch Design</h3>
                 <p className="text-sm text-delft-600 dark:text-delft-400">Inspired by Rotterdam architecture</p>
               </div>
               <div className="text-center p-4 fade-in-up" style={{animationDelay: '0.6s'}}>
                 <div className="w-12 h-12 bg-dutch-red rounded-full flex items-center justify-center mx-auto mb-3 float-gentle hover:scale-110 transition-transform duration-300" style={{animationDelay: '2s'}}>
                   <span className="text-white text-xl">🔧</span>
                 </div>
                 <h3 className="font-semibold text-delft-900 dark:text-delft-100 mb-2">Self-Optimizing</h3>
                 <p className="text-sm text-delft-600 dark:text-delft-400">Adapts to your device automatically</p>
               </div>
             </div>
          </div>
        </div>
      </div>

      <Suspense fallback={null}>
        <PerformanceAnalyzer />
      </Suspense>
    </main>

    <section className="w-full h-screen relative bg-gradient-to-br from-delft-900 via-delft-800 to-delft-950">
      <Suspense fallback={<LoadingScreen />}>
        <InteractiveScene />
      </Suspense>

       <div className="absolute top-6 left-6 z-10">
         <div className="bg-black/20 backdrop-blur-sm rounded-lg p-3">
           <h3 className="text-white font-semibold mb-2">Controls</h3>
           <div className="text-white/80 text-xs space-y-1">
             <div>• Drag to rotate</div>
             <div>• Scroll to zoom</div>
             <div>• Double-click to reset</div>
             <div className="pt-1 border-t border-white/20 mt-2">
               • Press <kbd className="bg-white/20 px-1 rounded">Ctrl+P</kbd> for performance
             </div>
           </div>
         </div>
       </div>

      <div className="absolute bottom-6 right-6 z-10">
        <div className="bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white text-sm font-medium">Live 3D</span>
          </div>
        </div>
      </div>

      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="absolute bottom-6 left-6 z-10 bg-dutch-orange hover:bg-dutch-red text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        title="Back to top"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                 </svg>
       </button>
     </section>
    </div>
   )
 }  
