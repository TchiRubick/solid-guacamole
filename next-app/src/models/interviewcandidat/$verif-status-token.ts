import { db } from '@/packages/db';

export const interviewByTokenQuery = async (token: string) => {
  return await db.query.InterviewTable.findFirst({
    where: (q, { eq }) => eq(q.token, token),
  });
};