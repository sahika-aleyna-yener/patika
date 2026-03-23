import { useEffect, useRef } from 'react'
import { useGameStore } from '../store/gameStore'

// Her 2 dakikada bir açlık azalır (120_000 ms)
const DECAY_INTERVAL_MS = 120_000

export function useGameLoop() {
  const decayHunger = useGameStore((s) => s.decayHunger)
  const intervalRef = useRef(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      decayHunger()
    }, DECAY_INTERVAL_MS)

    return () => clearInterval(intervalRef.current)
  }, [decayHunger])
}
