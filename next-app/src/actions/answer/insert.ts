'use server';

import { insertAnser } from '@/models/answer/$insert';
import type { Answer } from '@/models/answer/type';

export const insertAnswerMutation = async (data: Answer) => {
  const result = await insertAnser(data);
  return result;
};
