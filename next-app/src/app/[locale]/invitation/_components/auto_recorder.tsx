'use client';
import { Button } from '@/components/ui/button';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { questionsByInterviewIdQuery } from '@/actions/question/get-questions-interview';
import { useToast } from '@/hooks/use-toast';
import { useRecording } from '@/hooks/use-recording';
import VideoRecorder from './video-recorder';
import QuestionDisplay from './question-display';
import { insertAnswerMuation, updateToDone } from '@/actions/answer/insert';
import { useEffect, useState } from 'react';

export const AutoRecorder = () => {
  const { mediaStream, isRecording, startRecording,response , stopRecording } =
    useRecording();
  const token = useParams().token?.toString();
  const { toast } = useToast();
  const { data: question, isFetching } = useQuery({
    queryKey: ['question'],
    queryFn: () => (token ? questionsByInterviewIdQuery(token) : null),
    refetchOnWindowFocus: false,
  });
  const { mutateAsync: UpdateStatusQuestion } = useMutation({
    mutationKey: ['updateStatus-and-Answer'],
    mutationFn: insertAnswerMuation
    // mutationFn: updateToDone
  })
  useEffect(() => {
    if (question) {
      UpdateStatusQuestion({
        questionId:question.question?.id,
        answerData:{value:null},
        interviewId: question.interview_question.interviewId
      })
      // UpdateStatusQuestion(question?.question.id as string)
      startRecording();
    }
  }, [question]);


  return (

    <div className='flex flex-col items-center space-y-4'>
      {isFetching && (
        <p>Loading ...</p>
      )}
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
              window.location.reload()
            }}
          >
            Next Question
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
