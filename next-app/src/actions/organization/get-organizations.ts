'use server';

import { organizationUser } from '@/models/organization-user/$organizationUser';

export const getOrganizations = async (userId: string) => {
  const organizationUsers = await organizationUser(userId);

  return organizationUsers;
};
