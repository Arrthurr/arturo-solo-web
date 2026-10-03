import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import WorkshopConfirmation from '@/components/WorkshopConfirmation';
import WorkshopConfirmedPage from '@/app/workshop/confirmed/page';
import { retrieveCheckoutSession } from '@/lib/checkout/stripe';

vi.mock('@/components/Header', () => ({ default: () => null }));
vi.mock('@/components/Footer', () => ({ default: () => null }));
vi.mock('@/lib/checkout/config', () => ({
  readCheckoutConfig: () => ({ secretKey: 'test-only-signing-key', classStartsAt: null }),
}));
vi.mock('@/lib/checkout/stripe', () => ({
  createStripeClient: () => ({}),
  retrieveCheckoutSession: vi.fn(),
}));

vi.mock('@/components/CheckoutButton', () => ({
  default: ({ label }: { label: string }) => <button type="button">{label}</button>,
}));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
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

  it('awaits the session query before verifying payment and offering alumni checkout', async () => {
    vi.mocked(retrieveCheckoutSession).mockResolvedValue({
      id: 'cs_paid_workshop',
      payment_status: 'paid',
      created: Math.floor(Date.now() / 1000),
      metadata: { offerId: 'workshop' },
    } as unknown as Awaited<ReturnType<typeof retrieveCheckoutSession>>);

    render(await WorkshopConfirmedPage({
      searchParams: Promise.resolve({ session_id: 'cs_paid_workshop' }),
    }));

    expect(retrieveCheckoutSession).toHaveBeenCalledWith({}, 'cs_paid_workshop');
    expect(screen.getByRole('button', { name: 'Add Assessment — $1,200' })).toBeInTheDocument();
  });

  it('does not retrieve payment or offer alumni checkout when the async query is empty', async () => {
    render(await WorkshopConfirmedPage({ searchParams: Promise.resolve({}) }));

    expect(retrieveCheckoutSession).not.toHaveBeenCalled();
    expect(screen.queryByRole('button', { name: /Add Assessment/i })).not.toBeInTheDocument();
    expect(screen.queryByText('$1,200')).not.toBeInTheDocument();
  });
});
