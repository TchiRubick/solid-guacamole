'use server';
import { getAllInterviewTable } from '@/models/interviewcandidat/$get-all-data-interview-table';
import { getScopedI18n } from '@/packages/locales/server';

export const verifPassword = async (password: string) => {
  const tError = await getScopedI18n('server-error');
  // TODO: fix method name
  const pswd = await getAllInterviewTable(password);
  if (pswd) {
    return pswd.token;
  } else {
    throw tError('invalid-password');
  }
};
