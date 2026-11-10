import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Terminal } from './Terminal';

describe('simulated terminal UI', () => {
  it('runs a safe sample command and explains its purpose', () => {
    render(<Terminal />);
    fireEvent.click(screen.getByRole('button', { name: 'df -h' }));
    expect(screen.getByText(/Filesystem/)).toBeInTheDocument();
    expect(
      screen.getByText(/filesystem capacity/, { selector: '.terminal-explain p' }),
    ).toBeInTheDocument();
  });

  it('does not execute unregistered shell input', () => {
    render(<Terminal />);
    fireEvent.change(screen.getByRole('textbox', { name: /simulated Linux command/ }), {
      target: { value: 'rm -rf /' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Run simulated command' }));
    expect(screen.getByText(/Command not in this safe demo/)).toBeInTheDocument();
  });

  it('switches between Bash examples', () => {
    render(<Terminal />);
    fireEvent.click(screen.getByRole('button', { name: 'Timestamped backup' }));
    expect(screen.getByLabelText('backup-directory.sh sample')).toHaveTextContent('tar -czf');
  });
});
