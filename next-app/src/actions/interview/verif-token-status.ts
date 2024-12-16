import { getInterviewByToken } from '@/models/interviewcandidat/$verif-status-token';

export const verifTokenStatusQuery = async (token: string) => {
  const t = await getInterviewByToken(token);

  if (!t) {
    return false;
  }

  if (t?.status !== 'sent' && t?.expiresAt < new Date()) {
    return false;
  } else {
    return t;
  }
};
