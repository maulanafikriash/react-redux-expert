import {
  describe, it, expect, vi,
} from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import InputLogin from './InputLogin';

/**
 * test scenario
 *
 * - InputLogin Component
 *  - should handle email typing correctly
 *  - should handle password typing correctly
 *  - should call onLogin function when Login button clicked
 */

describe('InputLogin component', () => {
  it('should handle email typing correctly', async () => {
    render(
      <Router>
        <InputLogin onLogin={() => {}} />
      </Router>,
    );
    const emailInput = screen.getByPlaceholderText('youremail@example.com');
    await userEvent.type(emailInput, 'fikriash@gmail.com');
    expect(emailInput).toHaveValue('fikriash@gmail.com');
  });

  it('should handle password typing correctly', async () => {
    render(
      <Router>
        <InputLogin onLogin={() => {}} />
      </Router>,
    );
    const passwordInput = screen.getByPlaceholderText('******');
    await userEvent.type(passwordInput, 'dummypassword');
    expect(passwordInput).toHaveValue('dummypassword');
  });

  it('should call onLogin function when Login button clicked', async () => {
    const mockLogin = vi.fn();
    render(
      <Router>
        <InputLogin onLogin={mockLogin} />
      </Router>,
    );
    const emailInput = screen.getByPlaceholderText('youremail@example.com');
    await userEvent.type(emailInput, 'fikriash@gmail.com');

    const passwordInput = screen.getByPlaceholderText('******');
    await userEvent.type(passwordInput, 'dummypassword');
    expect(passwordInput).toHaveValue('dummypassword');
    const loginButton = screen.getByRole('button', { name: 'Login' });
    await userEvent.click(loginButton);

    expect(mockLogin).toBeCalledWith({
      email: 'fikriash@gmail.com',
      password: 'dummypassword',
    });
  });
});
