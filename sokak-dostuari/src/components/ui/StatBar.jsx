export default function StatBar({ label, value, color, emoji }) {
  const clampedValue = Math.max(0, Math.min(100, value))

  const getColor = () => {
    if (color) return color
    if (clampedValue >= 70) return '#4CAF50'
    if (clampedValue >= 40) return '#FF9800'
    return '#F44336'
  }

  return (
    <div className="flex items-center gap-2 mb-1">
      <span className="text-sm w-5">{emoji}</span>
      <span className="text-xs text-text-light w-12 shrink-0">{label}</span>
      <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${clampedValue}%`, backgroundColor: getColor() }}
        />
      </div>
      <span className="text-xs text-text-light w-8 text-right">{clampedValue}</span>
    </div>
  )
}
