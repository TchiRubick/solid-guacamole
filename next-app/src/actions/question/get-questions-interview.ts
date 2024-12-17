'use server';

import { getQuestionsByInterviewId } from '@/models/question';

export const questionsByInterviewIdQuery = async (interviewId: number) => {
  const questions = await getQuestionsByInterviewId(interviewId);

  if (questions?.status === 'pending' && questions.order > 0) {
    return questions;
  }
};
