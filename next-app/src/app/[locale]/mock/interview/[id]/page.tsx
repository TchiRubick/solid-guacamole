import { AutoRecorder } from '../_components/auto_recorder';
import { questionsByInterviewIdQuery } from '@/actions/question/get-questions-interview';

const InterviewPage = async ({
  params,
}: {
  params: Promise<{ id: number }>;
}) => {
  const questions = await questionsByInterviewIdQuery((await params).id);

  return (
    <div>
      <AutoRecorder />
      {questions.map((question) => (
        <div key={question.id}>{question.value}</div>
      ))}
    </div>
  );
};

export default InterviewPage;
