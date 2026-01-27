import { useState, useEffect, useCallback, useRef } from 'react'

function useTimer(initialTime, onTimeUp) {
  const [timeLeft, setTimeLeft] = useState(initialTime)
  const [isRunning, setIsRunning] = useState(true)
  const intervalRef = useRef(null)
  const onTimeUpRef = useRef(onTimeUp)

  // Aggiorna il ref quando cambia onTimeUp
  useEffect(() => {
    onTimeUpRef.current = onTimeUp
  }, [onTimeUp])

  useEffect(() => {
    if (!isRunning) return

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          setIsRunning(false)
          if (onTimeUpRef.current) {
            onTimeUpRef.current()
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning])

  const resetTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    setTimeLeft(initialTime)
    setIsRunning(true)
  }, [initialTime])

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    setIsRunning(false)
  }, [])

  const startTimer = useCallback(() => {
    setIsRunning(true)
  }, [])

  return {
    timeLeft,
    isRunning,
    resetTimer,
    stopTimer,
    startTimer
  }
}

export default useTimer
