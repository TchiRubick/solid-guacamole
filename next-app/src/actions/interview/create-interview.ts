'use server'
import {createInterview} from '@/models/interview';
export interface dataInterview{
    name: string;
    description?: string | null | undefined;
    candidate_id:number;
    organizationId:string;
    password:string;
    token:string;
    expiresAt: Date;
}

export const createInterviewMutation = async (data:dataInterview )=>{
    
    const interviewData = await createInterview(data)
    return interviewData
}