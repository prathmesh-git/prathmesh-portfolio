import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Assistant } from './Assistant';

afterEach(() => vi.unstubAllGlobals());

describe('Ask Prathmesh', () => {
  it('shows a clear demo mode answer from the API', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ mode: 'demo', answer: 'Verified AWS project details.' }),
      }),
    );
    render(<Assistant />);
    fireEvent.click(screen.getByRole('button', { name: /Ask Prathmesh/ }));
    fireEvent.click(screen.getByRole('button', { name: 'AWS experience' }));
    await waitFor(() =>
      expect(screen.getByText('Verified AWS project details.')).toBeInTheDocument(),
    );
  });
  it('falls back to a factual local demo response if the API is unavailable', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
    render(<Assistant />);
    fireEvent.click(screen.getByRole('button', { name: /Ask Prathmesh/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Linux skills' }));
    await waitFor(() =>
      expect(screen.getByText(/menu-driven Bash toolkit for RHEL/)).toBeInTheDocument(),
    );
  });
});
