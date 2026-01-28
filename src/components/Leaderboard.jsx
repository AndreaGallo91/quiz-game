import { useState, useEffect } from 'react'
import Space51Logo from './Space51Logo'

function Leaderboard({ onBack }) {
  const [scores, setScores] = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const savedScores = JSON.parse(localStorage.getItem('quizScores') || '[]')
    // Ordina per punteggio decrescente
    savedScores.sort((a, b) => b.score - a.score)
    setScores(savedScores)
  }, [])

  const filteredScores = filter === 'all'
    ? scores
    : scores.filter(s => s.category === filter)

  const getMedalEmoji = (index) => {
    if (index === 0) return '🥇'
    if (index === 1) return '🥈'
    if (index === 2) return '🥉'
    return `${index + 1}.`
  }

  const getCategoryEmoji = (category) => {
    const emojis = {
      cybersecurity: '🔐',
      onboarding: '🚀',
      prodotto: '💡'
    }
    return emojis[category] || '📝'
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    })
  }

  const clearScores = () => {
    if (window.confirm('Sei sicuro di voler cancellare tutti i punteggi?')) {
      localStorage.removeItem('quizScores')
      setScores([])
    }
  }

  return (
    <div className="flex-1 flex flex-col px-4 py-6 max-w-2xl mx-auto w-full animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="p-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <Space51Logo size="small" />
        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Title */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">
          🏆 Classifica
        </h1>
        <p className="text-gray-400">I migliori punteggi</p>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {['all', 'cybersecurity', 'onboarding', 'prodotto'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
              ${filter === cat
                ? 'bg-space-yellow text-space-dark'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
          >
            {cat === 'all' ? '📊 Tutti' : `${getCategoryEmoji(cat)} ${cat.charAt(0).toUpperCase() + cat.slice(1)}`}
          </button>
        ))}
      </div>

      {/* Scores List */}
      <div className="flex-1 space-y-3 overflow-y-auto">
        {filteredScores.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-6xl mb-4">🎮</p>
            <p className="text-gray-400 text-lg">Nessun punteggio salvato</p>
            <p className="text-gray-500 mt-2">Gioca per entrare in classifica!</p>
          </div>
        ) : (
          filteredScores.map((score, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 p-4 rounded-xl bg-gray-800/50 border
                ${index === 0 ? 'border-yellow-500/50 bg-yellow-500/5' :
                  index === 1 ? 'border-gray-400/50 bg-gray-400/5' :
                  index === 2 ? 'border-orange-600/50 bg-orange-600/5' :
                  'border-gray-700'}`}
            >
              <div className="text-2xl w-10 text-center">
                {getMedalEmoji(index)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold truncate">{score.name}</p>
                <p className="text-gray-400 text-sm flex items-center gap-2">
                  <span>{getCategoryEmoji(score.category)}</span>
                  <span className="capitalize">{score.category}</span>
                  <span className="text-gray-600">•</span>
                  <span>{formatDate(score.date)}</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-space-yellow font-bold text-xl">{score.score}</p>
                <p className="text-gray-500 text-sm">punti</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Clear button */}
      {scores.length > 0 && (
        <button
          onClick={clearScores}
          className="mt-6 text-red-400 text-sm hover:text-red-300 transition-colors"
        >
          🗑️ Cancella tutti i punteggi
        </button>
      )}

      <footer className="mt-6 text-center text-gray-500 text-sm">
        <p>Crafted with passion by Andrea Gallucci</p>
      </footer>
    </div>
  )
}

export default Leaderboard
