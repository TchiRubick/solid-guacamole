'use server';
import { getCandidateById } from '@/models/candidate/$get-candidate-by-id';
import { createInterview } from '@/models/interview';
import { zInterviewInsert } from '@/models/interview/type';
import { createQuestion } from '@/models/question';
import { db } from '@/packages/db';
import { sendEmail } from '@/packages/mail';
import { candidateInvitationTemplate } from '@/packages/mail/templates/candidate-invitation';
import { getSession } from '@/server-functions/session';

export interface CreateInterviewPayload {
  name: string;
  description: string;
  candidateId: number;
  expiresAt: Date;
  questions: {
    id: string;
    text: string;
  }[];
}

export const createInterviewMutation = async (data: CreateInterviewPayload) => {
  const { organization: sessionOrg } = await getSession();

  if (!sessionOrg) {
    throw new Error('Not authenticated');
  }

  const organizationId = sessionOrg.id;

  const candidate = await getCandidateById(data.candidateId, organizationId);

  if (!candidate) {
    throw new Error('Candidate not found');
  }

  const token = crypto.randomUUID();
  const password = crypto.getRandomValues(new Uint32Array(1))[0].toString(16);

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

  const result = await db.transaction(async () => {
    const [interviewData] = await createInterview(dataInterviewMutation);

    const formattedQuestions = data.questions?.map((question) => ({
      value: question.text,
      organizationId: organizationId,
      interviewId: interviewData.id,
    }));

    await createQuestion(formattedQuestions);

    return interviewData;
  });

  const template = candidateInvitationTemplate({
    token: result.token,
    candidateName: candidate.name,
    password: result.password,
    organizationName: sessionOrg.name,
    expiresAt: result.expiresAt,
  });

  const resultSend = await sendEmail(
    candidate.email,
    'Interview Invitation',
    template
  );

  return resultSend;
};
