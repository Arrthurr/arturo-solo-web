const WINDOW_MS = 24 * 60 * 60 * 1000;

export type AlumniWindow =
  | { status: 'eligible'; expiresAt: Date }
  | { status: 'expired'; expiresAt: Date };

export function alumniWindow(input: {
  now: Date;
  paidAt: Date;
  classStartsAt: Date | null;
}): AlumniWindow {
  const anchor = input.classStartsAt ?? input.paidAt;
  const expiresAt = new Date(anchor.getTime() + WINDOW_MS);

  if (input.now.getTime() <= expiresAt.getTime()) {
    return { status: 'eligible', expiresAt };
  }

  return { status: 'expired', expiresAt };
}
