import { interviewByTokenQuery } from '@/models/interviewcandidat/$verif-status-token';

export const verifTokenStatusQuery = async (token: string) => {
  const t = await interviewByTokenQuery(token);
  if (t?.status === 'canceled' || t?.status === 'done') {
    return false;
  } else {
    return true;
  }
};
