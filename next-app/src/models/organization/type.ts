import { OrganizationTable } from '@/packages/db/schemas';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const zOrganization = createInsertSchema(OrganizationTable, {
  name: z.string().min(1),
  description: z.string().min(1),
});

export type InsertOrganization = z.infer<typeof zOrganization>;
export const zOrganizationSelect = createSelectSchema(OrganizationTable);
export type Organization = z.infer<typeof zOrganizationSelect>;
