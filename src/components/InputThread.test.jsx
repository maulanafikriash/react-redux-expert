/* eslint-disable import/no-unresolved */
import {
  describe, it, expect, vi,
} from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import InputThread from './InputThread';

/**
 * test scenario
 *
 * - InputThread Component
 *  - should call onAddThread function when Create button clicked
 *  - should handle title typing correctly
 *  - should handle category typing correctly
 *  - should handle thread text typing correctly
 */

describe('InputThread Component', () => {
  it('should handle title typing correctly', async () => {
    render(
      <Router>
        <InputThread onAddThread={() => {}} />
      </Router>,
    );
    const titleInput = screen.getByPlaceholderText('Judul');
    await userEvent.type(titleInput, 'Halo, saya adalah manusia');
    expect(titleInput).toHaveValue('Halo, saya adalah manusia');
  });

  it('should handle category typing correctly', async () => {
    render(
      <Router>
        <InputThread onAddThread={() => {}} />
      </Router>,
    );
    const categoryInput = screen.getByPlaceholderText('Category');
    await userEvent.type(categoryInput, 'random');
    expect(categoryInput).toHaveValue('random');
  });

  it('should handle thread text typing correctly', async () => {
    render(
      <Router>
        <InputThread onAddThread={() => {}} />
      </Router>,
    );
    const textInput = screen.getByTestId('textArea');
    await userEvent.type(textInput, 'menuju indonesia emas');
    expect(textInput).toHaveValue('menuju indonesia emas');
  });

  it('should call onAddThread when Create button clicked', async () => {
    const mockAddThread = vi.fn();
    render(
      <Router>
        <InputThread onAddThread={mockAddThread} />
      </Router>,
    );
    const titleInput = screen.getByPlaceholderText('Judul');
    await userEvent.type(titleInput, 'Halo, saya adalah manusia');

    const textInput = screen.getByTestId('textArea');
    await userEvent.type(textInput, 'menuju indonesia emas');

    const categoryInput = screen.getByPlaceholderText('Category');
    await userEvent.type(categoryInput, 'random');
    const createButton = screen.getByRole('button', { name: 'Buat' });
    await userEvent.click(createButton);

    expect(mockAddThread).toBeCalledWith({
      title: 'Halo, saya adalah manusia',
      body: 'menuju indonesia emas',
      category: 'random',
    });
  });
});
