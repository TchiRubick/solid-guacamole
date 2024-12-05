'use server';

import { updateOrganizationOwner } from '@/models/organization/$update-owner';
import { verifyPassword } from '@/lib/password';
import { userByEmail } from '@/models/user';

export const transferOwnerMutation = async ({
  newOwner,
  organizationId,
  ownerEmail,
  confirmPassword,
}: {
  newOwner: string;
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

  const result = await updateOrganizationOwner(organizationId, newOwner);
  return result;
};
