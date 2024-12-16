import { oneInterviewQuery } from '@/actions/interview/get-one';
import { AutoRecorder } from '../_components/auto_recorder';

const InterviewPage = async ({
  params,
}: {
  params: Promise<{ id: number }>;
}) => {
  const interview = await oneInterviewQuery((await params).id);
  return (
    <div>
      <AutoRecorder />
    </div>
  );
};

export default InterviewPage;
