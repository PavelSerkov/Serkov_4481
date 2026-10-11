import { useEffect, useMemo, useState } from 'react';
import AuthForm from './components/AuthForm.jsx';
import ConfirmModal from './components/ConfirmModal.jsx';
import FilterBar from './components/FilterBar.jsx';
import Header from './components/Header.jsx';
import TrainingList from './components/TrainingList.jsx';
import useAuth from './hooks/useAuth.js';
import useTrainings from './hooks/useTrainings.js';
import { supabase } from './lib/supabase.js';

function App() {
  const [activeFilter, setActiveFilter] = useState('Все');
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [notification, setNotification] = useState(null);
  const { trainings, isLoading, error } = useTrainings();
  const {
    user,
    isLoading: isAuthLoading,
    signUp,
    signIn,
    signOut,
  } = useAuth();

  const filteredTrainings = useMemo(() => {
    if (activeFilter === 'Все') {
      return trainings;
    }

    return trainings.filter((training) => training.type === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    if (!notification) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => setNotification(null), 3000);
    return () => window.clearTimeout(timeoutId);
  }, [notification]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleBook = (training) => {
    setNotification(null);

    if (!user) {
      setIsAuthOpen(true);
      return;
    }

    setSelectedTraining(training);
  };

  const handleConfirmBooking = async () => {
    if (!selectedTraining || !user || isBooking) {
      return;
    }

    const training = selectedTraining;
    setIsBooking(true);

    try {
      const { error: bookingError } = await supabase.from('bookings').insert({
        training_id: training.id,
        user_id: user.id,
      });

      if (bookingError) {
        throw bookingError;
      }

      setNotification({
        type: 'success',
        message: `Вы записаны на «${training.title}»`,
      });
    } catch (bookingError) {
      setNotification({
        type: 'error',
        message: bookingError.code === '23505'
          ? 'Вы уже записаны на эту тренировку.'
          : 'Не удалось записаться. Попробуйте позже.',
      });
    } finally {
      setIsBooking(false);
      setSelectedTraining(null);
    }
  };

  const handleCancelBooking = () => {
    setSelectedTraining(null);
  };

  const getAuthErrorMessage = (authError) => {
    if (authError.message === 'Invalid login credentials') {
      return 'Неверный email или пароль.';
    }

    if (authError.message === 'User already registered') {
      return 'Пользователь с таким email уже зарегистрирован.';
    }

    return authError.message ?? 'Не удалось выполнить операцию. Попробуйте позже.';
  };

  const handleSignIn = async (email, password) => {
    try {
      await signIn(email, password);
      setIsAuthOpen(false);
      setNotification({ type: 'success', message: 'Вы успешно вошли.' });
    } catch (authError) {
      setNotification({ type: 'error', message: getAuthErrorMessage(authError) });
    }
  };

  const handleSignUp = async (email, password) => {
    try {
      const data = await signUp(email, password);
      setIsAuthOpen(false);
      setNotification({
        type: 'success',
        message: data.session
          ? 'Аккаунт создан. Вы вошли в систему.'
          : 'Аккаунт создан. Подтвердите email по ссылке в письме.',
      });
    } catch (authError) {
      setNotification({ type: 'error', message: getAuthErrorMessage(authError) });
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setSelectedTraining(null);
      setNotification({ type: 'success', message: 'Вы вышли из аккаунта.' });
    } catch (authError) {
      setNotification({ type: 'error', message: getAuthErrorMessage(authError) });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 font-sans text-white selection:bg-orange-500 selection:text-white">
      <Header
        user={user}
        isAuthLoading={isAuthLoading}
        onProfileClick={() => setIsAuthOpen(true)}
        onSignOut={handleSignOut}
      />

      <main id="schedule" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mb-8 max-w-5xl">
          <p className="mb-3 text-sm font-black uppercase tracking-[0.28em] text-orange-500">
            Твой ритм · Твоя сила
          </p>
          <h1 className="text-5xl font-black leading-[0.9] tracking-tighter sm:text-7xl lg:text-8xl">
            Расписание
            <span className="block bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              тренировок
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-400 sm:text-lg">
            Выберите направление и забронируйте место на тренировке в два клика.
          </p>
        </div>

        <section aria-labelledby="filters-title">
          <h2 id="filters-title" className="sr-only">Фильтры расписания</h2>
          <FilterBar activeFilter={activeFilter} onFilterChange={handleFilterChange} />
        </section>

        <section className="mt-8" aria-live="polite" aria-busy={isLoading}>
          {isLoading && (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3" aria-label="Загрузка тренировок">
              {Array.from({ length: 6 }, (_, index) => (
                <div
                  className="h-96 animate-pulse rounded-2xl bg-white/10"
                  key={index}
                />
              ))}
            </div>
          )}

          {!isLoading && error && (
            <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-6 text-red-100" role="alert">
              <p className="font-black">Не удалось загрузить данные</p>
              <p className="mt-1 text-sm text-red-200/80">{error}</p>
            </div>
          )}

          {!isLoading && !error && (
            <TrainingList trainings={filteredTrainings} onBook={handleBook} />
          )}
        </section>
      </main>

      <ConfirmModal
        training={selectedTraining}
        isSubmitting={isBooking}
        onConfirm={handleConfirmBooking}
        onCancel={handleCancelBooking}
      />

      {isAuthOpen && (
        <AuthForm
          isLoading={isAuthLoading}
          onSignIn={handleSignIn}
          onSignUp={handleSignUp}
          onCancel={() => setIsAuthOpen(false)}
        />
      )}

      {notification && (
        <div
          className={`fixed bottom-5 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl border px-5 py-4 text-center font-black shadow-2xl ${
            notification.type === 'error'
              ? 'border-red-300/30 bg-red-500 text-white'
              : 'border-emerald-400/30 bg-emerald-500 text-neutral-950'
          }`}
          role={notification.type === 'error' ? 'alert' : 'status'}
        >
          {notification.message}
        </div>
      )}
    </div>
  );
}

export default App;
