import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import type { HTMLAttributes, PropsWithChildren } from 'react';
import Hero from '@/components/Hero';

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

vi.mock('next/image', () => ({
  default: ({ alt, ...props }: { alt: string } & HTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} {...props} />
  ),
}));

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

describe('Hero offers', () => {
  it('leads with the workshop and keeps Assessment one click away', () => {
    render(<Hero />);

    expect(
      screen.getByText(/the expensive mistake is picking a fix before you know the constraint/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/That filter is the product/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Join the $97 workshop' })).toHaveAttribute(
      'href',
      '/workshop',
    );
    expect(
      screen.getByRole('link', { name: /Or start a Workflow Assessment — \$1,500/i }),
    ).toHaveAttribute('href', '/contact');
    expect(screen.queryByText(/Partner/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/retainer/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/\$3,000/)).not.toBeInTheDocument();
  });
});
