import { motion } from 'framer-motion'
import { useGameStore } from '../../store/gameStore'
import { NEED_EMOJI } from '../../data/animals'

export default function NeighborhoodMap() {
  const { animals, selectedAnimalId, selectAnimal } = useGameStore()
  const activeAnimals = animals.filter((a) => !a.isAdopted)

  const getBondColor = (bond) => {
    if (bond >= 70) return '#4CAF50'
    if (bond >= 40) return '#FF9800'
    return '#9E9E9E'
  }

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl bg-gradient-to-b from-sky-100 to-green-100">
      {/* Sky and ground */}
      <div className="absolute inset-0">
        {/* Sun */}
        <div className="absolute top-4 right-6 text-3xl opacity-80">☀️</div>

        {/* Clouds */}
        <div className="absolute top-6 left-8 text-2xl opacity-60">☁️</div>
        <div className="absolute top-10 left-24 text-xl opacity-40">☁️</div>

        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-b from-green-200/30 to-green-300/50 rounded-t-3xl" />

        {/* Road */}
        <div className="absolute bottom-1/4 left-0 right-0 h-6 bg-gray-300/50" />
        <div className="absolute bottom-1/4 left-0 right-0 h-6 flex items-center justify-center gap-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-8 h-1 bg-white/60 rounded" />
          ))}
        </div>

        {/* Trees */}
        <div className="absolute bottom-[40%] left-[5%] text-3xl">🌳</div>
        <div className="absolute bottom-[38%] left-[45%] text-2xl">🌿</div>
        <div className="absolute bottom-[42%] right-[8%] text-3xl">🌲</div>

        {/* Buildings */}
        <div className="absolute bottom-[30%] left-[15%] text-4xl opacity-70">🏠</div>
        <div className="absolute bottom-[28%] right-[20%] text-4xl opacity-70">🏪</div>

        {/* Food station */}
        <div className="absolute bottom-[22%] left-[30%] flex flex-col items-center">
          <div className="text-2xl">🍽️</div>
          <div className="text-[9px] text-text-light font-semibold bg-white/80 rounded px-1">
            Mama İstasyonu
          </div>
        </div>
      </div>

      {/* Animals */}
      {activeAnimals.map((animal) => {
        const isSelected = animal.id === selectedAnimalId
        const bondColor = getBondColor(animal.bond)

        return (
          <motion.button
            key={animal.id}
            className="absolute flex flex-col items-center cursor-pointer"
            style={{
              left: `${animal.x}%`,
              top: `${animal.y}%`,
              transform: 'translate(-50%, -50%)',
              zIndex: isSelected ? 20 : 10,
            }}
            onClick={() => selectAnimal(animal.id)}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Need badge */}
            {animal.need && (
              <motion.div
                className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold z-10"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                {NEED_EMOJI[animal.need]}
              </motion.div>
            )}

            {/* Animal circle */}
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center text-2xl shadow-lg transition-all ${
                isSelected
                  ? 'ring-4 ring-primary ring-offset-2 shadow-xl'
                  : 'ring-2 ring-white'
              }`}
              style={{ backgroundColor: bondColor + '30', borderColor: bondColor }}
            >
              <motion.span
                animate={isSelected ? { rotate: [0, -10, 10, 0] } : {}}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                {animal.emoji}
              </motion.span>
            </div>

            {/* Name tag */}
            <div
              className={`mt-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-white shadow-sm ${
                isSelected ? 'text-primary' : 'text-text'
              }`}
            >
              {animal.name}
            </div>
          </motion.button>
        )
      })}

      {/* Empty state */}
      {activeAnimals.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center bg-white/80 rounded-2xl p-4">
            <div className="text-4xl mb-2">🎉</div>
            <div className="text-sm font-bold text-text">Tüm hayvanlar sahiplendi!</div>
          </div>
        </div>
      )}

      {/* Hint */}
      {!selectedAnimalId && activeAnimals.length > 0 && (
        <motion.div
          className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/90 rounded-xl px-3 py-1.5 text-xs text-text-light font-semibold shadow"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          👆 Bir hayvana tıkla
        </motion.div>
      )}
    </div>
  )
}
