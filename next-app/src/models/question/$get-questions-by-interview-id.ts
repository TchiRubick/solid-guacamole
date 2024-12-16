'server only';

import { db } from '@/packages/db';

export const getQuestionsByInterviewId = async (interviewId: number) => {
  const questions = await db.query.QuestionTable.findMany({
    where: (q, { eq }) => eq(q.interviewId, interviewId),
  });
  return questions;
};
