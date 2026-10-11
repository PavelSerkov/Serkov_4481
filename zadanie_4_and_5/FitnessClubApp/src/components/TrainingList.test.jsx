import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App.jsx';
import trainings from '../data/trainings.js';

vi.mock('../hooks/useTrainings.js', async () => {
  const { default: mockTrainings } = await import('../data/trainings.js');

  return {
    default: () => ({
      trainings: mockTrainings,
      isLoading: false,
      error: null,
    }),
  };
});

vi.mock('../lib/supabase.js', () => ({
  supabase: {
    from: vi.fn(),
  },
}));

vi.mock('../hooks/useAuth.js', () => ({
  default: () => ({
    user: null,
    isLoading: false,
    signUp: vi.fn(),
    signIn: vi.fn(),
    signOut: vi.fn(),
  }),
}));

describe('TrainingList filtering', () => {
  it('shows only yoga trainings after selecting the Yoga filter', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Йога' }));

    const yogaTrainings = trainings.filter((training) => training.type === 'Йога');
    const otherTrainings = trainings.filter((training) => training.type !== 'Йога');

    expect(screen.getAllByRole('article')).toHaveLength(3);

    yogaTrainings.forEach((training) => {
      expect(screen.getByRole('heading', { name: training.title })).toBeInTheDocument();
    });

    otherTrainings.forEach((training) => {
      expect(screen.queryByRole('heading', { name: training.title })).not.toBeInTheDocument();
    });
  });

  it('opens the authentication form before booking for a guest', () => {
    render(<App />);

    fireEvent.click(screen.getAllByRole('button', { name: 'Записаться' })[0]);

    expect(
      screen.getByRole('heading', { name: 'С возвращением!' }),
    ).toBeInTheDocument();
  });
});
