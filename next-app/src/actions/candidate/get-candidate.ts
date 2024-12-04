'use server';

import { getCandidateById } from '@/models/candidate/$get-candidate-by-id';

export const getCandidate = async (id: number) => {
  const candidate = await getCandidateById(id);

  if (!candidate) {
    throw 'Candidate does not exist';
  }

  return candidate;
};
