import { useState } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '../../store/gameStore'
import { useUserStore, AVATARS, THEMES } from '../../store/userStore'
import { BADGES } from '../../data/badges'

export default function ProfileScreen({ onClose }) {
  const { score, streak, stats, earnedBadges, animals, totalDonated } = useGameStore()
  const { playerName, avatar, themeId, setPlayerName, setAvatar, setTheme } = useUserStore()
  const [editingName, setEditingName] = useState(false)
  const [nameInput, setNameInput] = useState(playerName)

  const adoptedCount = animals.filter((a) => a.isAdopted).length
  const earnedBadgeData = BADGES.filter((b) => earnedBadges.includes(b.id))

  const handleSaveName = () => {
    setPlayerName(nameInput)
    setEditingName(false)
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
        <div className="bg-gradient-to-br from-primary to-orange-500 text-white p-6 rounded-t-3xl">
          <div className="w-10 h-1 bg-white/30 rounded-full mx-auto mb-4" />
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-4xl">
              {avatar}
            </div>
            <div className="flex-1">
              {editingName ? (
                <div className="flex gap-2">
                  <input
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                    className="flex-1 rounded-lg px-2 py-1 text-text text-sm font-bold"
                    maxLength={20}
                    autoFocus
                  />
                  <button
                    onClick={handleSaveName}
                    className="bg-white/20 rounded-lg px-2 py-1 text-sm font-bold"
                  >
                    ✓
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { setEditingName(true); setNameInput(playerName) }}
                  className="text-left"
                >
                  <div className="font-black text-xl">{playerName}</div>
                  <div className="text-white/70 text-xs">✏️ İsmi değiştir</div>
                </button>
              )}
              <div className="text-white/80 text-xs mt-1">
                🔥 {streak} gün streak • ⭐ {score} puan
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 space-y-5">
          {/* Avatar Seçimi */}
          <div>
            <div className="text-sm font-black text-text mb-2">Avatar Seç</div>
            <div className="flex flex-wrap gap-2">
              {AVATARS.map((a) => (
                <button
                  key={a}
                  onClick={() => setAvatar(a)}
                  className={`w-10 h-10 rounded-xl text-2xl flex items-center justify-center transition-all ${
                    avatar === a
                      ? 'bg-primary/20 ring-2 ring-primary scale-110'
                      : 'bg-bg hover:bg-primary/10'
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          {/* Tema Seçimi */}
          <div>
            <div className="text-sm font-black text-text mb-2">Tema Seç</div>
            <div className="grid grid-cols-2 gap-2">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                    themeId === t.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-bg hover:border-primary/40'
                  }`}
                >
                  <span className="text-xl">{t.emoji}</span>
                  <span className="text-sm font-bold text-text">{t.label}</span>
                  {themeId === t.id && <span className="ml-auto text-primary">✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* İstatistikler */}
          <div>
            <div className="text-sm font-black text-text mb-2">İstatistiklerim</div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { emoji: '🍖', label: 'Toplam Besleme', value: stats.totalFeeds },
                { emoji: '💊', label: 'İlaç Verilen', value: stats.totalMedicines },
                { emoji: '🏠', label: 'Sahiplendirilen', value: adoptedCount },
                { emoji: '🏥', label: 'Kısırlaştırılan', value: stats.totalSterilizations },
                { emoji: '🔥', label: 'En Uzun Streak', value: `${stats.maxStreak} gün` },
                { emoji: '❤️', label: 'En Yüksek Bağ', value: stats.maxBond },
              ].map((item) => (
                <div key={item.label} className="bg-bg border border-border rounded-xl p-3 text-center">
                  <div className="text-xl mb-1">{item.emoji}</div>
                  <div className="font-black text-lg text-primary">{item.value}</div>
                  <div className="text-[10px] text-text-light">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Gerçek Etki */}
          {(totalDonated > 0 || stats.adsWatched > 0) && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
              <div className="text-sm font-black text-green-700 mb-2">🌍 Gerçek Dünya Etkisi</div>
              {totalDonated > 0 && (
                <div className="text-sm text-green-700">💝 Toplam ₺{totalDonated} bağış yaptın</div>
              )}
              {stats.adsWatched > 0 && (
                <div className="text-sm text-green-700">📺 {stats.adsWatched} reklam izleyerek yardım ettin</div>
              )}
            </div>
          )}

          {/* Rozetler */}
          <div>
            <div className="text-sm font-black text-text mb-2">
              Rozetlerim ({earnedBadgeData.length}/{BADGES.length})
            </div>
            {earnedBadgeData.length === 0 ? (
              <div className="text-sm text-text-light italic bg-bg rounded-xl p-3 text-center">
                Henüz rozet kazanmadın. Hayvanlara yardım et! 🐾
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {BADGES.map((badge) => {
                  const earned = earnedBadges.includes(badge.id)
                  return (
                    <div
                      key={badge.id}
                      title={badge.title + ': ' + badge.description}
                      className={`rounded-xl p-2 text-center transition-all ${
                        earned
                          ? 'bg-yellow-50 border border-yellow-200'
                          : 'bg-gray-50 border border-gray-100 opacity-40'
                      }`}
                    >
                      <div className="text-xl mb-0.5">{badge.emoji}</div>
                      <div className={`text-[10px] font-bold ${earned ? 'text-yellow-800' : 'text-gray-400'}`}>
                        {badge.title}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark transition-colors"
          >
            Kapat 🐾
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
