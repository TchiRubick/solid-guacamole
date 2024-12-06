'use server';

import { updateOrganizationOwner } from '@/models/organization/$update-owner';
import { verifyPassword } from '@/lib/password';
import { userByEmailOrByUsername } from '@/models/user';
import { currentSession } from '../auth/current-session';
import { cookies } from 'next/headers';
import {
  deleteSessionTokenCookie,
  setSessionTokenCookie,
} from '@/lib/session-cookies';
import { createSession, invalidateSession } from '@/models/session';
import { getOneOrganizationByUserId } from '@/models/organization';

export const transferOwnerMutation = async ({
  newOwner,
  confirmPassword,
}: {
  newOwner: string;
  confirmPassword: string;
}) => {
  const { session, user, organization } = await currentSession();
  const cookieStore = await cookies();

  if (!session) {
    throw new Error('Not authenticated');
  }

  const userConnected = await userByEmailOrByUsername(user?.email);

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

  const token = cookieStore.get('session')?.value ?? null;

  if (token === null) {
    return;
  }

  if (!organization) {
    throw new Error('No organization found');
  }

  await invalidateSession(token);
  await deleteSessionTokenCookie();
  await updateOrganizationOwner(organization?.id, newOwner);
  const getorganization = await getOneOrganizationByUserId(user.id);
  const newOrganizationId = getorganization?.organizationId ?? null;
  const newSession = await createSession(user.id, newOrganizationId);
  await setSessionTokenCookie(newSession.id, newSession.expiresAt);
};
