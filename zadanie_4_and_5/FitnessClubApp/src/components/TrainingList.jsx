import TrainingCard from './TrainingCard.jsx';

function TrainingList({ trainings, onBook }) {
  if (trainings.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 px-6 py-20 text-center">
        <p className="text-xl font-bold text-white">Пока нет доступных тренировок</p>
        <p className="mt-2 text-sm text-neutral-400">Попробуйте выбрать другой фильтр.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {trainings.map((training) => (
        <TrainingCard key={training.id} training={training} onBook={onBook} />
      ))}
    </div>
  );
}

export default TrainingList;
