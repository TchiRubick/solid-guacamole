'use server';

import { getCandidateById } from '@/models/candidate/$get-candidate-by-id';
import { currentSession } from '../auth/current-session';

export const getCandidate = async (id: number) => {
  const session = await currentSession();

  if (!session) {
    throw new Error('Not authenticated');
  }

  if (!session.organization?.id) throw new Error('No organizastion');

  const candidate = await getCandidateById(id, session.organization.id);

  if (!candidate) {
    throw 'Candidate does not exist';
  }

  return candidate;
};
