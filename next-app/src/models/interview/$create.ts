'server only';
import { db } from '@/packages/db';
import { InterviewTable } from '@/packages/db/schemas';
import { type InsertInterview } from './type';
export const createInterview = async (data: InsertInterview) => {
  return db.insert(InterviewTable).values(data).returning();
};
