import { SdNewcomersTable } from 'src/components/SdNewcomersTable/SdNewcomersTable.tsx';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('Test SdNewcomers Table', () => {
  global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));

  const user = userEvent.setup();

  it('- correct number of pages', async () => {
    await act(async () => {
      render(<SdNewcomersTable />);
    });

    expect(
      screen.getByRole('button', {
        name: /First/i,
      }),
    ).toHaveClass('yc-button_disabled');

    await user.click(screen.getByText('5'));
    expect(screen.getAllByRole('button', { pressed: true })[0]).toHaveClass(
      'yc-button_selected',
    );
    expect(
      screen.getAllByRole('button', { pressed: true })[0].textContent,
    ).toBe('5');
  });

  it('- search functionality', async () => {
    await act(async () => {
      render(<SdNewcomersTable />);
    });

    await user.click(screen.getByText('2'));
    await user.click(await screen.findByPlaceholderText('Search ...'));
    await user.paste('Ivaniv');
    await user.click(screen.getByText('4'));

    expect(
      screen.getAllByRole('button', { pressed: true })[0].textContent,
    ).toBe('4');
    expect(
      screen.getByRole('button', {
        name: /Next/i,
      }),
    ).toHaveClass('yc-button_disabled');
  });
});
