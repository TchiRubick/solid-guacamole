'server only';

import { db } from '@/packages/db';
import { InterviewTable } from '@/packages/db/schemas';
import { eq } from 'drizzle-orm';

export const updateInterviewStatusToOngoing = async (interviewId: number) => {
  const interview = await db
    .update(InterviewTable)
    .set({ status: 'ongoing' })
    .where(eq(InterviewTable.id, interviewId));

  return interview;
};
