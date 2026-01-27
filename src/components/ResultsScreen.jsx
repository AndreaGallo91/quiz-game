import Space51Logo from './Space51Logo'

function ResultsScreen({ score, results, category, onRestart, onPlayAgain }) {
  const percentage = Math.round((results.correct / results.total) * 100)

  const getEmoji = () => {
    if (percentage >= 80) return '🏆'
    if (percentage >= 60) return '🌟'
    if (percentage >= 40) return '👍'
    return '💪'
  }

  const getMessage = () => {
    if (percentage >= 80) return 'Eccezionale! Sei un vero esperto!'
    if (percentage >= 60) return 'Ottimo lavoro! Continua cosi!'
    if (percentage >= 40) return 'Buon risultato! Puoi migliorare!'
    return 'Non mollare! Riprova ancora!'
  }

  const getGrade = () => {
    if (percentage >= 90) return { letter: 'A+', color: 'text-green-400' }
    if (percentage >= 80) return { letter: 'A', color: 'text-green-500' }
    if (percentage >= 70) return { letter: 'B', color: 'text-blue-400' }
    if (percentage >= 60) return { letter: 'C', color: 'text-yellow-400' }
    if (percentage >= 50) return { letter: 'D', color: 'text-orange-400' }
    return { letter: 'F', color: 'text-red-400' }
  }

  const grade = getGrade()

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 animate-fade-in">
      <Space51Logo size="medium" />

      <div className="text-center mt-8 mb-6">
        <div className="text-8xl mb-4 animate-bounce-in">{getEmoji()}</div>
        <h2 className="text-2xl md:text-3xl text-white font-bold mb-2">
          Quiz Completato!
        </h2>
        <p className="text-gray-400 capitalize">Categoria: {category}</p>
      </div>

      {/* Score card */}
      <div className="w-full max-w-sm bg-gray-800/50 rounded-2xl p-6 mb-6">
        <div className="text-center mb-6">
          <div className={`text-6xl font-bold ${grade.color} mb-2`}>
            {grade.letter}
          </div>
          <p className="text-gray-400">{getMessage()}</p>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-3xl font-bold text-space-yellow">{score}</p>
            <p className="text-gray-500 text-sm">Punti</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-green-500">{results.correct}</p>
            <p className="text-gray-500 text-sm">Corrette</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-red-500">{results.wrong}</p>
            <p className="text-gray-500 text-sm">Errate</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Accuratezza</span>
            <span className="text-white font-medium">{percentage}%</span>
          </div>
          <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-space-yellow to-green-500 rounded-full transition-all duration-1000"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="w-full max-w-sm space-y-3">
        <button
          onClick={onPlayAgain}
          className="btn-hover-scale w-full py-4 bg-space-yellow text-space-dark
            font-bold rounded-xl text-lg"
        >
          Gioca Ancora
        </button>
        <button
          onClick={onRestart}
          className="btn-hover-scale w-full py-4 bg-gray-800 text-white
            font-bold rounded-xl text-lg border border-gray-700
            hover:border-space-yellow"
        >
          Cambia Categoria
        </button>
      </div>

      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>Crafted with passion by Andrea Gallucci</p>
      </footer>
    </div>
  )
}

export default ResultsScreen
