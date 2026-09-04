import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import type { HTMLAttributes, PropsWithChildren } from 'react';
import Workshop from '@/components/Workshop';

type MotionProps = PropsWithChildren<HTMLAttributes<HTMLElement>>;

function stripMotionProps(props: Record<string, unknown>) {
  const {
    initial: _initial,
    animate: _animate,
    whileInView: _whileInView,
    transition: _transition,
    viewport: _viewport,
    ...rest
  } = props;
  return rest;
}

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: MotionProps) => (
      <div {...stripMotionProps(props as Record<string, unknown>)}>{children}</div>
    ),
  },
}));

vi.mock('@/lib/motion', () => ({
  usePrefersReducedMotion: () => true,
}));

vi.mock('@/components/CheckoutButton', () => ({
  default: ({ label }: { label: string }) => <button type="button">{label}</button>,
}));

afterEach(() => {
  cleanup();
});

describe('Workshop page copy', () => {
  it('sells the $97 filter workshop and refuses a build or tool tour', () => {
    render(<Workshop dateLabel="Next session date to be announced" />);

    expect(
      screen.getByRole('heading', { name: /Decide Before You Build/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('$97')).toBeInTheDocument();
    expect(screen.getAllByText(/90 minutes/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Virtual/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Bring one broken case/i)).toBeInTheDocument();
    expect(screen.getByText(/Leave with Six Paths scored/i)).toBeInTheDocument();
    expect(screen.getByText(/not an AI tools tour/i)).toBeInTheDocument();
    expect(screen.getByText(/A build, Sprint, or implementation/i)).toBeInTheDocument();
    expect(screen.getByText(/A monthly retainer/i)).toBeInTheDocument();
    expect(screen.getByText(/A tool list or AI tools tour/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Join the $97 workshop' })).toBeInTheDocument();
    expect(screen.queryByText('$1,200')).not.toBeInTheDocument();
    expect(screen.queryByText(/\$3,000/)).not.toBeInTheDocument();
  });
});
