import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import type { HTMLAttributes, PropsWithChildren } from 'react';
import Stats from '@/components/Stats';

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
    article: ({ children, ...props }: MotionProps) => (
      <article {...stripMotionProps(props as Record<string, unknown>)}>{children}</article>
    ),
  },
}));

vi.mock('@/lib/motion', () => ({
  usePrefersReducedMotion: () => true,
}));

afterEach(() => {
  cleanup();
});

describe('Stats teaching proof', () => {
  it('renders only approved named clients', () => {
    render(<Stats />);
    expect(screen.getByAltText('DMDL')).toBeInTheDocument();
    expect(screen.getByAltText('Joy for Books')).toBeInTheDocument();
    expect(screen.queryByAltText('HG Jones Associates')).not.toBeInTheDocument();
    expect(screen.queryByAltText('Texas Head Start Association')).not.toBeInTheDocument();
  });

  it('uses the full teaching template on both stories', () => {
    render(<Stats />);
    const dmdl = screen.getByTestId('client-story-dmdl');
    const joy = screen.getByTestId('client-story-joy-for-books');

    for (const card of [dmdl, joy]) {
      expect(within(card).getByText('What looked true')).toBeInTheDocument();
      expect(within(card).getByText('What discovery found')).toBeInTheDocument();
      expect(within(card).getByText('Path that followed')).toBeInTheDocument();
      expect(within(card).getByText('Status')).toBeInTheDocument();
      expect(within(card).getByText('What this means for you')).toBeInTheDocument();
    }
  });

  it('states DMDL multi-role beta and Joy in development honestly', () => {
    render(<Stats />);
    const dmdl = screen.getByTestId('client-story-dmdl');
    const joy = screen.getByTestId('client-story-joy-for-books');

    expect(within(dmdl).getByText(/Client workflow · beta/i)).toBeInTheDocument();
    expect(within(dmdl).getByText(/Google Form/i)).toBeInTheDocument();
    expect(within(dmdl).getAllByText(/PWA/i).length).toBeGreaterThan(0);
    expect(within(dmdl).getByText(/Expo\/React Native/i)).toBeInTheDocument();
    expect(within(dmdl).getByText(/admin and staff/i)).toBeInTheDocument();
    expect(within(dmdl).getByText(/external workforce/i)).toBeInTheDocument();

    expect(within(joy).getByText(/Client system · in development/i)).toBeInTheDocument();
    expect(within(joy).getByText(/school event/i)).toBeInTheDocument();
    expect(within(joy).getByText(/Book inventory/i)).toBeInTheDocument();
    expect(within(joy).getByText(/Active development/i)).toBeInTheDocument();
    expect(
      within(joy).getByText(/Not framed as a finished portfolio outcome/i),
    ).toBeInTheDocument();
  });

  it('offers a soft CTA to contact with workflow-example framing', () => {
    render(<Stats />);
    const cta = screen.getByRole('link', {
      name: /Bring a recent example of where the work breaks/i,
    });
    expect(cta).toHaveAttribute('href', '/contact');
    expect(screen.getByText(/concrete stuck workflow/i)).toBeInTheDocument();
  });

  it('frames proof as decide-the-path operating context, not a portfolio pitch', () => {
    render(<Stats />);
    expect(screen.getByText(/reconstruct how the work moves/i)).toBeInTheDocument();
    expect(screen.getByText(/decide the path/i)).toBeInTheDocument();
  });
});
