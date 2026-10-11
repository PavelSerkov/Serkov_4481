import { useState } from 'react';

function AuthForm({ isLoading, onSignIn, onSignUp, onCancel }) {
  const [mode, setMode] = useState('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isSignIn = mode === 'signIn';

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isSignIn) {
      onSignIn(email, password);
      return;
    }

    onSignUp(email, password);
  };

  const handleBackdropClick = () => {
    if (!isLoading) {
      onCancel();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={handleBackdropClick}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-white/10 bg-neutral-900 p-6 text-white shadow-2xl sm:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-form-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">
              Личный кабинет
            </p>
            <h2 id="auth-form-title" className="mt-2 text-3xl font-black tracking-tight">
              {isSignIn ? 'С возвращением!' : 'Создать аккаунт'}
            </h2>
          </div>
          <button
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 text-xl text-white transition hover:border-white/40 hover:bg-white/5 disabled:cursor-wait disabled:opacity-50"
            type="button"
            aria-label="Закрыть форму"
            disabled={isLoading}
            onClick={onCancel}
          >
            ×
          </button>
        </div>

        <div className="mt-6 grid grid-cols-2 rounded-full bg-white/5 p-1" role="group" aria-label="Режим авторизации">
          <button
            className={`rounded-full px-4 py-2.5 text-sm font-black transition ${
              isSignIn ? 'bg-white text-neutral-950' : 'text-neutral-400 hover:text-white'
            }`}
            type="button"
            aria-pressed={isSignIn}
            disabled={isLoading}
            onClick={() => setMode('signIn')}
          >
            Войти
          </button>
          <button
            className={`rounded-full px-4 py-2.5 text-sm font-black transition ${
              !isSignIn ? 'bg-white text-neutral-950' : 'text-neutral-400 hover:text-white'
            }`}
            type="button"
            aria-pressed={!isSignIn}
            disabled={isLoading}
            onClick={() => setMode('signUp')}
          >
            Зарегистрироваться
          </button>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-neutral-300">Email</span>
            <input
              className="w-full rounded-xl border border-white/15 bg-neutral-950 px-4 py-3 text-white outline-none transition placeholder:text-neutral-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/25 disabled:cursor-wait disabled:opacity-60"
              type="email"
              value={email}
              placeholder="name@example.com"
              autoComplete="email"
              required
              disabled={isLoading}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-bold text-neutral-300">Пароль</span>
            <input
              className="w-full rounded-xl border border-white/15 bg-neutral-950 px-4 py-3 text-white outline-none transition placeholder:text-neutral-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/25 disabled:cursor-wait disabled:opacity-60"
              type="password"
              value={password}
              placeholder="Минимум 8 символов"
              autoComplete={isSignIn ? 'current-password' : 'new-password'}
              minLength={8}
              required
              disabled={isLoading}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>

          <button
            className="w-full rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3.5 font-black text-white transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-4 focus-visible:ring-offset-neutral-900 disabled:cursor-wait disabled:opacity-60"
            type="submit"
            disabled={isLoading}
          >
            {isLoading
              ? 'Подождите...'
              : isSignIn
                ? 'Войти'
                : 'Зарегистрироваться'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthForm;
