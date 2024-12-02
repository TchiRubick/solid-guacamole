'server only';

import { db } from '@/packages/db';

export const getAll = async () => db.query.CandidateTable.findMany();
