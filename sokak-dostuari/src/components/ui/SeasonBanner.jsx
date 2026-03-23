import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../../store/gameStore'

export default function SeasonBanner() {
  const { activeEvent } = useGameStore()

  return (
    <AnimatePresence>
      {activeEvent && (
        <motion.div
          className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 flex items-center justify-center gap-2 text-sm font-bold"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
        >
          <span className="text-base">{activeEvent.emoji}</span>
          <span>{activeEvent.title}:</span>
          <span className="font-normal opacity-90">{activeEvent.description}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
