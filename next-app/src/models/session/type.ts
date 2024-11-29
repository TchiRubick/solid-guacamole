import { SessionTable } from '@/packages/db/schemas';
import { createSelectSchema } from 'drizzle-zod';
import type { z } from 'zod';
import type { User } from '../user/type';

export const zSessionSelect = createSelectSchema(SessionTable);
export type Session = z.infer<typeof zSessionSelect>;

export type SessionValidationResult =
  | { session: Session; user: Omit<User, 'password'> }
  | { session: null; user: null };
