'server only';
import { db } from '@/packages/db';

// TODO: check expiration date and status
export const getAllInterviewTable = async (password: string) => {
  return await db.query.InterviewTable.findFirst({
    where: (q, { eq }) => eq(q.password, password),
  });
};
