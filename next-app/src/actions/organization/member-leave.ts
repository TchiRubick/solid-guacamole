'use server';

import { verifyPassword } from '@/lib/password';
import {
  deleteSessionTokenCookie,
  setSessionTokenCookie,
} from '@/lib/session-cookies';
import { getOneOrganizationByUserId } from '@/models/organization';
import { userLeaveOrganization } from '@/models/organization-user/user-leave';
import { createSession, invalidateSession } from '@/models/session';
import { userByEmail } from '@/models/user';
import { cookies } from 'next/headers';
import { currentSession } from '@/actions/auth/current-session';

export const memberLeaveOrzationMutation = async (confirmPassword: string) => {
  const { user } = await currentSession();

  if (!user) {
    throw new Error('Not authenticated');
  }

  const userConnected = await userByEmail(user?.email);

  if (!userConnected) {
    throw new Error('Invalid email');
  }

  const isValidPassword = await verifyPassword(
    userConnected.password,
    confirmPassword
  );

  if (!isValidPassword) {
    throw new Error('Invalid password');
  }

  const cookieStore = await cookies();

  const token = cookieStore.get('session')?.value ?? null;

  if (token === null) {
    return;
  }

  await invalidateSession(token);
  await deleteSessionTokenCookie();
  await userLeaveOrganization(user.id);
  const organization = await getOneOrganizationByUserId(user.id);
  const newOrganizationId = organization?.organizationId ?? null;
  const session = await createSession(user.id, newOrganizationId);
  await setSessionTokenCookie(session.id, session.expiresAt);
};
