'use server';

import { updateInterviewStatusToOngoing } from '@/models/interview';

export const updateStatusToOngoingMutation = async (interviewId: number) => {
  const interview = await updateInterviewStatusToOngoing(interviewId);
  return interview;
};
