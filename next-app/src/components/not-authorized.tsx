'use client';

import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const NotAuthorized = () => {
  const router = useRouter();

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-background'>
      <div className='space-y-6 text-center'>
        <XCircle className='mx-auto h-24 w-24 text-destructive' />
        <h1 className='text-4xl font-bold tracking-tight'>Not Authorized</h1>
        <p className='max-w-md text-xl text-muted-foreground'>
          Sorry, you don&apos;t have permission to access this page.
        </p>
        <Button onClick={() => router.push('/')} size='lg'>
          Go to Home Page
        </Button>
      </div>
    </div>
  );
};
