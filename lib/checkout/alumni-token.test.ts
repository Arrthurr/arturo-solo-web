import { describe, expect, it } from 'vitest';
import { signAlumniToken, verifyAlumniToken } from '@/lib/checkout/alumni-token';

const secret = 'test-alumni-secret';
const expiresAt = new Date('2026-09-12T17:00:00.000Z');

describe('alumni token', () => {
  it('round-trips a session id before expiry', () => {
    const token = signAlumniToken({
      sessionId: 'cs_test_workshop',
      expiresAt,
      secret,
    });
    const verified = verifyAlumniToken(token, secret, new Date('2026-09-12T16:00:00.000Z'));

    expect(verified).toEqual({
      sessionId: 'cs_test_workshop',
      expiresAt,
    });
  });

  it('rejects a forged or expired token', () => {
    const token = signAlumniToken({
      sessionId: 'cs_test_workshop',
      expiresAt,
      secret,
    });

    expect(verifyAlumniToken(token, 'other-secret', new Date('2026-09-12T16:00:00.000Z'))).toBeNull();
    expect(verifyAlumniToken(token, secret, new Date('2026-09-12T17:00:01.000Z'))).toBeNull();
    expect(verifyAlumniToken('not-a-token', secret, new Date('2026-09-12T16:00:00.000Z'))).toBeNull();
  });
});
