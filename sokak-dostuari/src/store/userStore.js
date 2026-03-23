import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const AVATARS = ['🧑', '👧', '👦', '👩', '👨', '🧒', '👴', '👵', '🧑‍🦱', '🧑‍🦰', '🧑‍🦳', '🧑‍🦲']
const THEMES = [
  { id: 'default', label: 'Gündüz', emoji: '☀️', bg: '#FFF9F0', primary: '#FF8C42' },
  { id: 'night', label: 'Gece', emoji: '🌙', bg: '#1A1A2E', primary: '#9C27B0' },
  { id: 'spring', label: 'İlkbahar', emoji: '🌸', bg: '#FFF0F5', primary: '#E91E8C' },
  { id: 'winter', label: 'Kış', emoji: '❄️', bg: '#F0F8FF', primary: '#1976D2' },
]

export { AVATARS, THEMES }

export const useUserStore = create(
  persist(
    (set, get) => ({
      playerName: 'Sokak Dostu',
      avatar: '🧑',
      themeId: 'default',
      joinDate: new Date().toISOString(),

      setPlayerName: (name) => set({ playerName: name.trim() || 'Sokak Dostu' }),
      setAvatar: (avatar) => set({ avatar }),
      setTheme: (themeId) => set({ themeId }),

      getTheme: () => {
        return THEMES.find((t) => t.id === get().themeId) || THEMES[0]
      },
    }),
    { name: 'patika-user' }
  )
)
