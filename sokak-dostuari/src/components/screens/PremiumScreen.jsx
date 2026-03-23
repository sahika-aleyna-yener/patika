import { motion } from 'framer-motion'
import { useGameStore } from '../../store/gameStore'

const FEATURES_FREE = [
  '4 mahalle hayvanı',
  'Temel aksiyonlar (besle, yaklaş, ilaç)',
  'Günlük görevler',
  'Rozet sistemi',
  'Streak takibi',
]

const FEATURES_PREMIUM = [
  '✅ Sınırsız mahalle hayvanı',
  '✅ Özel kış/yaz teması',
  '✅ Gelişmiş istatistikler',
  '✅ Hayvan kişiselleştirme (isim, renk)',
  '✅ Sahiplendirme sonrası mektuplar',
  '✅ 2x puan tüm aksiyonlarda',
  '✅ Reklamsız deneyim',
  '✅ Profil rozeti: "Sokak Dostu"',
]

const AD_REWARDS = [
  { emoji: '🍖', text: 'Mama istasyonuna 1 kilo mama bağışı', partner: 'Purina' },
  { emoji: '💊', text: 'Bir hayvan için aşı katkısı', partner: 'Pfizer Hayvan Sağlığı' },
  { emoji: '💝', text: 'Kısırlaştırma fonuna ₺5 katkı', partner: 'Patileri Koruyalım' },
]

export default function PremiumScreen({ onClose }) {
  const { setPremium, isPremium, watchAd, recordDonation } = useGameStore()

  const handlePremium = () => {
    setPremium(true)
    onClose()
  }

  const handleWatchAd = () => {
    watchAd()
    alert('Reklam izlendiği için gerçek bir mama bağışı yapıldı! +20 puan kazandın 🎉')
  }

  const handleDonate = (amount) => {
    recordDonation(amount)
    alert(`₺${amount} bağış için teşekkürler! Gerçek sokak hayvanlarına ulaşacak 💝`)
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black/60 flex items-end justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-t-3xl w-full max-w-md max-h-[92vh] overflow-y-auto"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-purple-600 to-purple-800 text-white p-6 rounded-t-3xl">
          <div className="w-10 h-1 bg-white/30 rounded-full mx-auto mb-4" />
          <div className="text-center">
            <div className="text-4xl mb-2">👑</div>
            <h2 className="text-2xl font-black mb-1">Patika Pro</h2>
            <p className="text-purple-200 text-sm">Hem daha iyi oyna, hem gerçekten yardım et!</p>
          </div>
        </div>

        <div className="p-6">
          {/* Premium plan */}
          {!isPremium ? (
            <div className="mb-6">
              <div className="flex gap-3 mb-4">
                {/* Free */}
                <div className="flex-1 bg-gray-50 rounded-2xl p-4 border border-gray-200">
                  <div className="font-bold text-text mb-3 text-sm">Ücretsiz</div>
                  <ul className="space-y-1.5">
                    {FEATURES_FREE.map((f, i) => (
                      <li key={i} className="text-xs text-text-light flex items-start gap-1">
                        <span className="text-gray-400 shrink-0">•</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Premium */}
                <div className="flex-1 bg-purple-50 rounded-2xl p-4 border-2 border-purple-300 relative">
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    POPÜLER
                  </div>
                  <div className="font-black text-purple-700 mb-1 text-sm">Pro</div>
                  <div className="text-purple-600 font-black text-xl mb-3">
                    ₺49<span className="text-xs font-normal">/ay</span>
                  </div>
                  <ul className="space-y-1.5">
                    {FEATURES_PREMIUM.map((f, i) => (
                      <li key={i} className="text-xs text-purple-700 leading-tight">{f}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <motion.button
                onClick={handlePremium}
                className="w-full bg-purple-600 text-white font-black py-4 rounded-2xl text-base shadow-lg mb-2"
                whileTap={{ scale: 0.97 }}
              >
                👑 Patika Pro'ya Geç — ₺49/ay
              </motion.button>
              <p className="text-center text-xs text-text-light">
                Ödemenin %20'si sokak hayvanı vakıflarına gidiyor 💝
              </p>
            </div>
          ) : (
            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 mb-6 text-center">
              <div className="text-3xl mb-2">👑</div>
              <div className="font-black text-purple-700">Pro üyesin! Teşekkürler.</div>
              <div className="text-xs text-purple-500 mt-1">Tüm özelliklerin kilidini açtın.</div>
            </div>
          )}

          {/* Ad section */}
          <div className="mb-6">
            <h3 className="font-black text-text mb-1">📺 Reklam İzle, Gerçek Yardım Et</h3>
            <p className="text-xs text-text-light mb-3">
              Reklam izlediğinde sponsorumuz adına gerçek bir bağış yapılıyor:
            </p>
            <div className="space-y-2 mb-3">
              {AD_REWARDS.map((r, i) => (
                <div key={i} className="flex items-center gap-2 bg-bg rounded-xl p-3 border border-border">
                  <span className="text-xl">{r.emoji}</span>
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-text">{r.text}</div>
                    <div className="text-[10px] text-text-light">Sponsor: {r.partner}</div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={handleWatchAd}
              className="w-full bg-blue-500 text-white font-bold py-3 rounded-xl hover:bg-blue-600 transition-colors"
            >
              📺 Reklam İzle (+20 puan)
            </button>
          </div>

          {/* Direct donation */}
          <div className="mb-6">
            <h3 className="font-black text-text mb-1">💝 Doğrudan Bağış</h3>
            <p className="text-xs text-text-light mb-3">
              Bağışlar doğrudan sokak hayvanı vakıflarına aktarılır ve sana özel rozet kazandırır.
            </p>
            <div className="grid grid-cols-3 gap-2">
              {[10, 25, 50].map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleDonate(amount)}
                  className="bg-red-50 border border-red-200 text-red-700 font-black py-3 rounded-xl hover:bg-red-100 transition-colors text-sm"
                >
                  ₺{amount}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl border border-border text-text-light font-bold hover:bg-gray-50 transition-colors"
          >
            Kapat
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
