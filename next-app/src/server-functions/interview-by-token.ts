'use server';

import { getInterviewByToken } from '@/models/interviewcandidat/$verif-status-token';

import { getScopedI18n } from '@/packages/locales/server';

export const interviewByToken = async (token: string) => {
  const tError = await getScopedI18n('server-error');

  const interview = await getInterviewByToken(token);

  return interview;
};
