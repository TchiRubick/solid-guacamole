import { oneInterviewQuery } from '@/actions/interview/get-one';

const InterviewPage = async ({
  params,
}: {
  params: Promise<{ id: number }>;
}) => {
  const interview = await oneInterviewQuery((await params).id);
  return <div>Interview {interview?.name}</div>;
};

export default InterviewPage;
