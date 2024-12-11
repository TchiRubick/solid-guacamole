'use server';
import { createInterview } from '@/models/interview';
import { zInterviewInsert } from '@/models/interview/type';
import { actionOrgSessionGuard } from '@/server-functions/session';

export interface CreateInterviewPayload {
  name: string;
  description: string;
  candidateId: number;
  expiresAt: Date;
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

  return interviewData;
};
