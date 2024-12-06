'use server';

import { getOneByUserOrganizationId } from '@/models/organization/$get-one-by-user-organization-id';
import { currentSession } from '../auth/current-session';

export const getFullInformations = async () => {
  const { session } = await currentSession();

  if (!session) {
    throw new Error('Not authenticated');
  }

  if (!session.organizationId) {
    throw new Error('No organization found');
  }

  const organization = await getOneByUserOrganizationId(session.organizationId);

  return organization;
};
