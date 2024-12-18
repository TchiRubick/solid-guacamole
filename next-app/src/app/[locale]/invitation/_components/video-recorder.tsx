'use client';
import { useRef } from 'react';

interface VideoRecorderProps {
  mediaStream: MediaStream | null;
}

export const VideoRecorder = ({ mediaStream }: VideoRecorderProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  if (videoRef.current && mediaStream) {
    try {
      videoRef.current.srcObject = mediaStream;
    } catch (error) {
      throw new Error('Error setting video source');
    }
  }

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      className='w-full max-w-md rounded-lg shadow-md'
    />
  );
};

export default VideoRecorder;
