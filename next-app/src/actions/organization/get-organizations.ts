'use server';

import { organizationUser } from '@/models/organization-user';

export const getOrganizations = async (userId: string) => {
  const organizationUsers = await organizationUser(userId);

  return organizationUsers;
};
