'use client';

import { Button } from '@/components/ui/button';

import { Eye, X } from 'lucide-react';
import { useState } from 'react';

export const ViewResponseVideo = ({ videoUrl }: { videoUrl: string }) => {
  const [viewvideo, setviewvideo] = useState(false);

  return (
    <div>
      <Button variant='outline' size='icon' onClick={() => setviewvideo(true)}>
        <Eye className='h-4 w-4' />
        <span className='sr-only'>View</span>
      </Button>

      {viewvideo ? (
        <div className='absolute inset-0 flex h-screen w-full items-center justify-center bg-slate-950 bg-opacity-50'>
          <div className='z-10 flex max-h-screen flex-col'>
            <div className='flex justify-end'>
              <X onClick={() => setviewvideo(false)} />
            </div>
            <video width='752' height='223' src={videoUrl} controls autoPlay />
          </div>
        </div>
      ) : null}
    </div>
  );
};
