'server only';

import { db } from '@/packages/db';
import { QuestionTable } from '@/packages/db/schemas';
import { eq } from 'drizzle-orm';

export const updateQuestionStatus = async (qId: string) => {
  await db
    .update(QuestionTable)
    .set({ status: 'done' })
    .where(eq(QuestionTable.id, qId))
    .returning();
};
