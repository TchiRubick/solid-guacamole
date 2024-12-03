import { SessionTable } from '@/packages/db/schemas';
import { createSelectSchema } from 'drizzle-zod';
import type { z } from 'zod';
import type { User } from '../user/type';
import type { Organization } from '../organization/type';

export const zSessionSelect = createSelectSchema(SessionTable);
export type Session = z.infer<typeof zSessionSelect>;

export type SessionValidationResult =
  | {
      session: Session;
      user: Omit<User, 'password'>;
      organization: Organization;
    }
  | { session: null; user: null; organization: null };
