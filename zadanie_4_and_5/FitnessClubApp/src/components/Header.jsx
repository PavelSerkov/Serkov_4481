function Header({ user, isAuthLoading, onProfileClick, onSignOut }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-neutral-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a
          className="flex items-center gap-3 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-4 focus-visible:ring-offset-neutral-950"
          href="#schedule"
          aria-label="Импульс — к расписанию тренировок"
        >
          <svg
            className="h-9 w-12 text-orange-500"
            viewBox="0 0 56 38"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2 24h12l7-11 7 20 9-29 6 20h11"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
          </svg>
          <span className="text-xl font-black uppercase italic tracking-tight sm:text-2xl">
            Импульс
          </span>
        </a>

        {user ? (
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <span
              className="max-w-24 truncate text-xs font-bold text-neutral-300 sm:max-w-64 sm:text-sm"
              title={user.email}
            >
              {user.email}
            </span>
            <button
              className="rounded-full border border-white/20 px-3 py-2 text-xs font-black text-white transition hover:border-orange-500 hover:text-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-4 focus-visible:ring-offset-neutral-950 disabled:cursor-wait disabled:opacity-50 sm:px-5 sm:text-sm"
              type="button"
              disabled={isAuthLoading}
              onClick={onSignOut}
            >
              Выйти
            </button>
          </div>
        ) : (
          <button
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/10 text-white transition hover:border-orange-500 hover:bg-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-4 focus-visible:ring-offset-neutral-950 disabled:cursor-wait disabled:opacity-50"
            type="button"
            aria-label="Открыть форму входа"
            disabled={isAuthLoading}
            onClick={onProfileClick}
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M20 21a8 8 0 0 0-16 0M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
