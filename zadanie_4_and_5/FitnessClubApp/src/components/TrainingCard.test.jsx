import { fireEvent, render, screen } from '@testing-library/react';
import TrainingCard from './TrainingCard.jsx';

const availableTraining = {
  id: 1,
  title: 'Утренняя йога',
  date: '2026-10-12',
  time: '09:00',
  type: 'Йога',
  trainer: 'Анна Волкова',
  place: 'Зал 2',
  slots: 5,
};

describe('TrainingCard', () => {
  it('calls onBook with the selected training', () => {
    const onBook = vi.fn();
    render(<TrainingCard training={availableTraining} onBook={onBook} />);

    fireEvent.click(screen.getByRole('button', { name: 'Записаться' }));

    expect(onBook).toHaveBeenCalledTimes(1);
    expect(onBook).toHaveBeenCalledWith(availableTraining);
  });

  it('disables booking when there are no available slots', () => {
    const soldOutTraining = {
      ...availableTraining,
      id: 2,
      slots: 0,
    };

    render(<TrainingCard training={soldOutTraining} onBook={vi.fn()} />);

    expect(screen.getByRole('button', { name: 'Мест нет' })).toBeDisabled();
  });
});
