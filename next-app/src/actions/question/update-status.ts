'use server';

import { updateQuestionStatus } from '@/models/question';

export const updateStatusQuestionMutation = async (id: string) => {
  const t = await updateQuestionStatus(id);
  return t;
};
