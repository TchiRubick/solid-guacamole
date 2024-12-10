'server only'
import { db } from '@/packages/db';
import { type InsertInterview } from './type';
import { InterviewTable } from '@/packages/db/schemas';
import { type dataInterview } from '@/actions/interview/create-interview';
export const createInterview = async (data:InsertInterview) => {
    return db.insert(InterviewTable).values(data)
};
