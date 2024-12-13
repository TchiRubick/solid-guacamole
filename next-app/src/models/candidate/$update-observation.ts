'server only';

import { db } from '@/packages/db';
import { CandidateTable } from '@/packages/db/schemas';
import { eq } from 'drizzle-orm';

export const updateObservation = async (id: number, observation: string) =>
  await db
    .update(CandidateTable)
    .set({ observation: observation })
    .where(eq(CandidateTable.id, id))
    .returning();
