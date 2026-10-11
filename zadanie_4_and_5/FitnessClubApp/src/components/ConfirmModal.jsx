function ConfirmModal({ training, isSubmitting, onConfirm, onCancel }) {
  if (training === null) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/75 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={onCancel}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-white/10 bg-neutral-900 p-6 text-white shadow-2xl sm:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="mb-5 grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-2xl">
          ✓
        </div>
        <h2 id="booking-modal-title" className="text-2xl font-black leading-tight sm:text-3xl">
          Записаться на «{training.title}»?
        </h2>
        <p className="mt-3 text-neutral-400">
          {training.date} в {training.time} · {training.place}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            className="rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 font-black text-white transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-4 focus-visible:ring-offset-neutral-900 disabled:cursor-wait disabled:opacity-60"
            type="button"
            disabled={isSubmitting}
            onClick={onConfirm}
          >
            {isSubmitting ? 'Записываем...' : 'Да, записаться'}
          </button>
          <button
            className="rounded-full border border-white/20 px-6 py-3 font-bold text-white transition hover:border-white/50 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-neutral-900 disabled:cursor-wait disabled:opacity-60"
            type="button"
            disabled={isSubmitting}
            onClick={onCancel}
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
