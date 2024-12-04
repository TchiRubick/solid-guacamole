'use server';

import { getAll } from '@/models/candidate/$get-all';
import { currentSession } from '../auth/current-session';

export const getAllCandidateAction = async () => {
  const session = await currentSession();

  if (!session) {
    throw new Error('Not authenticated');
  }

  if (!session.organization?.id) return [];

  const candidates = await getAll(session.organization.id);

  return candidates;
};
