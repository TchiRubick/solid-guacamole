'server only';
import { db } from '@/packages/db';

export const getAllInterviewTable = async (password: string) => {
  return await db.query.InterviewTable.findFirst({
    where: (q, { eq }) => eq(q.password, password),
  });
};
