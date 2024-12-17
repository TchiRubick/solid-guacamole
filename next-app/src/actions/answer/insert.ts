'use server';

import { AnswerModel } from '@/models/answer';
import type { AnswerInput } from '@/models/answer/type';
import { db } from '@/packages/db';

export const insertAnswerMuation = async ({
  questionId,
  answerData,
}: {
  questionId: string;
  answerData: AnswerInput;
}) => {
  const t = await db.transaction(async (ctx) => {
    const answerModel = new AnswerModel(ctx);

    return answerModel.createAnswerAndUpdateQuestion(questionId, answerData);
  });

  return t;
};
