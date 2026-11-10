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

  it('shows AI mode label when API returns ai mode', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ mode: 'ai', answer: 'AI-powered answer about AWS.' }),
      }),
    );
    render(<Assistant />);
    fireEvent.click(screen.getByRole('button', { name: /Ask Prathmesh/ }));
    fireEvent.click(screen.getByRole('button', { name: 'AWS experience' }));
    await waitFor(() =>
      expect(screen.getByText('AI-powered answer about AWS.')).toBeInTheDocument(),
    );
  });

  it('falls back to a generic offline message if the API is unavailable', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
    render(<Assistant />);
    fireEvent.click(screen.getByRole('button', { name: /Ask Prathmesh/ }));
    fireEvent.click(screen.getByRole('button', { name: 'AWS experience' }));
    await waitFor(() =>
      expect(screen.getByText(/currently offline/)).toBeInTheDocument(),
    );
  });

  it('sends conversation history to the API', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ mode: 'ai', answer: 'Follow-up answer.' }),
    });
    vi.stubGlobal('fetch', mockFetch);
    render(<Assistant />);
    fireEvent.click(screen.getByRole('button', { name: /Ask Prathmesh/ }));
    fireEvent.click(screen.getByRole('button', { name: 'AWS experience' }));

    await waitFor(() => expect(screen.getByText('Follow-up answer.')).toBeInTheDocument());

    // Second question — the fetch body should include history
    fireEvent.click(screen.getByRole('button', { name: 'Tech stack' }));
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(2));

    const secondCallBody = JSON.parse(mockFetch.mock.calls[1][1].body);
    expect(secondCallBody.history).toBeDefined();
    expect(secondCallBody.history.length).toBeGreaterThan(0);
  });

  it('rotates suggestion prompts after each exchange', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ mode: 'demo', answer: 'Some answer.' }),
      }),
    );
    render(<Assistant />);
    fireEvent.click(screen.getByRole('button', { name: /Ask Prathmesh/ }));

    // Initial prompts are set 0
    expect(screen.getByRole('button', { name: 'AWS experience' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'AWS experience' }));

    // After exchange, prompts rotate to set 1
    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Tech stack' })).toBeInTheDocument(),
    );
  });
});
