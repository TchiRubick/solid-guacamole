'use server';

import { updateInterviewStatusToOngoing } from '@/models/interview';

export const updateStatusToOngoingMutation = async (interviewId: number) => {
  await updateInterviewStatusToOngoing(interviewId);
};
