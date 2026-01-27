import { useState, useEffect } from 'react'
import HomeScreen from './components/HomeScreen'
import CountdownScreen from './components/CountdownScreen'
import QuizScreen from './components/QuizScreen'
import ResultsScreen from './components/ResultsScreen'

// Genera stelle casuali per lo sfondo
const generateStars = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 2,
  }))
}

function App() {
  const [screen, setScreen] = useState('home') // home, countdown, quiz, results
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [score, setScore] = useState(0)
  const [results, setResults] = useState({ correct: 0, wrong: 0, total: 0 })
  const [stars] = useState(() => generateStars(100))

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    setScore(0)
    setResults({ correct: 0, wrong: 0, total: 0 })
    setScreen('countdown')
  }

  const handleCountdownComplete = () => {
    setScreen('quiz')
  }

  const handleQuizComplete = (finalScore, finalResults) => {
    setScore(finalScore)
    setResults(finalResults)
    setScreen('results')
  }

  const handleRestart = () => {
    setSelectedCategory(null)
    setScore(0)
    setResults({ correct: 0, wrong: 0, total: 0 })
    setScreen('home')
  }

  const handlePlayAgain = () => {
    setScore(0)
    setResults({ correct: 0, wrong: 0, total: 0 })
    setScreen('countdown')
  }

  return (
    <div className="min-h-screen bg-space-dark relative">
      {/* Sfondo stelle */}
      <div className="stars-background">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Contenuto principale */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {screen === 'home' && (
          <HomeScreen onCategorySelect={handleCategorySelect} />
        )}

        {screen === 'countdown' && (
          <CountdownScreen
            category={selectedCategory}
            onComplete={handleCountdownComplete}
          />
        )}

        {screen === 'quiz' && (
          <QuizScreen
            category={selectedCategory}
            onComplete={handleQuizComplete}
          />
        )}

        {screen === 'results' && (
          <ResultsScreen
            score={score}
            results={results}
            category={selectedCategory}
            onRestart={handleRestart}
            onPlayAgain={handlePlayAgain}
          />
        )}
      </div>
    </div>
  )
}

export default App
