'use server';

import { getCandidateById } from '@/models/candidate/$get-candidate-by-id';
import { actionOrgSessionGuard } from '@/server-functions/session';

export const getCandidate = async (id: number) => {
  const session = await actionOrgSessionGuard();

  const candidate = await getCandidateById(id, session.organizationId);

  if (!candidate) {
    throw 'Candidate does not exist';
  }

  return candidate;
};
