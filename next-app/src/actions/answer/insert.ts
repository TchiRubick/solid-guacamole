'use server';

import { AnswerModel } from '@/models/answer';
import type { AnswerInput } from '@/models/answer/type';
import { db } from '@/packages/db';
import { InterviewQuestionTable } from '@/packages/db/schemas';
import { eq } from 'drizzle-orm';

export const insertAnswerMuation = async ({
  questionId,
  answerData,
  interviewId,
}: {
  questionId: string;
  answerData: AnswerInput;
  interviewId: number;
}) => {
  const t = await db.transaction(async (ctx) => {
    const answerModel = new AnswerModel(ctx);

    const [answer] = await answerModel.create(answerData);

    const updatedQuestion = await answerModel.update(
      questionId,
      answer?.id,
      interviewId
    );

    return {
      answer,
      updatedQuestion,
    };
  });

  return t;
};

export const updateToDone = async (questionId:string)=>{
   return await db.update(InterviewQuestionTable).set({status:'done'}).where(eq(InterviewQuestionTable.questionId,questionId)).returning()
}