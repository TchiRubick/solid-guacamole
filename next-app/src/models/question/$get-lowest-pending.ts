'server only';

import { eq, and } from 'drizzle-orm';
import { InterviewQuestionTable, InterviewTable } from '@/packages/db/schemas';
import { db } from '@/packages/db';
import { QuestionTable } from '@/packages/db/schemas';

export const getLowestPendingQuestion = async (interviewId: string) => {
  const result = await db
    .select()
    .from(InterviewQuestionTable)
    .leftJoin(
      QuestionTable,
      eq(InterviewQuestionTable.questionId, QuestionTable.id)
    )
    .leftJoin(
      InterviewTable,
      eq(InterviewQuestionTable.interviewId, InterviewTable.id)
    )
    .where(
      and(
        eq(InterviewTable.token, interviewId),
        eq(InterviewQuestionTable.status, 'pending')
      )
    )
    .orderBy(QuestionTable.order)
    .limit(1);

  return result[0] || null;
};
