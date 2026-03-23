import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useGameLoop } from '../../hooks/useGameLoop'
import TopBar from '../ui/TopBar'
import MissionBar from '../ui/MissionBar'
import BadgeRow from '../ui/BadgeRow'
import NeighborhoodMap from '../map/NeighborhoodMap'
import AnimalPanel from '../animal/AnimalPanel'
import EmpathyModal from '../ui/EmpathyModal'
import FloatingScore from '../ui/FloatingScore'
import SeasonBanner from '../ui/SeasonBanner'
import AdoptionScreen from './AdoptionScreen'
import PremiumScreen from './PremiumScreen'
import ProfileScreen from './ProfileScreen'

export default function GameScreen() {
  useGameLoop()
  const [adoptAnimal, setAdoptAnimal] = useState(null)
  const [showPremium, setShowPremium] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  return (
    <div className="flex flex-col h-screen bg-bg overflow-hidden">
      <TopBar onPremiumClick={() => setShowPremium(true)} onProfileClick={() => setShowProfile(true)} />
      <SeasonBanner />

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Map */}
        <div className="flex-1 p-3 min-w-0">
          <NeighborhoodMap />
        </div>

        {/* Right: Animal panel */}
        <div className="w-72 shrink-0 bg-white border-l border-border overflow-hidden flex flex-col">
          <AnimalPanel onAdoptClick={(animal) => setAdoptAnimal(animal)} />
        </div>
      </div>

      {/* Bottom: Missions + Badges */}
      <div className="bg-white border-t border-border">
        <MissionBar />
        <BadgeRow />
      </div>

      {/* Modals */}
      <EmpathyModal />
      <FloatingScore />

      <AnimatePresence>
        {adoptAnimal && (
          <AdoptionScreen
            animal={adoptAnimal}
            onClose={() => setAdoptAnimal(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPremium && (
          <PremiumScreen onClose={() => setShowPremium(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showProfile && (
          <ProfileScreen onClose={() => setShowProfile(false)} />
        )}
      </AnimatePresence>
    </div>
  )
}
