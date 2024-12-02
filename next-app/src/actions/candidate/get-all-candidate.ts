'use server';

import { getAll } from '@/models/candidate/$get-all';

export const getAllCandidateAction = async () => {
  const candidates = await getAll();

  return candidates;
};
