import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import type { HTMLAttributes, PropsWithChildren } from 'react';
import Services from '@/components/Services';

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

afterEach(() => {
  cleanup();
});

describe('Services single offer', () => {
  it('sells only Workflow Assessment with price, clock, and one-workflow scope', () => {
    render(<Services />);

    expect(
      screen.getByRole('heading', { name: 'Workflow Assessment' }),
    ).toBeInTheDocument();
    expect(screen.getByText(/\$1,500 fixed fee/i)).toBeInTheDocument();
    expect(screen.getAllByText(/seven business days/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/one consequential workflow/i).length).toBeGreaterThan(0);
    expect(
      screen.getByText(/Simplify · Buy · Automate · Build · Investigate · Defer/i),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/Implementation Brief/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/not a deposit on a future build/i).length).toBeGreaterThan(0);
    expect(
      screen.getByRole('link', {
        name: /Bring one stuck workflow\. \$1,500\. Seven days\. A decision\./i,
      }),
    ).toHaveAttribute('href', '/contact');
  });

  it('does not sell Custom AI Build as a second engagement', () => {
    render(<Services />);

    expect(
      screen.queryByRole('heading', { name: 'Custom AI Build' }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/Discuss a scoped build/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/See if the assessment fits/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Two distinct engagements/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Build when necessary/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Start with the decision/i)).not.toBeInTheDocument();
  });
});
