import Space51Logo from './Space51Logo'

function MainMenu({ onPlay, onLeaderboard }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 animate-fade-in">
      <div className="text-center mb-12">
        <Space51Logo />
        <h2 className="text-xl md:text-2xl text-gray-400 mt-4">Quiz Game</h2>
        <p className="text-gray-500 mt-2">Metti alla prova le tue conoscenze!</p>
      </div>

      <div className="w-full max-w-sm space-y-4">
        <button
          onClick={onPlay}
          className="btn-hover-scale w-full py-5 bg-space-yellow text-space-dark
            font-bold rounded-2xl text-xl flex items-center justify-center gap-3
            shadow-lg shadow-yellow-500/20"
        >
          <span className="text-2xl">🎮</span>
          Gioca
        </button>

        <button
          onClick={onLeaderboard}
          className="btn-hover-scale w-full py-5 bg-gray-800 text-white
            font-bold rounded-2xl text-xl flex items-center justify-center gap-3
            border-2 border-gray-700 hover:border-space-yellow
            shadow-lg shadow-black/20"
        >
          <span className="text-2xl">🏆</span>
          Classifica
        </button>
      </div>

      <footer className="mt-16 text-center text-gray-500 text-sm">
        <p>Crafted with passion by Andrea Gallucci</p>
      </footer>
    </div>
  )
}

export default MainMenu
