'server only';

import { db } from '@/packages/db';

export const getCandidateById = async (id: number) =>
  db.query.CandidateTable.findFirst({
    where: (candidate, { eq }) => eq(candidate.id, id),
  });
