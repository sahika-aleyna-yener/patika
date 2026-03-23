import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../../store/gameStore'

export default function EmpathyModal() {
  const { empathyWarning, clearEmpathyWarning } = useGameStore()

  return (
    <AnimatePresence>
      {empathyWarning && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
            initial={{ scale: 0.7, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.7, y: 40 }}
          >
            <div className="text-center">
              <div className="text-5xl mb-3">💛</div>
              <div className="text-lg font-black text-text mb-2">{empathyWarning.title}</div>
              <div className="text-sm text-text-light mb-4 leading-relaxed">
                {empathyWarning.message}
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-4 text-left">
                <div className="text-xs font-bold text-yellow-800 mb-1">💡 Bunu biliyor muydun?</div>
                <div className="text-xs text-yellow-700">{empathyWarning.lesson}</div>
              </div>

              <button
                onClick={clearEmpathyWarning}
                className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-dark transition-colors"
              >
                Anladım! 🐾
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
