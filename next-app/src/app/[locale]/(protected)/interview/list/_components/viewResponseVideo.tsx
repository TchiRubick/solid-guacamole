'use client';

import { Button } from '@/components/ui/button';

import { Eye, X } from 'lucide-react';
import { useState } from 'react';

export const ViewResponseVideo = () => {
  const [viewvideo, setviewvideo] = useState(false);
  const handleclickopen = () => setviewvideo(true);
  const handleclickclose = () => setviewvideo(false);

  return (
    <div>
      <Button variant='outline' size='icon' onClick={() => handleclickopen()}>
        <Eye className='h-4 w-4' />
        <span className='sr-only'>View</span>
      </Button>

      {viewvideo ? (
        <div className='absolute inset-0 flex h-full w-full items-center justify-center bg-gray-600 bg-opacity-50'>
          <div className='flex flex-col'>
            <div className='flex justify-end'>
              {' '}
              <X onClick={() => handleclickclose()} />{' '}
            </div>
            <iframe
              width='752'
              height='423'
              src='https://www.youtube.com/embed/sNJZkxXjlVg'
              title='1 Minute of LONDON'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              referrerPolicy='strict-origin-when-cross-origin'
              allowFullScreen
            ></iframe>
          </div>
        </div>
      ) : null}
    </div>
  );
};
