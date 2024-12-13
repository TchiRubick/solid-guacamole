import { getInterviewByToken } from "@/models/interviewcandidat/$verif-status-token"

export const verifTokenStatus = async (token:string)=>{
    const t = await getInterviewByToken(token)
    if (t?.status === 'canceled' || t?.status === 'done') {
        return false
    }
    else{
        return true
    }
} 