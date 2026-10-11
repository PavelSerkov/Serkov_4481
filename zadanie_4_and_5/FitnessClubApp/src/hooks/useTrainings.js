import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.js';

function useTrainings() {
  const [trainings, setTrainings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isActive = true;
    const abortController = new AbortController();
    const timeoutId = window.setTimeout(() => abortController.abort(), 10000);

    const loadTrainings = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data, error: requestError } = await supabase
          .from('trainings')
          .select('*')
          .order('date', { ascending: true })
          .order('time', { ascending: true })
          .abortSignal(abortController.signal);

        if (!isActive) {
          return;
        }

        if (requestError) {
          throw requestError;
        }

        setTrainings(data ?? []);
      } catch (requestError) {
        if (isActive) {
          setTrainings([]);
          setError(
            requestError.name === 'AbortError'
              ? 'Сервер не отвечает. Повторите попытку через минуту.'
              : requestError.message ?? 'Не удалось загрузить тренировки',
          );
        }
      } finally {
        window.clearTimeout(timeoutId);

        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    loadTrainings();

    return () => {
      isActive = false;
      window.clearTimeout(timeoutId);
      abortController.abort();
    };
  }, []);

  return { trainings, isLoading, error };
}

export default useTrainings;
