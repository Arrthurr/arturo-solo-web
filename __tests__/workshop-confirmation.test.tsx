import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import WorkshopConfirmation from '@/components/WorkshopConfirmation';

vi.mock('@/components/CheckoutButton', () => ({
  default: ({ label }: { label: string }) => <button type="button">{label}</button>,
}));

afterEach(() => {
  cleanup();
});

describe('Workshop confirmation upsell', () => {
  it('offers alumni Assessment only after a verified workshop payment', () => {
    render(
      <WorkshopConfirmation
        state={{
          status: 'alumni-eligible',
          alumniToken: 'token',
          expiresAt: new Date('2026-09-12T17:00:00.000Z'),
        }}
      />,
    );

    expect(screen.getByText(/The workshop teaches the filter/i)).toBeInTheDocument();
    expect(screen.getByText(/Locked in before we start/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Assessment — $1,200' })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'No thanks, see you at the workshop' }),
    ).toBeInTheDocument();
    expect(screen.getByText(/not a deposit on a build or Sprint/i)).toBeInTheDocument();
  });

  it('does not publish the alumni price without a verified session', () => {
    render(<WorkshopConfirmation state={{ status: 'missing-session' }} />);

    expect(screen.queryByRole('button', { name: /Add Assessment/i })).not.toBeInTheDocument();
    expect(screen.queryByText('$1,200')).not.toBeInTheDocument();
  });
});
