'server only';

import { db } from '@/packages/db';
import { type Answer } from './type';
import { AnswerTable } from '@/packages/db/schemas';

export const insertAnser = async (data: Answer) => {
  db.insert(AnswerTable).values(data).returning();
};
