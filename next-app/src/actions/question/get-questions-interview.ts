'use server';

import { getLowestPendingQuestion } from '@/models/question';

export const questionsByInterviewIdQuery = async (token: string) => {
  const questions = await getLowestPendingQuestion(token);

  return questions;
};
