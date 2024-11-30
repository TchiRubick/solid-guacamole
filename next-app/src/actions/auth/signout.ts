'use server';

import { deleteSessionTokenCookie } from '@/lib/session-cookies';
import { invalidateSession } from '@/models/session';
import { cookies } from 'next/headers';

export const signout = async () => {
  const cookieStore = await cookies();

  const token = cookieStore.get('session')?.value ?? null;

  if (token === null) {
    return;
  }

  await invalidateSession(token);
  await deleteSessionTokenCookie();
};
