import { InterviewQuestionTable, QuestionTable } from '@/packages/db/schemas';
import type { DBType } from '../Core';
import { Core } from '../Core';
import type { InsertInterviewQuestion, InsertQuestion } from './type';

export class QuestionModel extends Core {
  constructor(ctx?: DBType) {
    super(ctx);
  }

  create = async (data: InsertQuestion[]) => {
    const question = await this.db
      .insert(QuestionTable)
      .values(data)
      .returning();

    return question;
  };

  createInterviewRelation = async (data: InsertInterviewQuestion[]) => {
    const interviewQuestions = await this.db
      .insert(InterviewQuestionTable)
      .values(data)
      .returning();

    return interviewQuestions;
  };
}
