'use server';

import { updateInterviewStatusToPending } from '@/models/interview/$update-status-to-pending';
import { interviewByToken } from '@/server-functions/interview-by-token';

export const checkExistingInterview = async (token: string) => {
  const t = await interviewByToken(token);

  if (!t) {
    return null;
  }

  if (t.status !== 'ongoing') {
    await updateInterviewStatusToPending(t.id);
  }

  return t;
};
