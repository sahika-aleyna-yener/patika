import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../../store/gameStore'
import StatBar from '../ui/StatBar'
import { GENDER_LABELS, SPECIES_LABELS } from '../../data/animals'
import AnimalStoryModal from './AnimalStoryModal'

const ACTIONS = [
  { id: 'feed', label: 'Besle', emoji: '🍖', color: 'bg-orange-100 text-orange-700 border-orange-200' },
  { id: 'approach', label: 'Yaklaş', emoji: '🤝', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 'medicine', label: 'İlaç Ver', emoji: '💊', color: 'bg-green-100 text-green-700 border-green-200' },
  { id: 'sterilize', label: 'Kısırlaştır', emoji: '🏥', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { id: 'vaccinate', label: 'Aşıla', emoji: '💉', color: 'bg-cyan-100 text-cyan-700 border-cyan-200' },
]

const getBondLabel = (bond) => {
  if (bond >= 90) return { text: 'Sahiplendirilmeye hazır ❤️', color: 'text-green-600' }
  if (bond >= 70) return { text: 'Seni seviyor 🥰', color: 'text-green-500' }
  if (bond >= 50) return { text: 'Güveniyor 😊', color: 'text-yellow-600' }
  if (bond >= 30) return { text: 'Yavaş yavaş alışıyor 🤍', color: 'text-yellow-500' }
  return { text: 'Henüz güvenmiyor...', color: 'text-gray-400' }
}

export default function AnimalPanel({ onAdoptClick }) {
  const { animals, selectedAnimalId, doAction, lastStory } = useGameStore()
  const [showStory, setShowStory] = useState(false)
  const [lastAction, setLastAction] = useState(null)

  const animal = animals.find((a) => a.id === selectedAnimalId)

  if (!animal) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-6">
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-6xl mb-4"
        >
          🐾
        </motion.div>
        <div className="text-text font-bold text-base mb-1">Bir hayvan seç!</div>
        <div className="text-text-light text-sm">
          Haritadan bir hayvana tıklayarak ona yardım etmeye başla.
        </div>
      </div>
    )
  }

  const bondInfo = getBondLabel(animal.bond)

  const handleAction = (actionId) => {
    if (actionId === 'sterilize' && animal.isSterilized) return
    if (actionId === 'vaccinate' && animal.isVaccinated) return
    doAction(animal.id, actionId)
    setLastAction(actionId)
    setTimeout(() => setLastAction(null), 600)
  }

  const storyText =
    lastStory?.animalId === animal.id ? lastStory.text : animal.story

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-start gap-3 p-4 pb-2">
        <motion.div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-md bg-white border-2 border-border shrink-0"
          animate={{ rotate: lastAction ? [0, -8, 8, 0] : 0 }}
          transition={{ duration: 0.4 }}
        >
          {animal.emoji}
        </motion.div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-black text-xl text-text">{animal.name}</span>
            {animal.isSterilized && (
              <span className="text-xs bg-purple-100 text-purple-700 rounded-full px-2 py-0.5">✂️ Kısır</span>
            )}
            {animal.isVaccinated && (
              <span className="text-xs bg-blue-100 text-blue-700 rounded-full px-2 py-0.5">💉 Aşılı</span>
            )}
          </div>
          <div className="text-xs text-text-light">
            {GENDER_LABELS[animal.gender]} {SPECIES_LABELS[animal.species]} • {animal.age < 1 ? `${Math.round(animal.age * 12)} aylık` : `${animal.age} yaşında`}
          </div>
          <div className={`text-xs font-bold mt-1 ${bondInfo.color}`}>{bondInfo.text}</div>
        </div>

        <button
          onClick={() => setShowStory(true)}
          className="text-xs bg-bg border border-border rounded-xl px-2 py-1 text-text-light hover:bg-primary hover:text-white hover:border-primary transition-colors shrink-0"
        >
          📖 Hikaye
        </button>
      </div>

      {/* Story bubble */}
      <AnimatePresence mode="wait">
        <motion.div
          key={storyText}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          className="mx-4 mb-3 bg-yellow-50 border border-yellow-200 rounded-2xl rounded-tl-sm p-3"
        >
          <div className="flex gap-2">
            <span className="text-lg shrink-0">{animal.emoji}</span>
            <p className="text-sm text-text italic leading-relaxed">"{storyText}"</p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Stats */}
      <div className="px-4 pb-2">
        <div className="text-xs font-bold text-text mb-2">Durum</div>
        <StatBar label="Bağ" value={animal.bond} color="#FF8C42" emoji="❤️" />
        <StatBar label="Güven" value={animal.trust} color="#9C27B0" emoji="🤝" />
        <StatBar label="Sağlık" value={animal.health} emoji="💚" />
        <StatBar label="Açlık" value={animal.hunger} color="#2196F3" emoji="🍖" />
      </div>

      {/* Personality */}
      <div className="mx-4 mb-3 bg-bg rounded-xl p-2.5 border border-border">
        <span className="text-xs text-text-light">🧠 Kişilik: </span>
        <span className="text-xs font-semibold text-text">{animal.personality}</span>
      </div>

      {/* Actions */}
      <div className="px-4 pb-2">
        <div className="text-xs font-bold text-text mb-2">Aksiyonlar</div>
        <div className="grid grid-cols-2 gap-2">
          {ACTIONS.map((action) => {
            const isDisabled =
              (action.id === 'sterilize' && animal.isSterilized) ||
              (action.id === 'vaccinate' && animal.isVaccinated)

            return (
              <motion.button
                key={action.id}
                onClick={() => !isDisabled && handleAction(action.id)}
                disabled={isDisabled}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-bold transition-all ${
                  isDisabled
                    ? 'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed'
                    : action.color + ' hover:opacity-80 active:scale-95'
                }`}
                whileTap={!isDisabled ? { scale: 0.95 } : {}}
              >
                <span>{action.emoji}</span>
                <span>{isDisabled ? action.label + ' ✓' : action.label}</span>
              </motion.button>
            )
          })}

          {/* Adopt button */}
          <motion.button
            onClick={() => animal.isAdoptable && onAdoptClick(animal)}
            disabled={!animal.isAdoptable}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-bold col-span-2 transition-all ${
              animal.isAdoptable
                ? 'bg-green-500 text-white border-green-500 hover:bg-green-600 shadow-md'
                : 'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed'
            }`}
            whileTap={animal.isAdoptable ? { scale: 0.97 } : {}}
            animate={animal.isAdoptable ? { boxShadow: ['0 0 0 0 rgba(76,175,80,0)', '0 0 0 8px rgba(76,175,80,0.2)', '0 0 0 0 rgba(76,175,80,0)'] } : {}}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <span>🏠</span>
            <span>
              {animal.isAdoptable
                ? 'Sahiplendirmeye Hazır!'
                : `Sahiplendir (Bağ: ${animal.bond}/70, Sağlık: ${animal.health}/60)`}
            </span>
          </motion.button>
        </div>
      </div>

      {/* Story modal */}
      {showStory && (
        <AnimalStoryModal animal={animal} onClose={() => setShowStory(false)} />
      )}
    </div>
  )
}
