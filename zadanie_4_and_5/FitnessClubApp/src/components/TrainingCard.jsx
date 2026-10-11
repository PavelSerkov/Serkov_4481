const typeIcons = {
  Йога: '◒',
  Силовая: '◆',
  Кардио: '♥',
};

const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
});

function TrainingCard({ training, onBook }) {
  const isSoldOut = training.slots === 0;
  const formattedDate = dateFormatter.format(new Date(`${training.date}T00:00:00`));

  return (
    <article className="group relative isolate flex min-h-96 overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 p-6 text-white shadow-2xl shadow-red-950/25 transition duration-300 hover:-translate-y-1 hover:shadow-orange-950/40">
      <div className="absolute -right-12 -top-10 -z-10 h-44 w-44 rotate-12 rounded-[2.5rem] border-[18px] border-white/15" />
      <div className="absolute -bottom-20 -left-12 -z-10 h-52 w-52 rounded-full border-[24px] border-yellow-300/20" />

      <div className="flex w-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-white/80">
              {formattedDate} · {training.type}
            </p>
            <h2 className="max-w-xs text-3xl font-black leading-none tracking-tight">
              {training.title}
            </h2>
          </div>
          <span
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/30 bg-white/15 text-2xl"
            aria-hidden="true"
          >
            {typeIcons[training.type]}
          </span>
        </div>

        <p className="mt-5 text-6xl font-black leading-none tracking-tighter">
          {training.time}
        </p>

        <dl className="mt-6 space-y-2 text-sm font-bold text-white/90">
          <div className="flex items-center justify-between gap-4 border-b border-white/20 pb-2">
            <dt className="text-white/65">Тренер</dt>
            <dd className="text-right">{training.trainer}</dd>
          </div>
          <div className="flex items-center justify-between gap-4 border-b border-white/20 pb-2">
            <dt className="text-white/65">Место</dt>
            <dd className="text-right">{training.place}</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-white/65">Свободно</dt>
            <dd className="text-right">{isSoldOut ? 'Мест нет' : `${training.slots} мест`}</dd>
          </div>
        </dl>

        <button
          className="mt-auto rounded-full bg-white px-6 py-3.5 text-base font-black text-neutral-950 shadow-lg transition hover:bg-neutral-950 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-red-600 disabled:cursor-not-allowed disabled:bg-neutral-900/45 disabled:text-white/65 disabled:shadow-none"
          type="button"
          disabled={isSoldOut}
          onClick={() => onBook(training)}
        >
          {isSoldOut ? 'Мест нет' : 'Записаться'}
        </button>
      </div>
    </article>
  );
}

export default TrainingCard;
