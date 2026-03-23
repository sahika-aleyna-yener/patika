import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import TopBar from '../ui/TopBar'
import MissionBar from '../ui/MissionBar'
import BadgeRow from '../ui/BadgeRow'
import NeighborhoodMap from '../map/NeighborhoodMap'
import AnimalPanel from '../animal/AnimalPanel'
import EmpathyModal from '../ui/EmpathyModal'
import AdoptionScreen from './AdoptionScreen'
import PremiumScreen from './PremiumScreen'

export default function GameScreen() {
  const [adoptAnimal, setAdoptAnimal] = useState(null)
  const [showPremium, setShowPremium] = useState(false)

  return (
    <div className="flex flex-col h-screen bg-bg overflow-hidden">
      <TopBar onPremiumClick={() => setShowPremium(true)} />

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
    </div>
  )
}
