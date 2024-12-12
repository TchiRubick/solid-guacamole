'use server';

import { createQuestion } from '@/models/question/$create';
import type { InsertQuestion } from '@/models/question/type';

export const createQuestionMutation = async (data: InsertQuestion) => {
  const question = await createQuestion(data);

  return question;
};
