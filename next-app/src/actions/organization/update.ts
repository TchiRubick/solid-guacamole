'use server';

import type { UpdateOrganization } from '@/models/organization/type';
import { updateOrganization } from '@/models/organization/$update';

export const updateOrganizationMutation = async (input: UpdateOrganization) => {
  const result = await updateOrganization(input);

  return result;
};
