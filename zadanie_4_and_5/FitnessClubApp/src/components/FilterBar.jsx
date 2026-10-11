const filters = ['Все', 'Йога', 'Силовая', 'Кардио'];

function FilterBar({ activeFilter, onFilterChange }) {
  return (
    <div
      className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      role="group"
      aria-label="Фильтр по типу тренировки"
    >
      {filters.map((filter) => {
        const isActive = activeFilter === filter;

        return (
          <button
            key={filter}
            className={`shrink-0 rounded-full border px-6 py-3 text-sm font-extrabold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-4 focus-visible:ring-offset-neutral-950 sm:min-w-32 sm:text-base ${
              isActive
                ? 'border-transparent bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-red-950/30'
                : 'border-white/25 bg-transparent text-white hover:border-orange-500 hover:text-orange-400'
            }`}
            type="button"
            aria-pressed={isActive}
            onClick={() => onFilterChange(filter)}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
}

export default FilterBar;
