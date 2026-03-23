import { useGameStore } from '../../store/gameStore'

export default function TopBar({ onPremiumClick }) {
  const { score, streak, isPremium } = useGameStore()

  return (
    <div className="bg-primary text-white px-4 py-3 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🐾</span>
        <div>
          <div className="font-black text-lg leading-tight">Sokak Dostları</div>
          <div className="text-xs opacity-80">Mahalleni koru, bağ kur!</div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Streak */}
        <div className="flex items-center gap-1 bg-white/20 rounded-xl px-2 py-1">
          <span className="text-base">🔥</span>
          <span className="font-bold text-sm">{streak}</span>
        </div>

        {/* Score */}
        <div className="flex items-center gap-1 bg-white/20 rounded-xl px-2 py-1">
          <span className="text-base">⭐</span>
          <span className="font-bold text-sm">{score}</span>
        </div>

        {/* Premium badge */}
        {isPremium ? (
          <div className="bg-yellow-400 text-yellow-900 rounded-xl px-2 py-1 text-xs font-bold">
            👑 PRO
          </div>
        ) : (
          <button
            onClick={onPremiumClick}
            className="bg-white/20 hover:bg-white/30 rounded-xl px-2 py-1 text-xs font-bold transition-colors"
          >
            ✨ Pro'ya Geç
          </button>
        )}
      </div>
    </div>
  )
}
