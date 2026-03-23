import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { INITIAL_ANIMALS } from '../data/animals'
import { DAILY_MISSIONS, SEASONAL_EVENTS } from '../data/missions'
import { BADGES } from '../data/badges'

const today = () => new Date().toDateString()

const initialMissions = DAILY_MISSIONS.map((m) => ({
  ...m,
  progress: 0,
  completed: false,
}))

const initialStats = {
  totalFeeds: 0,
  totalMedicines: 0,
  totalAdoptions: 0,
  totalSterilizations: 0,
  maxBond: 0,
  maxStreak: 0,
  hasDonated: false,
  adsWatched: 0,
}

export const useGameStore = create(
  persist(
    (set, get) => ({
      // State
      animals: INITIAL_ANIMALS,
      selectedAnimalId: null,
      score: 0,
      streak: 0,
      lastPlayDate: null,
      missions: initialMissions,
      earnedBadges: [],
      stats: initialStats,
      isPremium: false,
      totalDonated: 0,
      currentScreen: 'onboarding', // 'onboarding' | 'game' | 'adoption' | 'premium'
      floatingTexts: [],
      activeEvent: null,

      // Actions
      setScreen: (screen) => set({ currentScreen: screen }),

      selectAnimal: (id) => set({ selectedAnimalId: id }),

      doAction: (animalId, actionType) => {
        const { animals, stats, missions, earnedBadges, activeEvent } = get()
        const animal = animals.find((a) => a.id === animalId)
        if (!animal) return

        let changes = {}
        let scoreGain = 0
        let storyText = ''
        let missionType = null
        let empathyWarning = null

        const reactions = animal.reactions[actionType] || []
        const randomReaction = reactions[Math.floor(Math.random() * reactions.length)] || ''

        switch (actionType) {
          case 'feed':
            if (animal.health < 40) {
              // Empathy lesson: feeding sick animal first
              changes = { hunger: Math.min(100, animal.hunger + 20), bond: Math.min(100, animal.bond + 3) }
              scoreGain = 5
              storyText = randomReaction
              missionType = 'feed_3'
            } else {
              changes = {
                hunger: Math.min(100, animal.hunger + 30),
                bond: Math.min(100, animal.bond + 8),
                trust: Math.min(100, animal.trust + 5),
                health: Math.min(100, animal.health + 5),
                need: animal.need === 'food' ? null : animal.need,
              }
              scoreGain = 15
              storyText = randomReaction
              missionType = 'feed_3'
            }
            break

          case 'approach':
            if (animal.health < 40) {
              // Wrong action — empathy warning
              changes = { trust: Math.max(0, animal.trust - 5) }
              scoreGain = 0
              empathyWarning = {
                title: 'Dikkat!',
                message: `${animal.name} hasta olduğunda dokunulmak istemez. Önce ilaç lazım! 💊`,
                lesson: 'Hasta hayvanlar önce tedavi ister.',
              }
              storyText = `Lütfen... önce iyileştir beni.`
            } else {
              changes = {
                trust: Math.min(100, animal.trust + 10),
                bond: Math.min(100, animal.bond + 12),
                need: animal.need === 'attention' ? null : animal.need,
              }
              scoreGain = 20
              storyText = randomReaction
              missionType = 'approach_2'
            }
            break

          case 'medicine':
            changes = {
              health: Math.min(100, animal.health + 25),
              trust: Math.min(100, animal.trust + 3),
              bond: Math.min(100, animal.bond + 5),
              need: animal.need === 'medicine' ? null : animal.need,
            }
            scoreGain = 30
            storyText = randomReaction
            missionType = 'give_medicine'
            break

          case 'sterilize':
            if (animal.isSterilized) return
            changes = { isSterilized: true, bond: Math.min(100, animal.bond + 5) }
            scoreGain = 50
            storyText = 'Bu benim ve sokaktaki diğer hayvanlar için doğru karar.'
            break

          case 'vaccinate':
            if (animal.isVaccinated) return
            changes = { isVaccinated: true, health: Math.min(100, animal.health + 10) }
            scoreGain = 40
            storyText = 'Aşı oldum. Artık daha güvendeyim.'
            break

          default:
            return
        }

        // Apply seasonal event multiplier
        const multiplier = activeEvent?.multiplier || 1
        scoreGain = scoreGain * multiplier

        // Update need based on new stats
        const newAnimal = { ...animal, ...changes }
        if (!changes.need) {
          if (newAnimal.hunger < 30) newAnimal.need = 'food'
          else if (newAnimal.health < 40) newAnimal.need = 'medicine'
          else if (newAnimal.bond < 30) newAnimal.need = 'attention'
          else newAnimal.need = null
        }

        // Check adoptability
        if (newAnimal.bond >= 70 && newAnimal.health >= 60) {
          newAnimal.isAdoptable = true
        }

        // Update animals
        const updatedAnimals = animals.map((a) => (a.id === animalId ? { ...a, ...newAnimal } : a))

        // Update stats
        const newStats = { ...stats }
        if (actionType === 'feed') newStats.totalFeeds += 1
        if (actionType === 'medicine') newStats.totalMedicines += 1
        if (actionType === 'sterilize') newStats.totalSterilizations += 1
        if (newAnimal.bond > newStats.maxBond) newStats.maxBond = newAnimal.bond

        // Update missions
        const updatedMissions = missions.map((m) => {
          if (m.id === missionType && !m.completed) {
            const newProgress = m.progress + 1
            const completed = newProgress >= m.target
            return { ...m, progress: newProgress, completed }
          }
          return m
        })

        // Check for new badges
        const currentScore = get().score + scoreGain
        const allBadgeIds = new Set(earnedBadges)
        const newBadges = [...earnedBadges]
        for (const badge of BADGES) {
          if (!allBadgeIds.has(badge.id) && badge.condition(newStats, currentScore)) {
            newBadges.push(badge.id)
          }
        }

        // Floating text
        const floatingId = Date.now()
        const floatingTexts = [
          ...(get().floatingTexts || []),
          { id: floatingId, text: `+${scoreGain}`, x: 50, y: 50 },
        ]
        setTimeout(() => {
          set((state) => ({
            floatingTexts: state.floatingTexts.filter((t) => t.id !== floatingId),
          }))
        }, 1200)

        set({
          animals: updatedAnimals,
          score: get().score + scoreGain,
          missions: updatedMissions,
          earnedBadges: newBadges,
          stats: newStats,
          floatingTexts,
          empathyWarning: empathyWarning || null,
          lastStory: { animalId, text: storyText },
        })

        return { scoreGain, storyText, empathyWarning }
      },

      adoptAnimal: (animalId) => {
        const { animals, stats, earnedBadges } = get()
        const animal = animals.find((a) => a.id === animalId)
        if (!animal || !animal.isAdoptable) return

        const updatedAnimals = animals.map((a) =>
          a.id === animalId ? { ...a, isAdopted: true, isAdoptable: false } : a
        )

        const newStats = { ...stats, totalAdoptions: stats.totalAdoptions + 1 }
        const adoptionScore = get().score + 100

        const allBadgeIds = new Set(earnedBadges)
        const newBadges = [...earnedBadges]
        for (const badge of BADGES) {
          if (!allBadgeIds.has(badge.id) && badge.condition(newStats, adoptionScore)) {
            newBadges.push(badge.id)
          }
        }

        set({
          animals: updatedAnimals,
          score: get().score + 100,
          stats: newStats,
          earnedBadges: newBadges,
        })
      },

      updateStreak: () => {
        const { lastPlayDate, streak, stats } = get()
        const todayStr = today()
        if (lastPlayDate === todayStr) return

        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        const isConsecutive = lastPlayDate === yesterday.toDateString()

        const newStreak = isConsecutive ? streak + 1 : 1
        const newMaxStreak = Math.max(stats.maxStreak, newStreak)

        set({
          streak: newStreak,
          lastPlayDate: todayStr,
          stats: { ...stats, maxStreak: newMaxStreak },
        })

        // Reset daily missions
        set({
          missions: DAILY_MISSIONS.map((m) => ({ ...m, progress: 0, completed: false })),
        })
      },

      setPremium: (value) => set({ isPremium: value }),

      recordDonation: (amount) => {
        const { stats, earnedBadges } = get()
        const newStats = { ...stats, hasDonated: true }
        const allBadgeIds = new Set(earnedBadges)
        const newBadges = [...earnedBadges]
        for (const badge of BADGES) {
          if (!allBadgeIds.has(badge.id) && badge.condition(newStats, get().score)) {
            newBadges.push(badge.id)
          }
        }
        set({
          totalDonated: get().totalDonated + amount,
          stats: newStats,
          earnedBadges: newBadges,
        })
      },

      watchAd: () => {
        const { stats, earnedBadges } = get()
        const newStats = { ...stats, adsWatched: stats.adsWatched + 1 }
        const adScore = get().score + 20
        const allBadgeIds = new Set(earnedBadges)
        const newBadges = [...earnedBadges]
        for (const badge of BADGES) {
          if (!allBadgeIds.has(badge.id) && badge.condition(newStats, adScore)) {
            newBadges.push(badge.id)
          }
        }
        set({
          score: get().score + 20,
          stats: newStats,
          earnedBadges: newBadges,
        })
      },

      clearEmpathyWarning: () => set({ empathyWarning: null }),

      setActiveEvent: (event) => set({ activeEvent: event }),

      detectSeasonalEvent: () => {
        const now = new Date()
        const month = now.getMonth() + 1
        const day = now.getDate()
        const event = SEASONAL_EVENTS.find((e) => {
          if (!e.months.includes(month)) return false
          if (e.day && e.day !== day) return false
          return true
        })
        set({ activeEvent: event || null })
      },

      decayHunger: () => {
        const { animals } = get()
        const updated = animals.map((a) => {
          if (a.isAdopted) return a
          const newHunger = Math.max(0, a.hunger - 5)
          let need = a.need
          if (newHunger < 30 && need !== 'medicine') need = 'food'
          return { ...a, hunger: newHunger, need }
        })
        set({ animals: updated })
      },
    }),
    {
      name: 'patika-save',
      partialize: (state) => ({
        animals: state.animals,
        score: state.score,
        streak: state.streak,
        lastPlayDate: state.lastPlayDate,
        missions: state.missions,
        earnedBadges: state.earnedBadges,
        stats: state.stats,
        isPremium: state.isPremium,
        totalDonated: state.totalDonated,
      }),
    }
  )
)
