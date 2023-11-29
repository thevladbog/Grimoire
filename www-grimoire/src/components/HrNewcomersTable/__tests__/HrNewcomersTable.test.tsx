import { HrNewcomersTable } from 'src/components/HrNewcomersTable/HrNewcomersTable.tsx';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('Test HrNewcomers Table', () => {
  global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));

  const user = userEvent.setup();

  it('- correct number of pages', async () => {
    await act(async () => {
      render(<HrNewcomersTable />);
    });

    expect(
      screen.getByRole('button', {
        name: /First/i,
      }),
    ).toHaveClass('yc-button_disabled');

    await user.click(screen.getByText('3'));
    expect(screen.getAllByRole('button', { pressed: true })[0]).toHaveClass(
      'yc-button_selected',
    );
    expect(
      screen.getAllByRole('button', { pressed: true })[0].textContent,
    ).toBe('3');
  });

  it('- search functionality', async () => {
    await act(async () => {
      render(<HrNewcomersTable />);
    });

    await user.click(screen.getByText('1'));
    await user.click(await screen.findByPlaceholderText('Search ...'));
    await user.paste('es');
    await user.click(screen.getByText('2'));

    expect(
      screen.getAllByRole('button', { pressed: true })[0].textContent,
    ).toBe('2');
    expect(
      screen.getByRole('button', {
        name: /Next/i,
      }),
    ).toHaveClass('yc-button_disabled');
  });
});
