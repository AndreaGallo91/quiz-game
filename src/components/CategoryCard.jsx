function CategoryCard({ category, onClick }) {
  const icons = {
    cybersecurity: '🔐',
    onboarding: '🚀',
    prodotto: '💡',
  }

  const descriptions = {
    cybersecurity: 'Sicurezza informatica e best practices',
    onboarding: 'Processi e procedure aziendali',
    prodotto: 'Caratteristiche e funzionalita',
  }

  const colors = {
    cybersecurity: 'from-purple-600 to-blue-600',
    onboarding: 'from-green-600 to-teal-600',
    prodotto: 'from-orange-600 to-red-600',
  }

  return (
    <button
      onClick={() => onClick(category)}
      className={`card-hover w-full p-6 rounded-2xl bg-gradient-to-br ${colors[category]}
        text-white text-left transition-all duration-300 border border-white/10
        hover:border-space-yellow/50 group`}
    >
      <div className="flex items-center gap-4 mb-3">
        <span className="text-4xl group-hover:scale-110 transition-transform">
          {icons[category]}
        </span>
        <h3 className="text-xl font-bold capitalize">{category}</h3>
      </div>
      <p className="text-white/80 text-sm">{descriptions[category]}</p>
      <div className="mt-4 flex items-center text-space-yellow text-sm font-medium">
        <span>5 domande</span>
        <svg
          className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </button>
  )
}

export default CategoryCard
