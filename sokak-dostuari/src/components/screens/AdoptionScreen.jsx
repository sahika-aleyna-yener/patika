import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../../store/gameStore'

const FAMILIES = [
  {
    id: 'family_1',
    name: 'Yılmaz Ailesi',
    emoji: '👨‍👩‍👧',
    desc: 'İki çocuklu genç bir aile. Balkonlu dairelerinde hayvan için yer hazırladılar.',
    compatible: ['cat'],
    rating: 5,
  },
  {
    id: 'family_2',
    name: 'Emekli Ahmet Amca',
    emoji: '👴',
    desc: 'Bahçeli ev, çok sakin. Dost canlısı bir köpeğe bayılıyor.',
    compatible: ['dog'],
    rating: 5,
  },
  {
    id: 'family_3',
    name: 'Selin & Murat',
    emoji: '👫',
    desc: 'Genç çift, geniş ev. İkisinin de hayvanları çok sevdiğini söylüyor.',
    compatible: ['cat', 'dog'],
    rating: 4,
  },
]

export default function AdoptionScreen({ animal, onClose }) {
  const { adoptAnimal, setScreen } = useGameStore()
  const [selectedFamily, setSelectedFamily] = useState(null)
  const [step, setStep] = useState('choose') // choose | confirm | success

  const compatibleFamilies = FAMILIES.filter((f) => f.compatible.includes(animal.species))

  const handleAdopt = () => {
    setStep('success')
    setTimeout(() => {
      adoptAnimal(animal.id)
    }, 500)
  }

  const handleFinish = () => {
    onClose()
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black/60 flex items-end justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-t-3xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25 }}
      >
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4" />

        <AnimatePresence mode="wait">
          {step === 'choose' && (
            <motion.div key="choose" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="text-center mb-6">
                <div className="text-5xl mb-2">{animal.emoji}</div>
                <h2 className="text-xl font-black text-text">{animal.name} için aile seç!</h2>
                <p className="text-sm text-text-light mt-1">
                  Bu aileyle {animal.name} mutlu olacak mı?
                </p>
              </div>

              <div className="space-y-3 mb-6">
                {compatibleFamilies.map((family) => (
                  <button
                    key={family.id}
                    onClick={() => setSelectedFamily(family)}
                    className={`w-full flex items-start gap-3 p-4 rounded-2xl border-2 text-left transition-all ${
                      selectedFamily?.id === family.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border bg-white hover:border-primary/40'
                    }`}
                  >
                    <span className="text-3xl shrink-0">{family.emoji}</span>
                    <div className="flex-1">
                      <div className="font-bold text-text">{family.name}</div>
                      <div className="text-xs text-text-light mt-0.5">{family.desc}</div>
                      <div className="flex gap-0.5 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < family.rating ? 'text-yellow-400' : 'text-gray-200'}>
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    {selectedFamily?.id === family.id && (
                      <span className="text-primary text-xl">✓</span>
                    )}
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 rounded-xl border border-border text-text-light font-bold hover:bg-gray-50 transition-colors"
                >
                  Vazgeç
                </button>
                <button
                  onClick={() => selectedFamily && setStep('confirm')}
                  disabled={!selectedFamily}
                  className={`flex-1 py-3 rounded-xl font-bold transition-colors ${
                    selectedFamily
                      ? 'bg-primary text-white hover:bg-primary-dark'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Seç 🏠
                </button>
              </div>
            </motion.div>
          )}

          {step === 'confirm' && selectedFamily && (
            <motion.div key="confirm" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
              <div className="text-center mb-6">
                <div className="text-5xl mb-2">🤔</div>
                <h2 className="text-xl font-black text-text">Emin misin?</h2>
              </div>

              <div className="bg-bg border border-border rounded-2xl p-4 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">{animal.emoji}</span>
                  <span className="text-2xl">→</span>
                  <span className="text-4xl">{selectedFamily.emoji}</span>
                </div>
                <p className="text-sm text-text">
                  <strong>{animal.name}</strong>'ı{' '}
                  <strong>{selectedFamily.name}</strong>'ne teslim edeceksin.
                </p>
                <p className="text-xs text-text-light mt-2">
                  Bu seçim kalıcıdır. {animal.name} artık senin mahallenin listesinden çıkacak ama
                  mutlu bir yuva bulmuş olacak! 🏠
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep('choose')}
                  className="flex-1 py-3 rounded-xl border border-border text-text-light font-bold hover:bg-gray-50 transition-colors"
                >
                  Geri
                </button>
                <button
                  onClick={handleAdopt}
                  className="flex-1 py-3 rounded-xl bg-green-500 text-white font-bold hover:bg-green-600 transition-colors"
                >
                  Sahiplendir! 💝
                </button>
              </div>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-8"
            >
              <motion.div
                className="text-7xl mb-4"
                animate={{ scale: [1, 1.3, 1], rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.6 }}
              >
                🎉
              </motion.div>
              <h2 className="text-2xl font-black text-text mb-2">Tebrikler!</h2>
              <p className="text-text-light mb-2">
                <strong>{animal.name}</strong>, artık sıcak bir yuvada! 🏠
              </p>
              <p className="text-sm text-text-light mb-6">
                {selectedFamily?.name} çok mutlu oldu. Senin sayende güzel bir son oldu!
              </p>

              <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6 text-left">
                <div className="text-sm font-bold text-green-700 mb-1">
                  📬 {selectedFamily?.name}'den mektup:
                </div>
                <p className="text-sm text-green-700 italic">
                  "{animal.name} ilk gün biraz çekindi ama şimdi evimize alıştı. Her gün onun yanında olduğumuz için mutluyuz. Teşekkürler!"
                </p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-6">
                <span className="font-bold text-yellow-700">+100 puan kazandın! ⭐</span>
              </div>

              <button
                onClick={handleFinish}
                className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-dark transition-colors"
              >
                Mahalleye Dön 🐾
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
