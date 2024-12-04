'use server';

import { cookies } from 'next/headers';
import { createSession, invalidateSession } from '@/models/session';
import {
  deleteSessionTokenCookie,
  setSessionTokenCookie,
} from '@/lib/session-cookies';

export const switchSessionOrganization = async ({
  userId,
  organizationId,
}: {
  userId: string;
  organizationId: string;
}) => {
  const cookieStore = await cookies();

  const token = cookieStore.get('session')?.value ?? null;

  if (token === null) {
    return;
  }

  await invalidateSession(token);
  await deleteSessionTokenCookie();
  const session = await createSession(userId, organizationId);
  await setSessionTokenCookie(session.id, session.expiresAt);
};
