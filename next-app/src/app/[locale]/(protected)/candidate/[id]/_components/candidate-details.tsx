'use client';

import { getCandidate } from '@/actions/candidate/get-candidate';
import { useQuery } from '@tanstack/react-query';
import { CandidateSkeleton } from '../../_components/candidate-skeleton';

export const CandidateDetails = ({ id }: { id: number }) => {
  const { data, isFetching } = useQuery({
    queryKey: ['candidate', 'details', id],
    queryFn: () => getCandidate(id),
  });

  if (isFetching) return <CandidateSkeleton />;

  return (
    <div>
      <div>Candidate name: {data?.name}</div>
    </div>
  );
};
