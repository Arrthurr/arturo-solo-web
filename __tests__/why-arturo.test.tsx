import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import type { HTMLAttributes, PropsWithChildren } from 'react';
import WhyArturo from '@/components/WhyArturo';

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

describe('Why Arturo', () => {
  it('keeps builder credibility without selling implementation as the offer', () => {
    render(<WhyArturo />);

    expect(screen.getByText(/map the work/i)).toBeInTheDocument();
    expect(screen.getByText(/Build only if the filter earns it/i)).toBeInTheDocument();
    expect(screen.getByText(/A justified build is a later conversation/i)).toBeInTheDocument();
    expect(screen.getByText(/Leave capability, not dependency/i)).toBeInTheDocument();
    expect(screen.getByText(/No predetermined AI or custom-build pitch/i)).toBeInTheDocument();
    expect(screen.queryByText(/assessment and implementation/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/accountable partner/i)).not.toBeInTheDocument();
  });
});
