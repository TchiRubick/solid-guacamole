'use client';
import { useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useRecording = () => {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const enableVideoStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setMediaStream(stream);
      } catch (error) {
        toast({
          title: 'Error accessing webcam',
          description: (error as unknown as Error).message,
          variant: 'destructive',
        });
      }
    };

    enableVideoStream();

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startRecording = () => {
    if (mediaStream && !mediaRecorderRef.current) {
      mediaRecorderRef.current = new MediaRecorder(mediaStream, {
        mimeType: 'video/webm',
      });

      chunksRef.current = [];
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          if (chunksRef.current) {
            chunksRef.current.push(event.data);
          }
        }
      };

      mediaRecorderRef.current.onstop = () => {
        if (chunksRef.current) {
          new Blob(chunksRef.current, { type: 'video/webm' });
        }
      };

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

  return { mediaStream, isRecording, startRecording, stopRecording };
};
