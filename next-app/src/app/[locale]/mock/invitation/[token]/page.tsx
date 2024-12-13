import { verifTokenStatus } from '@/actions/interview/verif-token-status';
import { useMutation } from '@tanstack/react-query';
import React, { useEffect } from 'react';

export default function page({
    params
  }: {
    params: Promise<{ token: string }>;
  })

  {
    const {mutateAsync:verificationStatusAndExpiration} = useMutation({
        mutationKey:['verif'],
        mutationFn: verifTokenStatus
    })
    useEffect(() =>{
         verificationStatusAndExpiration()
    },[])
  return <div></div>;
}
