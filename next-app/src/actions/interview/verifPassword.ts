'use server';
import { getAllInterviewTable } from '@/models/interviewcandidat/$get-all-data-interview-table';

export const verifPassword = async (password: string) => {
  const pswd = await getAllInterviewTable(password);
  if (pswd) {
    return pswd.token;
  } else {
    throw new Error('Mot de passe invalide');
  }
};
