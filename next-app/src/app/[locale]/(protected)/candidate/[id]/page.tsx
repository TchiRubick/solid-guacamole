import { getCandidate } from '@/actions/candidate/get-candidate';
import getQueryClient from '@/packages/react-query';
import { CandidateDetails } from './_components/candidate-details';

const CandidateDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const client = getQueryClient();

  const candidateId = Number(id);

  client.prefetchQuery({
    queryKey: ['candidate', 'details', id],
    queryFn: () => getCandidate(candidateId),
  });

  return (
    <main className='min-h-screen bg-gradient-to-b from-gray-50 to-white p-8 dark:from-gray-900 dark:to-gray-800'>
      <h1 className='text-4xl font-bold'>Candidate Details</h1>
      <CandidateDetails id={candidateId} />
    </main>
  );
};

export default CandidateDetailsPage;
