function Space51Logo({ size = 'large' }) {
  const sizeClasses = {
    small: 'text-2xl',
    medium: 'text-4xl',
    large: 'text-5xl md:text-6xl',
  }

  return (
    <div className={`font-bold ${sizeClasses[size]} tracking-tight`}>
      <span className="text-white">Space</span>
      <span className="text-space-yellow">{`{51}`}</span>
    </div>
  )
}

export default Space51Logo
