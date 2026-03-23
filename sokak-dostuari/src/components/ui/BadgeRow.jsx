import { useGameStore } from '../../store/gameStore'
import { BADGES } from '../../data/badges'

export default function BadgeRow() {
  const { earnedBadges } = useGameStore()

  if (earnedBadges.length === 0) {
    return (
      <div className="px-4 py-2 text-xs text-text-light italic">
        Henüz rozet kazanmadın. Hayvanlara yardım et! 🐾
      </div>
    )
  }

  const earned = BADGES.filter((b) => earnedBadges.includes(b.id))

  return (
    <div className="px-4 py-2">
      <div className="text-xs font-bold text-text mb-1.5">Rozetlerim 🏅</div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {earned.map((badge) => (
          <div
            key={badge.id}
            title={badge.title + ': ' + badge.description}
            className="shrink-0 bg-yellow-50 border border-yellow-200 rounded-xl px-2 py-1 flex items-center gap-1 text-xs"
          >
            <span>{badge.emoji}</span>
            <span className="font-semibold text-yellow-800">{badge.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
