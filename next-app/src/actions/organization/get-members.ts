'use server';
import { getUserByOrganizationId } from '@/models/organization-user/$getUserByOrganizationId';

export const membersQuery = async (organizationId: string) => {
  const result = await getUserByOrganizationId(organizationId);
  return result;
};
