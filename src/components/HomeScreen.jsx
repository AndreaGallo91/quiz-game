import Space51Logo from './Space51Logo'
import CategoryCard from './CategoryCard'

function HomeScreen({ onCategorySelect }) {
  const categories = ['cybersecurity', 'onboarding', 'prodotto']

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 animate-fade-in">
      <div className="text-center mb-12">
        <Space51Logo />
        <h2 className="text-xl md:text-2xl text-gray-400 mt-4">Quiz Game</h2>
        <p className="text-gray-500 mt-2">Metti alla prova le tue conoscenze!</p>
      </div>

      <div className="w-full max-w-md space-y-4">
        <h3 className="text-white text-lg font-semibold mb-4 text-center">
          Scegli una categoria
        </h3>
        {categories.map((category, index) => (
          <div
            key={category}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CategoryCard category={category} onClick={onCategorySelect} />
          </div>
        ))}
      </div>

      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>Crafted with passion by Andrea Gallucci</p>
      </footer>
    </div>
  )
}

export default HomeScreen
