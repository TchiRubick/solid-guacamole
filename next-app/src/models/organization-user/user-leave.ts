'server only';

import { db } from '@/packages/db';
import { OrganizationUserTable } from '@/packages/db/schemas';
import { eq } from 'drizzle-orm';

export const userLeaveOrganization = async (userId: string) => {
  await db
    .delete(OrganizationUserTable)
    .where(eq(OrganizationUserTable.userId, userId))
    .returning();
};
