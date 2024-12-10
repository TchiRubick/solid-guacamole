'server only'
import { db } from '@/packages/db';
import { type InsertInterview } from './type';
import { InterviewTable } from '@/packages/db/schemas';
export const createInterview = async (data:InsertInterview) => {
    return db.insert(InterviewTable).values(data)
};
