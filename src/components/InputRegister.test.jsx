import {
  describe, it, expect, vi,
} from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import InputRegister from './InputRegister';

/**
 * test scenario
 *
 * - InputRegister Component
 *  - should handle name typing correctly
 *  - should handle email typing correctly
 *  - should handle password typing correctly
 *  - should handle confirmPassword typing correctly
 *  - should call onRegister function when clicked
 */

describe('InputRegister component', () => {
  it('should handle name typing correctly', async () => {
    render(
      <Router>
        <InputRegister onRegister={() => {}} />
      </Router>,
    );
    const nameInput = screen.getByPlaceholderText('Your Name');
    await userEvent.type(nameInput, 'fikriash');
    expect(nameInput).toHaveValue('fikriash');
  });
  it('should handle email typing correctly', async () => {
    render(
      <Router>
        <InputRegister onRegister={() => {}} />
      </Router>,
    );
    const emailInput = screen.getByPlaceholderText('email@example.com');
    await userEvent.type(emailInput, 'fikriash@gmail.com');
    expect(emailInput).toHaveValue('fikriash@gmail.com');
  });

  it('should handle password typing correctly', async () => {
    render(
      <Router>
        <InputRegister onRegister={() => {}} />
      </Router>,
    );
    const passwordInput = screen.getByTestId('password');
    await userEvent.type(passwordInput, 'fikriash');
    expect(passwordInput).toHaveValue('fikriash');
  });

  it('should handle confirmPassword typing correctly', async () => {
    render(
      <Router>
        <InputRegister onRegister={() => {}} />
      </Router>,
    );
    const confirmPasswordInput = screen.getByTestId('confirmPassword');
    await userEvent.type(confirmPasswordInput, 'fikriash');
    expect(confirmPasswordInput).toHaveValue('fikriash');
  });

  it('should call onRegister function when Register button clicked', async () => {
    const mockRegister = vi.fn();
    render(
      <Router>
        <InputRegister onRegister={mockRegister} />
      </Router>,
    );
    const nameInput = screen.getByPlaceholderText('Your Name');
    await userEvent.type(nameInput, 'fikriash');

    const emailInput = screen.getByPlaceholderText('email@example.com');
    await userEvent.type(emailInput, 'fikriash@gmail.com');

    const passwordInput = screen.getByTestId('password');
    await userEvent.type(passwordInput, 'fikriash');

    const confirmPasswordInput = screen.getByTestId('confirmPassword');
    await userEvent.type(confirmPasswordInput, 'fikriash');

    const registerButton = screen.getByTestId('registerButton');
    await userEvent.click(registerButton);

    expect(mockRegister).toBeCalledWith({
      name: 'fikriash',
      email: 'fikriash@gmail.com',
      password: 'fikriash',
      confirmPassword: 'fikriash',
    });
  });
});
