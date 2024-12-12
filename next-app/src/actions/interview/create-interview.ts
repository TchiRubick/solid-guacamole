'use server';
import { createInterview } from '@/models/interview';
import { zInterviewInsert } from '@/models/interview/type';
import { createQuestion } from '@/models/question';
import { actionOrgSessionGuard } from '@/server-functions/session';

export interface CreateInterviewPayload {
  name: string;
  description: string;
  candidateId: number;
  expiresAt: Date;
  questions: {
    id: string;
    text: string;
  }[]
}

export const createInterviewMutation = async (data: CreateInterviewPayload) => {
  const session = await actionOrgSessionGuard();

  const token = crypto.randomUUID();
  const password = crypto.getRandomValues(new Uint32Array(1))[0].toString(16);

  const organizationId = session.organizationId;

  const dataInterviewMutation = {
    name: data.name,
    description: data.description,
    candidateId: data.candidateId,
    organizationId: organizationId,
    password,
    token,
    expiresAt: data.expiresAt,
  };

  zInterviewInsert.parse(dataInterviewMutation);

  const [interviewData] = await createInterview(dataInterviewMutation);
 
  const formattedQuestions = await data.questions?.map((question) => ({
    value: question.text,
    organizationId: organizationId,
    interviewId : interviewData.id
  }));

  await createQuestion(formattedQuestions);



  return interviewData;
};
