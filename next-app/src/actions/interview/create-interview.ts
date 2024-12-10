'use server';
import { createInterview } from '@/models/interview';
export interface dataInterview {
  name: string;
  description?: string | null | undefined;
  candidate_id: number;
  expiresAt: Date;
}
import { actionOrgSessionGuard } from '@/server-functions/session';
import {v4 as uuidV4} from 'uuid'
export const createInterviewMutation = async (data: dataInterview) => {
  const token = uuidV4()
  const password = uuidV4()
  const session = await actionOrgSessionGuard();
  const organizationId = session.organizationId;
  const dataInterviewMutation = {
    name:data.name,
    description:data.description,
    candidateId : data.candidate_id,
    organizationId:organizationId,
    password:password,
    token:token,
    expiresAt : data.expiresAt
  }
  const interviewData = await createInterview(dataInterviewMutation);
  return interviewData;
};
