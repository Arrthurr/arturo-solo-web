import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

afterEach(() => {
  cleanup();
});

describe('Header mobile menu accessibility', () => {
  it('exposes aria-expanded and aria-controls on toggle', async () => {
    const user = userEvent.setup();
    render(<Header />);

    const toggle = screen.getByRole('button', { name: 'Open menu' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(toggle).toHaveAttribute('aria-controls', 'mobile-nav-menu');

    await user.click(toggle);

    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(toggle).toHaveAttribute('aria-label', 'Close menu');
    expect(screen.getByRole('navigation', { name: 'Mobile navigation' })).toBeInTheDocument();
  });

  it('does not offer a Process link that would scroll above Services', () => {
    render(<Header />);
    expect(screen.queryByRole('link', { name: 'Process' })).not.toBeInTheDocument();
  });
});

describe('Footer navigation', () => {
  it('does not offer a Process link that would scroll above Services', () => {
    render(<Footer />);
    expect(screen.queryByRole('link', { name: 'Process' })).not.toBeInTheDocument();
  });
});

