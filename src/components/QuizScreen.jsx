import { useState, useEffect, useCallback } from 'react'
import Space51Logo from './Space51Logo'
import { questions } from '../data/questions'
import useTimer from '../hooks/useTimer'

const QUESTION_TIME = 30
const BASE_POINTS = 10
const MAX_BONUS = 5

function QuizScreen({ category, onComplete }) {
  const categoryQuestions = questions[category] || []
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [results, setResults] = useState({ correct: 0, wrong: 0, total: categoryQuestions.length })

  const currentQuestion = categoryQuestions[currentIndex]

  const handleTimeUp = useCallback(() => {
    if (!showResult) {
      setSelectedAnswer(-1) // Timeout
      setShowResult(true)
      setResults(prev => ({ ...prev, wrong: prev.wrong + 1 }))
    }
  }, [showResult])

  const { timeLeft, resetTimer, stopTimer } = useTimer(QUESTION_TIME, handleTimeUp)

  const calculateBonus = (remainingTime) => {
    // Bonus proporzionale al tempo rimasto
    return Math.round((remainingTime / QUESTION_TIME) * MAX_BONUS)
  }

  const handleAnswerSelect = (answerIndex) => {
    if (showResult) return

    stopTimer()
    setSelectedAnswer(answerIndex)
    setShowResult(true)

    const isCorrect = answerIndex === currentQuestion.correct

    if (isCorrect) {
      const bonus = calculateBonus(timeLeft)
      setScore(prev => prev + BASE_POINTS + bonus)
      setResults(prev => ({ ...prev, correct: prev.correct + 1 }))
    } else {
      setResults(prev => ({ ...prev, wrong: prev.wrong + 1 }))
    }
  }

  const handleNext = () => {
    if (currentIndex < categoryQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
      resetTimer()
    } else {
      onComplete(score, results)
    }
  }

  // Timer circle calculations
  const circleRadius = 45
  const circleCircumference = 2 * Math.PI * circleRadius
  const strokeDashoffset = circleCircumference * (1 - timeLeft / QUESTION_TIME)

  const getTimerColor = () => {
    if (timeLeft > 20) return '#facc15' // Yellow
    if (timeLeft > 10) return '#f97316' // Orange
    return '#ef4444' // Red
  }

  const getAnswerClass = (index) => {
    if (!showResult) return ''
    if (index === currentQuestion.correct) return 'correct'
    if (index === selectedAnswer && selectedAnswer !== currentQuestion.correct) return 'wrong'
    return ''
  }

  if (!currentQuestion) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-white">Nessuna domanda disponibile</p>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col px-4 py-6 max-w-2xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Space51Logo size="small" />
        <div className="text-right">
          <p className="text-space-yellow font-bold text-xl">{score} pt</p>
          <p className="text-gray-500 text-sm capitalize">{category}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Domanda {currentIndex + 1}/{categoryQuestions.length}</span>
        </div>
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="progress-fill h-full bg-space-yellow rounded-full"
            style={{ width: `${((currentIndex + 1) / categoryQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Timer */}
      <div className="flex justify-center mb-6">
        <div className="relative w-24 h-24">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="48"
              cy="48"
              r={circleRadius}
              fill="none"
              stroke="#374151"
              strokeWidth="6"
            />
            <circle
              cx="48"
              cy="48"
              r={circleRadius}
              fill="none"
              stroke={getTimerColor()}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circleCircumference}
              strokeDashoffset={strokeDashoffset}
              className="timer-circle"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-2xl font-bold"
              style={{ color: getTimerColor() }}
            >
              {timeLeft}
            </span>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-gray-800/50 rounded-2xl p-6 mb-6 animate-fade-in">
        <h2 className="text-xl md:text-2xl text-white font-medium leading-relaxed">
          {currentQuestion.question}
        </h2>
      </div>

      {/* Answers */}
      <div className="space-y-3 flex-1">
        {currentQuestion.answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            disabled={showResult}
            className={`answer-btn w-full p-4 rounded-xl text-left transition-all
              border-2 border-gray-700 bg-gray-800/30
              ${getAnswerClass(index)}
              ${!showResult ? 'hover:border-space-yellow hover:bg-gray-800/50' : ''}
              disabled:cursor-not-allowed`}
          >
            <div className="flex items-center gap-4">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center
                text-sm font-bold
                ${getAnswerClass(index) === 'correct' ? 'bg-green-500 text-white' :
                  getAnswerClass(index) === 'wrong' ? 'bg-red-500 text-white' :
                  'bg-gray-700 text-gray-300'}`}
              >
                {String.fromCharCode(65 + index)}
              </span>
              <span className="text-white">{answer}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Next button */}
      {showResult && (
        <div className="mt-6 animate-slide-up">
          <div className="text-center mb-4">
            {selectedAnswer === currentQuestion.correct ? (
              <p className="text-green-500 font-medium">
                Corretto! +{BASE_POINTS + calculateBonus(timeLeft)} punti
              </p>
            ) : selectedAnswer === -1 ? (
              <p className="text-red-500 font-medium">Tempo scaduto!</p>
            ) : (
              <p className="text-red-500 font-medium">Sbagliato!</p>
            )}
          </div>
          <button
            onClick={handleNext}
            className="btn-hover-scale w-full py-4 bg-space-yellow text-space-dark
              font-bold rounded-xl text-lg"
          >
            {currentIndex < categoryQuestions.length - 1 ? 'Prossima Domanda' : 'Vedi Risultati'}
          </button>
        </div>
      )}
    </div>
  )
}

export default QuizScreen
