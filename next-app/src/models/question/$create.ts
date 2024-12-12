'serer only';

import { db } from '@/packages/db';
import { QuestionTable } from '@/packages/db/schemas';
import type { InsertQuestion } from './type';

export const createQuestion = async (data: InsertQuestion[]) => {
  const question = await db.insert(QuestionTable).values(data).returning();

  return question;
};
