'use server';

import { validateSessionToken } from '@/models/session';
import type { SessionValidationResult } from '@/models/session/type';
import { cookies } from 'next/headers';
import { cache } from 'react';

export const currentSession = cache(
  async (): Promise<SessionValidationResult> => {
    const cookieStore = await cookies();

    const token = cookieStore.get('session')?.value ?? null;

    if (token === null) {
      return { session: null, user: null };
    }

    const result = await validateSessionToken(token);
    console.log(result);
    return result;
  }
);
