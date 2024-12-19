'use client';
import { CheckCircle } from 'lucide-react';

const ErrorPage = ({ error }: { error: Error & { digest?: string } }) => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-background'>
      <div className='space-y-6 text-center'>
        <CheckCircle className='mx-auto h-24 w-24 text-destructive' />
        <h1 className='text-4xl font-bold tracking-tight'>{error}</h1>
        <p className='max-w-md text-xl text-muted-foreground'>
          Sorry, something went wrong !
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
