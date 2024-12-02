import { CandidateTable } from '@/packages/db/schemas';
import { createSelectSchema } from 'drizzle-zod';
import type { z } from 'zod';

export const zCandidateSelect = createSelectSchema(CandidateTable);
export type Candidate = z.infer<typeof zCandidateSelect>;
