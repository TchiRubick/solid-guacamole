import { updateInterviewStatusToPending } from '@/models/interview/$update-status-to-pending';
import { getInterviewByToken } from '@/models/interviewcandidat/$verif-status-token';

export const verifTokenStatusQuery = async (token: string) => {
  const t = await getInterviewByToken(token);

  if (!t) {
    return null;
  }

  if (t?.status !== 'done' && t?.expiresAt > new Date() && t?.token === token) {
    await updateInterviewStatusToPending(t.id);

    return t;
  }
};
