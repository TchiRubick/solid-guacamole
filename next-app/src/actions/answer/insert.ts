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

    const [answer] = await answerModel.create(answerData);

    if (!answer?.id) {
      throw new Error('Failed to create the answer');
    }

    const updatedQuestion = await answerModel.update(questionId, answer?.id);

    return {
      answer,
      updatedQuestion,
    };
  });

  return t;
};
