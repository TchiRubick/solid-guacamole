import { AnswerTable, InterviewQuestionTable } from '@/packages/db/schemas';
import { Core, type DBType } from '../Core';
import type { AnswerInput } from './type';
import { eq } from 'drizzle-orm';

export class AnswerModel extends Core {
  constructor(ctx?: DBType) {
    super(ctx);
  }

  create = async (data: AnswerInput) => {
    const [answer] = await this.db.insert(AnswerTable).values(data);

    return answer;
  };

  update = async (questionId: string, answerId: string) => {
    const [updatedRecord] = await this.db
      .update(InterviewQuestionTable)
      .set({ status: 'done', answerId })
      .where(eq(InterviewQuestionTable.questionId, questionId));

    return updatedRecord;
  };

  createAnswerAndUpdateQuestion = async (
    questionId: string,
    answerData: AnswerInput
  ) => {
    const answer = await this.create(answerData);

    if (!answer?.id) {
      throw new Error('Failed to create the answer');
    }

    const updatedQuestion = await this.update(questionId, answer.id);

    return {
      answer,
      updatedQuestion,
    };
  };
}
