import { useEffect, useState, useCallback } from 'react'

interface KeyboardState {
  showTulip: boolean
  showPerformance: boolean
  pressedKeys: Set<string>
}

interface KeyboardControls {
  showTulip: boolean
  showPerformance: boolean
  toggleTulip: () => void
  togglePerformance: () => void
  pressedKeys: Set<string>
}

export function useKeyboardControls(): KeyboardControls {
  const [state, setState] = useState<KeyboardState>({
    showTulip: false,
    showPerformance: false,
    pressedKeys: new Set(),
  })

  const toggleTulip = useCallback(() => {
    setState(prev => ({ ...prev, showTulip: !prev.showTulip }))
  }, [])

  const togglePerformance = useCallback(() => {
    setState(prev => ({ ...prev, showPerformance: !prev.showPerformance }))
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase()
      
      // Update pressed keys
      setState(prev => {
        const newPressedKeys = new Set(prev.pressedKeys)
        newPressedKeys.add(key)
        return {
          ...prev,
          pressedKeys: newPressedKeys
        }
      })

      // Handle specific key actions
      switch (key) {
        case 't':
          event.preventDefault()
          toggleTulip()
          break
        case 'h':
          event.preventDefault()
          togglePerformance()
          break
        case 'escape':
          // Hide all overlays on escape
          event.preventDefault()
          setState(prev => ({
            ...prev,
            showTulip: false,
            showPerformance: false,
          }))
          break
      }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase()
      
      setState(prev => {
        const newPressedKeys = new Set(prev.pressedKeys)
        newPressedKeys.delete(key)
        return {
          ...prev,
          pressedKeys: newPressedKeys
        }
      })
    }

    // Add event listeners
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [toggleTulip, togglePerformance])

  return {
    showTulip: state.showTulip,
    showPerformance: state.showPerformance,
    toggleTulip,
    togglePerformance,
    pressedKeys: state.pressedKeys,
  }
} 