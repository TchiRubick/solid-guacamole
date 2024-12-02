'use server';

import { createOrganization } from '@/models/organization/$create';
import type { InsertOrganization } from '@/models/organization/type';
export const createOrganizationMutation = async (data: InsertOrganization) => {
  const organization = await createOrganization(data);

  return organization;
};