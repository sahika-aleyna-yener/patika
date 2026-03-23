import { useGameStore } from '../../store/gameStore'

export default function MissionBar() {
  const { missions } = useGameStore()

  const completedCount = missions.filter((m) => m.completed).length
  const totalCount = missions.length

  return (
    <div className="bg-white border-t border-border px-4 py-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-bold text-text">
          Günlük Görevler ({completedCount}/{totalCount})
        </span>
        <span className="text-xs text-text-light">
          {completedCount === totalCount ? '🎉 Hepsi tamam!' : 'Devam et!'}
        </span>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {missions.map((mission) => (
          <div
            key={mission.id}
            className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-semibold shrink-0 transition-all ${
              mission.completed
                ? 'bg-green-100 text-green-700 border border-green-200'
                : 'bg-bg text-text-light border border-border'
            }`}
          >
            <span>{mission.emoji}</span>
            <span>{mission.title}</span>
            {!mission.completed && mission.progress > 0 && (
              <span className="bg-primary/20 text-primary rounded-full px-1">
                {mission.progress}/{mission.target}
              </span>
            )}
            {mission.completed && <span>✓</span>}
          </div>
        ))}
      </div>
    </div>
  )
}
