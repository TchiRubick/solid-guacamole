'use server';

import { createOrganization } from '@/models/organization';
import type { InsertOrganization } from '@/models/organization/type';
import { currentSession } from '../auth/current-session';
import { createOrganizationUser } from '@/models/organization-user';

export const createOrganizationMutation = async (data: InsertOrganization) => {
  const { user } = await currentSession();

  if (!user) {
    return [];
  }
  const organization = await createOrganization(data);

  await createOrganizationUser(user.id, organization.map((o) => o.id)[0]);

  return organization;
};
