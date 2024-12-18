'use client';
import { useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { uploadVideoMuation } from '@/actions/video/upload-video';

export const useRecording = () => {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

  const [response, setresponse] = useState<string>('');

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

     const {mutateAsync:UploadVideo} =  useMutation({
     mutationKey:['upload-video'],
     mutationFn:uploadVideoMuation 
     })

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
      console.log('MediaStream',mediaStream)
      console.log('MediaRecorder',mediaRecorderRef)
      mediaRecorderRef.current.onstop = () => {
        if (chunksRef.current) {
          const video = new Blob(chunksRef.current, { type: 'video/webm' });
          UploadVideo(video,{
            onSuccess:(response)=>{
                setresponse(response)
                
            }
          })
          
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    }
  };
  console.log(response)
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return { mediaStream,response, isRecording, startRecording, stopRecording };
};
