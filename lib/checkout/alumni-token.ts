import { createHmac, timingSafeEqual } from 'node:crypto';

type AlumniTokenPayload = {
  sessionId: string;
  exp: string;
};

function encode(value: string): string {
  return Buffer.from(value, 'utf8').toString('base64url');
}

function decode(value: string): string {
  return Buffer.from(value, 'base64url').toString('utf8');
}

function sign(encodedPayload: string, secret: string): string {
  return createHmac('sha256', secret).update(encodedPayload).digest('base64url');
}

function signaturesMatch(left: string, right: string): boolean {
  const leftBuf = Buffer.from(left);
  const rightBuf = Buffer.from(right);
  if (leftBuf.length !== rightBuf.length) {
    return false;
  }
  return timingSafeEqual(leftBuf, rightBuf);
}

export function signAlumniToken(input: {
  sessionId: string;
  expiresAt: Date;
  secret: string;
}): string {
  const payload: AlumniTokenPayload = {
    sessionId: input.sessionId,
    exp: input.expiresAt.toISOString(),
  };
  const encodedPayload = encode(JSON.stringify(payload));
  return `${encodedPayload}.${sign(encodedPayload, input.secret)}`;
}

export function verifyAlumniToken(
  token: string,
  secret: string,
  now: Date,
): { sessionId: string; expiresAt: Date } | null {
  const [encodedPayload, signature] = token.split('.');
  if (!encodedPayload || !signature) {
    return null;
  }
  if (!signaturesMatch(signature, sign(encodedPayload, secret))) {
    return null;
  }

  try {
    const payload = JSON.parse(decode(encodedPayload)) as AlumniTokenPayload;
    const expiresAt = new Date(payload.exp);
    if (Number.isNaN(expiresAt.getTime()) || !payload.sessionId) {
      return null;
    }
    if (now.getTime() > expiresAt.getTime()) {
      return null;
    }
    return { sessionId: payload.sessionId, expiresAt };
  } catch {
    return null;
  }
}
