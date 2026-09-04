import { describe, expect, it } from 'vitest';
import { alumniWindow } from '@/lib/checkout/alumni-eligibility';

const paidAt = new Date('2026-09-04T16:00:00.000Z');

describe('alumniWindow', () => {
  it('stays open from payment until 24 hours after class', () => {
    const classStartsAt = new Date('2026-09-11T17:00:00.000Z');
    const beforeClass = alumniWindow({
      now: new Date('2026-09-05T12:00:00.000Z'),
      paidAt,
      classStartsAt,
    });
    const justAfterClass = alumniWindow({
      now: new Date('2026-09-12T16:59:59.000Z'),
      paidAt,
      classStartsAt,
    });

    expect(beforeClass.status).toBe('eligible');
    expect(justAfterClass.status).toBe('eligible');
    if (beforeClass.status === 'eligible') {
      expect(beforeClass.expiresAt.toISOString()).toBe('2026-09-12T17:00:00.000Z');
    }
  });

  it('closes after 24 hours past class', () => {
    const result = alumniWindow({
      now: new Date('2026-09-12T17:00:01.000Z'),
      paidAt,
      classStartsAt: new Date('2026-09-11T17:00:00.000Z'),
    });

    expect(result.status).toBe('expired');
  });

  it('falls back to 24 hours after payment when class date is unset', () => {
    const stillOpen = alumniWindow({
      now: new Date('2026-09-05T15:59:59.000Z'),
      paidAt,
      classStartsAt: null,
    });
    const closed = alumniWindow({
      now: new Date('2026-09-05T16:00:01.000Z'),
      paidAt,
      classStartsAt: null,
    });

    expect(stillOpen.status).toBe('eligible');
    expect(closed.status).toBe('expired');
  });
});
