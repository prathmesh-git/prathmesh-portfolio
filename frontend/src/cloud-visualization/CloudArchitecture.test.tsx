import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CloudArchitecture } from './CloudArchitecture';

describe('CloudDataFlow architecture', () => {
  it('explains a selected service when clicked', () => {
    render(<CloudArchitecture />);
    fireEvent.click(screen.getByRole('button', { name: /RDS MySQL/ }));
    expect(screen.getByText('Processed records go to private MySQL')).toBeInTheDocument();
  });
  it('renders the full set of service nodes', () => {
    render(<CloudArchitecture />);
    expect(screen.getByRole('button', { name: /Amazon S3/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /AWS Lambda/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Presigned URL/ })).toBeInTheDocument();
  });
});
