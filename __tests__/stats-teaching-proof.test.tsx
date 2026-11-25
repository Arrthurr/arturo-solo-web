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
      expect(within(card).getByText('What the filter decided')).toBeInTheDocument();
      expect(within(card).getByText('Status')).toBeInTheDocument();
      expect(within(card).getByText('What this means for you')).toBeInTheDocument();
    }
  });

  it('states DMDL as published and Joy as beta honestly', () => {
    render(<Stats />);
    const dmdl = screen.getByTestId('client-story-dmdl');
    const joy = screen.getByTestId('client-story-joy-for-books');

    expect(within(dmdl).getByText(/Client workflow · published/i)).toBeInTheDocument();
    expect(within(dmdl).getByText(/Google Form/i)).toBeInTheDocument();
    expect(within(dmdl).getAllByText(/PWA/i).length).toBeGreaterThan(0);
    expect(within(dmdl).getByText(/Expo\/React Native/i)).toBeInTheDocument();
    expect(within(dmdl).getByText(/admin and staff/i)).toBeInTheDocument();
    expect(within(dmdl).getByText(/external workforce/i)).toBeInTheDocument();
    expect(within(dmdl).queryByText(/Client workflow · beta/i)).not.toBeInTheDocument();

    expect(within(joy).getByText(/Client system · beta/i)).toBeInTheDocument();
    expect(within(joy).getByText(/school requests/i)).toBeInTheDocument();
    expect(within(joy).getByText(/on hand, reserved, and donated/i)).toBeInTheDocument();
    expect(within(joy).queryByText(/Combinotion/)).not.toBeInTheDocument();
    expect(within(joy).getByText(/staff operations app/i)).toBeInTheDocument();
    expect(within(joy).getByText(/Name the record the work depends on/i)).toBeInTheDocument();
    expect(within(joy).getByText(/^Beta\./)).toBeInTheDocument();
    expect(
      within(joy).queryByText(/Not framed as a finished portfolio outcome/i),
    ).not.toBeInTheDocument();
    expect(within(joy).queryByText(/in development/i)).not.toBeInTheDocument();
    expect(within(joy).queryByText(/school event/i)).not.toBeInTheDocument();
  });

  it('offers a soft CTA to contact with workflow-example framing', () => {
    render(<Stats />);
    const cta = screen.getByRole('link', {
      name: /Bring a recent example of where the work breaks/i,
    });
    expect(cta).toHaveAttribute('href', '/contact');
    expect(screen.getByText(/concrete stuck workflow/i)).toBeInTheDocument();
  });

  it('frames proof as what the filter decided, not a catalog of builds', () => {
    render(<Stats />);
    expect(screen.getByText(/what the Six Paths filter decided/i)).toBeInTheDocument();
    expect(screen.getByText(/not a catalog of builds for sale/i)).toBeInTheDocument();
    expect(
      screen.getByText(/not proof that assessment turns into implementation/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/discovery changed the plan/i)).toBeInTheDocument();
  });
});
