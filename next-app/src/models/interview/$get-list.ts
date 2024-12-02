'server only';

import { db } from '@/packages/db';
import { InterviewTable } from '@/packages/db/schemas';

export const getList = async () => db.select().from(InterviewTable);
