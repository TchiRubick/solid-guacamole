'server onnly';

import { db } from '@/packages/db';
import { InterviewTable } from '@/packages/db/schemas';
import { eq } from 'drizzle-orm';

export const updateInterviewStatusToPending = async (interviewId: number) => {
  await db
    .update(InterviewTable)
    .set({ status: 'pending' })
    .where(eq(InterviewTable.id, interviewId))
    .returning();
};
