'use server';

import { verifyPassword } from '@/lib/password';
import {
  deleteSessionTokenCookie,
  getSessionTokenCookie,
} from '@/lib/session-cookies';
import { updateOrganizationOwner } from '@/models/organization/$update-owner';
import { invalidateSession } from '@/models/session';
import { userByEmailOrByUsername } from '@/models/user';
import { getSession } from '@/server-functions/session';

export const transferOwnerMutation = async ({
  newOwner,
  confirmPassword,
}: {
  newOwner: string;
  confirmPassword: string;
}) => {
  const { session, user, organization } = await getSession();

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

  const token = await getSessionTokenCookie();

  if (token === null) {
    return;
  }

  if (!organization) {
    throw new Error('No organization found');
  }

  await invalidateSession(token);
  await deleteSessionTokenCookie();
  await updateOrganizationOwner(organization?.id, newOwner);
};
