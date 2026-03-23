import { motion } from 'framer-motion'
import { useGameStore } from '../../store/gameStore'

const steps = [
  {
    emoji: '🐾',
    title: 'Patika',
    subtitle: 'Mahallenin sokak hayvanlarına sahip çık!',
    desc: 'Her gün gelip hayvanlarını besle, iyileştir ve onlarla güçlü bir bağ kur.',
  },
  {
    emoji: '❤️',
    title: 'Bağ Kur',
    subtitle: 'Her hayvanın bir hikayesi var',
    desc: 'Sabırlı ol, güven kazan. Bağ yükseldikçe hayvanlar sana daha çok açılır.',
  },
  {
    emoji: '🏠',
    title: 'Sahiplendir',
    subtitle: 'Mutlu sonlar sen yaratırsın',
    desc: 'Sağlıklı ve mutlu hayvanlar için aile bul. Her sahiplendirme gerçek bir zafer!',
  },
  {
    emoji: '💝',
    title: 'Gerçekten Yardım Et',
    subtitle: 'Oyun oyna, gerçek hayat değiştir',
    desc: 'Reklam izleyerek veya bağış yaparak sokaktaki gerçek hayvanlara yardım edebilirsin.',
  },
]

export default function OnboardingScreen() {
  const { setScreen, updateStreak } = useGameStore()

  const handleStart = () => {
    updateStreak()
    setScreen('game')
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-6">
      <motion.div
        className="w-full max-w-sm"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            className="text-7xl mb-3"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            🐾
          </motion.div>
          <h1 className="text-3xl font-black text-text">Patika</h1>
          <p className="text-text-light text-sm mt-1">Sokak hayvanlarının sesi ol!</p>
        </div>

        {/* Feature cards */}
        <div className="space-y-3 mb-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="bg-white border border-border rounded-2xl p-4 flex items-start gap-3 shadow-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-3xl shrink-0">{step.emoji}</div>
              <div>
                <div className="font-bold text-sm text-text">{step.title}</div>
                <div className="text-xs text-primary font-semibold">{step.subtitle}</div>
                <div className="text-xs text-text-light mt-0.5 leading-relaxed">{step.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Start button */}
        <motion.button
          onClick={handleStart}
          className="w-full bg-primary text-white font-black py-4 rounded-2xl text-lg shadow-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          animate={{ boxShadow: ['0 4px 20px rgba(255,140,66,0.3)', '0 4px 30px rgba(255,140,66,0.6)', '0 4px 20px rgba(255,140,66,0.3)'] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          🐾 Mahalleye Git!
        </motion.button>

        <p className="text-center text-xs text-text-light mt-3">
          Ücretsiz oyna • Gerçek hayvanlar için destek ol
        </p>
      </motion.div>
    </div>
  )
}
