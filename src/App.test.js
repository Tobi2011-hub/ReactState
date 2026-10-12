import { act, fireEvent, render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

test('toggles the profile and updates time since mount', () => {
  render(<App />);

  expect(screen.queryByRole('heading', { name: 'Alex Morgan' })).not.toBeInTheDocument();
  expect(screen.getByRole('status')).toHaveTextContent('0 seconds');

  fireEvent.click(screen.getByRole('button', { name: 'Show profile' }));
  expect(screen.getByRole('heading', { name: 'Alex Morgan' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Hide profile' })).toHaveAttribute(
    'aria-expanded',
    'true'
  );

  act(() => {
    jest.advanceTimersByTime(2000);
  });
  expect(screen.getByRole('status')).toHaveTextContent('2 seconds');
});
