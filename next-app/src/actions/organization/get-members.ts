'use server';

import { getUserByOrganizationId } from '@/models/organization-user/$getUserByOrganizationId';
import { currentSession } from '../auth/current-session';

export const membersQuery = async () => {
  const session = await currentSession();

  if (!session) {
    throw new Error('Not authenticated');
  }

  if (!session.organization) {
    throw new Error('No organization found');
  }

  const { id } = session.organization;

  const result = await getUserByOrganizationId(id);

  return result;
};
