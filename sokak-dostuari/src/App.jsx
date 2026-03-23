import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { useGameStore } from './store/gameStore'
import OnboardingScreen from './components/screens/OnboardingScreen'
import GameScreen from './components/screens/GameScreen'

function App() {
  const { currentScreen, updateStreak } = useGameStore()

  useEffect(() => {
    updateStreak()
  }, [])

  return (
    <div className="font-nunito">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: '16px',
            fontFamily: 'Nunito, sans-serif',
            fontWeight: '600',
          },
        }}
      />

      {currentScreen === 'onboarding' ? <OnboardingScreen /> : <GameScreen />}
    </div>
  )
}

export default App
