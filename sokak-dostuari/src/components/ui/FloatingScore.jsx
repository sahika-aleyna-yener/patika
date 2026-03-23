import { AnimatePresence, motion } from 'framer-motion'
import { useGameStore } from '../../store/gameStore'

export default function FloatingScore() {
  const { floatingTexts } = useGameStore()

  return (
    <div className="pointer-events-none fixed inset-0 z-40">
      <AnimatePresence>
        {floatingTexts.map((ft) => (
          <motion.div
            key={ft.id}
            className="absolute font-black text-primary text-xl drop-shadow-lg"
            style={{ left: `${ft.x}%`, top: `${ft.y}%` }}
            initial={{ opacity: 1, y: 0, scale: 1 }}
            animate={{ opacity: 0, y: -60, scale: 1.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
          >
            {ft.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
