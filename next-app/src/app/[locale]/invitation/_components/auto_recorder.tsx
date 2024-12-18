'use client';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { questionsByInterviewIdQuery } from '@/actions/question/get-questions-interview';
import { useToast } from '@/hooks/use-toast';
import { useRecording } from '@/hooks/use-recording';
import VideoRecorder from './video-recorder';
import QuestionDisplay from './question-display';

export const AutoRecorder = () => {
  const { mediaStream, isRecording, startRecording, stopRecording } =
    useRecording();
  const token = useParams().token?.toString();
  const { toast } = useToast();

  const { data: question, isFetching } = useQuery({
    queryKey: ['question'],
    queryFn: () => (token ? questionsByInterviewIdQuery(token) : null),
    refetchOnWindowFocus: false,
  });

  return (
    <div className='flex flex-col items-center space-y-4'>
      <VideoRecorder mediaStream={mediaStream} />
      <div className='flex space-x-4'>
        {isRecording ? (
          <Button onClick={stopRecording} variant='destructive'>
            Stop Recording
          </Button>
        ) : (
          <Button
            onClick={() => {
              if (!question || !question.question || !question.question.value) {
                toast({
                  title: 'No question loaded',
                  description: 'Please wait and try again.',
                  variant: 'destructive',
                });
                return;
              }
              startRecording();
            }}
          >
            Start Recording
          </Button>
        )}
      </div>
      <QuestionDisplay
        isFetching={isFetching}
        questionValue={question?.question?.value || ''}
      />
    </div>
  );
};

export default AutoRecorder;
