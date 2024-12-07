'use server';

import { createOrganization } from '@/models/organization';
import { createOrganizationUser } from '@/models/organization-user';
import type { InsertOrganization } from '@/models/organization/type';
import { getSession } from '@/server-functions/session';

export const createOrganizationMutation = async (data: InsertOrganization) => {
  const { user } = await getSession();

  if (!user) {
    return [];
  }
  const organization = await createOrganization(data);

  await createOrganizationUser(user.id, organization.map((o) => o.id)[0]);

  return organization;
};
