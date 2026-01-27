import { useState, useEffect } from 'react'
import Space51Logo from './Space51Logo'

function CountdownScreen({ category, onComplete }) {
  const [count, setCount] = useState(3)

  useEffect(() => {
    if (count === 0) {
      onComplete()
      return
    }

    const timer = setTimeout(() => {
      setCount(count - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [count, onComplete])

  const getMessage = () => {
    if (count === 3) return 'Preparati...'
    if (count === 2) return 'Concentrati...'
    if (count === 1) return 'Via!'
    return 'Preparati al lancio!'
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4">
      <div className="mb-8">
        <Space51Logo size="medium" />
      </div>

      <div className="text-center">
        <p className="text-gray-400 text-lg mb-4 capitalize">
          Categoria: <span className="text-space-yellow">{category}</span>
        </p>

        <div className="relative">
          <div
            key={count}
            className="countdown-number text-9xl md:text-[12rem] font-bold text-space-yellow"
          >
            {count > 0 ? count : '🚀'}
          </div>
        </div>

        <p className="text-2xl md:text-3xl text-white mt-8 font-medium">
          {getMessage()}
        </p>

        <p className="text-gray-500 mt-4">
          Preparati al lancio!
        </p>
      </div>
    </div>
  )
}

export default CountdownScreen
