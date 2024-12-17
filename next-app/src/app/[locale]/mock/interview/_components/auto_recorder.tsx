'use client';
import { uploadVideoMuation as uploadVideoToS3 } from '@/actions/video/upload-video';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { updateStatusQuestionMutation } from '@/actions/question/update-status';
import { useQuery } from '@tanstack/react-query';
import { questionsByInterviewIdQuery } from '@/actions/question/get-questions-interview';
import { useQueryClient } from '@tanstack/react-query';
import GradualSpacing from '@/components/ui/gradual-spacing';
export const AutoRecorder = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const { toast } = useToast();
  const token = useParams().token?.toString();
  const queryClient = useQueryClient();
  if (!token) {
    return 'No token';
  }
  const { data: question } = useQuery({
    queryKey: ['question'],
    queryFn: () => questionsByInterviewIdQuery(token),
  });
  const { mutate: updateStatus } = useMutation({
    mutationFn: updateStatusQuestionMutation,
    onSuccess: () => {
      toast({
        title: 'Question updated successfully',
        variant: 'default',
      });
    },
    onError: (error: Error) => {
      toast({
        title: error.message,
        variant: 'destructive',
      });
    },
  });
  const chunksRef = useRef<Blob[]>([]);
  const { mutate } = useMutation({
    mutationFn: uploadVideoToS3,
    onSuccess: () => {
      toast({
        title: 'Video uploaded successfully',
        variant: 'default',
      });
      queryClient.invalidateQueries({ queryKey: ['question'] });
      // window.location.reload();
    },
    onError: (error: Error) => {
      toast({
        title: error.message,
        variant: 'destructive',
      });
    },
  });
  useEffect(() => {
    const enableVideoStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setMediaStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        // Automatically start recording after enabling the video stream
        startRecording(stream);
        if (!question) {
          return;
        }
        updateStatus(question.interview_question.id);

      } catch (error) {
        toast({
          title: 'Error accessing webcam',
          description: (error as unknown as Error).message,
          variant: 'destructive',
        });
      }
    };
    enableVideoStream();
    // Cleanup function
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);
  const startRecording = (stream?: MediaStream) => {
    const currentStream = stream || mediaStream;
    if (currentStream) {
      // Reset previous recording
      chunksRef.current = [];
      // Create MediaRecorder
      mediaRecorderRef.current = new MediaRecorder(currentStream, {
        mimeType: 'video/webm',
      });
      // Event listeners for data collection
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };
      // Event listener for when recording stops
      mediaRecorderRef.current.onstop = () => {
        // Create a blob from the recorded chunks
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        // Automatically upload the video to S3
        mutate(blob);
        // Optionally, clear state or perform other actions
        setIsRecording(false);
      };
      // Start recording
      mediaRecorderRef.current.start();
      setIsRecording(true);
    }
  };
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };
  return (
    <div className='flex flex-col items-center space-y-4'>
      <video
        ref={videoRef}
        autoPlay
        muted
        className='w-full max-w-md rounded-lg shadow-md'
      />
      {mediaStream ? (
        <>
          <div className='flex space-x-4'>
            {isRecording ? (
              <Button onClick={stopRecording} variant='destructive'>
                Stop Recording
              </Button>
            ) : (
              <Button onClick={() => startRecording()}>Next Question</Button>
            )}
          </div>
          <GradualSpacing
            text={question && question.question ? question.question.value : ''}
          />
        </>
      ) : (
        <p className='text-red-500'>
          Camera not available or video not starting.
        </p>
      )}
    </div>
  );
};
export default AutoRecorder;