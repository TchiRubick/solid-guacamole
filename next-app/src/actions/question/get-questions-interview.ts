'use server';

import { getQuestionsByInterviewId } from '@/models/question';

export const questionsByInterviewIdQuery = async (interviewId: number) => {
  const questions = await getQuestionsByInterviewId(interviewId);
  return questions;
};
