'use server';

import {
  deleteOrganization,
  getOneOrganizationByUserId,
} from '@/models/organization';
import { userByEmail } from '@/models/user';
import { verifyPassword } from '@/lib/password';
import { createSession, invalidateSession } from '@/models/session';
import {
  deleteSessionTokenCookie,
  setSessionTokenCookie,
} from '@/lib/session-cookies';
import { cookies } from 'next/headers';

export const deleteOrganizationMutation = async ({
  organizationId,
  ownerEmail,
  confirmPassword,
}: {
  organizationId: string;
  ownerEmail: string;
  confirmPassword: string;
}) => {
  const user = await userByEmail(ownerEmail);

  if (!user) {
    throw new Error('Invalid email');
  }

  const isValidPassword = await verifyPassword(user.password, confirmPassword);

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
  await deleteOrganization(organizationId);
  const organization = await getOneOrganizationByUserId(user.id);
  const newOrganizationId = organization?.organizationId ?? null;
  const session = await createSession(user.id, newOrganizationId);
  await setSessionTokenCookie(session.id, session.expiresAt);
};
