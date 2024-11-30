'serer only';

import { db } from '@/packages/db';
import { QuestionTable } from '@/packages/db/schemas';
import type { InsertQuestion } from './type';

export const createQuestion = (input: InsertQuestion) => {
  const question = db.insert(QuestionTable).values(input).returning();

  return question;
};
