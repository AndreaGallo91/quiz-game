import { useState } from 'react'

function SaveScoreModal({ score, category, onSave, onSkip }) {
  const [name, setName] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return

    setIsSaving(true)

    const scoreData = {
      name: name.trim(),
      score,
      category,
      date: new Date().toISOString()
    }

    // Salva in localStorage
    const existingScores = JSON.parse(localStorage.getItem('quizScores') || '[]')
    existingScores.push(scoreData)
    localStorage.setItem('quizScores', JSON.stringify(existingScores))

    setTimeout(() => {
      onSave()
    }, 500)
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-sm animate-slide-up border border-gray-700">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">🏆</div>
          <h2 className="text-2xl font-bold text-white">Salva il tuo punteggio!</h2>
          <p className="text-gray-400 mt-2">
            Hai totalizzato <span className="text-space-yellow font-bold">{score} punti</span>
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-300 text-sm mb-2">
              Il tuo nome
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Inserisci il tuo nome..."
              maxLength={20}
              autoFocus
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl
                text-white placeholder-gray-400 focus:outline-none focus:border-space-yellow
                transition-colors"
            />
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              disabled={!name.trim() || isSaving}
              className="btn-hover-scale w-full py-3 bg-space-yellow text-space-dark
                font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed
                disabled:transform-none"
            >
              {isSaving ? '✨ Salvando...' : '💾 Salva Punteggio'}
            </button>

            <button
              type="button"
              onClick={onSkip}
              className="w-full py-3 text-gray-400 hover:text-white transition-colors"
            >
              Salta
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SaveScoreModal
