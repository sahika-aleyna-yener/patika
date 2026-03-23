import { motion } from 'framer-motion'
import { GENDER_LABELS, SPECIES_LABELS } from '../../data/animals'

export default function AnimalStoryModal({ animal, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-end justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-t-3xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4" />

        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 rounded-2xl bg-bg border-2 border-border flex items-center justify-center text-5xl">
            {animal.emoji}
          </div>
          <div>
            <div className="font-black text-2xl text-text">{animal.name}</div>
            <div className="text-sm text-text-light">
              {GENDER_LABELS[animal.gender]} {SPECIES_LABELS[animal.species]} •{' '}
              {animal.age < 1 ? `${Math.round(animal.age * 12)} aylık` : `${animal.age} yaşında`}
            </div>
            <div className="text-sm font-semibold text-primary mt-1">{animal.personality}</div>
          </div>
        </div>

        {/* Backstory */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-4">
          <div className="font-bold text-sm text-text mb-2">📖 Hikayesi</div>
          <p className="text-sm text-text-light leading-relaxed">{animal.backstory}</p>
        </div>

        {/* Stats summary */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-bg rounded-xl p-3 border border-border text-center">
            <div className="text-2xl mb-1">❤️</div>
            <div className="font-black text-lg text-primary">{animal.bond}</div>
            <div className="text-xs text-text-light">Bağ Puanı</div>
          </div>
          <div className="bg-bg rounded-xl p-3 border border-border text-center">
            <div className="text-2xl mb-1">🤝</div>
            <div className="font-black text-lg text-purple-500">{animal.trust}</div>
            <div className="text-xs text-text-light">Güven</div>
          </div>
          <div className="bg-bg rounded-xl p-3 border border-border text-center">
            <div className="text-2xl mb-1">💚</div>
            <div className="font-black text-lg text-green-500">{animal.health}</div>
            <div className="text-xs text-text-light">Sağlık</div>
          </div>
          <div className="bg-bg rounded-xl p-3 border border-border text-center">
            <div className="text-2xl mb-1">🍖</div>
            <div className="font-black text-lg text-blue-500">{animal.hunger}</div>
            <div className="text-xs text-text-light">Açlık</div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {animal.isSterilized && (
            <span className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm font-semibold">
              ✂️ Kısırlaştırıldı
            </span>
          )}
          {animal.isVaccinated && (
            <span className="bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-sm font-semibold">
              💉 Aşılandı
            </span>
          )}
          {animal.isAdoptable && (
            <span className="bg-green-100 text-green-700 rounded-full px-3 py-1 text-sm font-semibold">
              🏠 Sahiplendirilmeye Hazır
            </span>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-dark transition-colors"
        >
          Kapat
        </button>
      </motion.div>
    </motion.div>
  )
}
