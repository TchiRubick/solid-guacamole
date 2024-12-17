import { db } from '@/packages/db';

export const getInterviewByToken = async (token: string) => {
  return await db.query.InterviewTable.findFirst({
    where: (q, { eq, and, gt, ne }) =>
      and(
        eq(q.token, token),
        ne(q.status, 'done'),
        gt(q.expiresAt, new Date())
      ),
  });
};
