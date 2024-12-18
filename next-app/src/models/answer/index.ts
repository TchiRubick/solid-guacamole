import { AnswerTable, InterviewQuestionTable } from '@/packages/db/schemas';
import { Core, type DBType } from '../Core';
import type { AnswerInput } from './type';
import { eq, and } from 'drizzle-orm';

export class AnswerModel extends Core {
  constructor(ctx?: DBType) {
    super(ctx);
  }

  create = async (data: AnswerInput) => {
    const answer = await this.db.insert(AnswerTable).values(data).returning();

    return answer;
  };

  update = async (questionId: string, answerId: string, iId: number) => {
    const updatedRecord = await this.db
      .update(InterviewQuestionTable)
      .set({ status: 'done', answerId })
      .where(
        and(
          eq(InterviewQuestionTable.interviewId, iId),
          eq(InterviewQuestionTable.questionId, questionId)
        )
      )
      .returning();

    return updatedRecord;
  };
}
