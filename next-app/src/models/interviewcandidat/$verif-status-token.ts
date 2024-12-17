import { db } from '@/packages/db';

// TODO: check the expiration date and the status
export const getInterviewByToken = async (token: string) => {
  return await db.query.InterviewTable.findFirst({
    where: (q, { eq }) => eq(q.token, token),
  });
};
