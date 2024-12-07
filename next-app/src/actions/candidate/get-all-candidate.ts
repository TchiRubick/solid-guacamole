'use server';

import { getAll } from '@/models/candidate/$get-all';
import { actionSessionGuard } from '@/server-functions/session';

export const getAllCandidateAction = async () => {
  const session = await actionSessionGuard();

  if (!session.organizationId) return [];

  const candidates = await getAll(session.organizationId);

  return candidates;
};
