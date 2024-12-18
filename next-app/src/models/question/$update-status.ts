'server only';

import { db } from '@/packages/db';
import { eq } from 'drizzle-orm';
import { InterviewQuestionTable } from '@/packages/db/schemas';

export const updateQuestionStatus = async (id: string) => {
  const question = await db
    .update(InterviewQuestionTable)
    .set({ status: 'done' })
    .where(eq(InterviewQuestionTable.id, id));

  return question;
};
