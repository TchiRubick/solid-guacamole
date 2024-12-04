'use server';

import { createCandidate } from '@/models/candidate/$create-candidate';
import { zCandidateCreate, type CandidateInput } from '@/models/candidate/type';
import { currentSession } from '../auth/current-session';

export const createCandidateMutation = async (
  candidate: Omit<CandidateInput, 'organizationId'>
) => {
  const { session } = await currentSession();

  if (!session) {
    throw new Error('Not authenticated');
  }

  const insertCandidate = zCandidateCreate.parse({
    ...candidate,
    organizationId: session.organizationId,
  });

  const [result] = await createCandidate(insertCandidate);

  return result;
};
