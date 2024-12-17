import { verifTokenStatusQuery } from '@/actions/interview/verif-token-status';
import { Recorder } from '../../interview/_components/recorder';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { AutoRecorder } from '../../interview/_components/auto_recorder';

const Page = async ({ params }: { params: Promise<{ token: string }> }) => {
  const interview = await verifTokenStatusQuery((await params).token);

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4'>
      <Card className='w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-lg'>
        <CardHeader className='bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white'>
          <CardTitle className='text-center text-3xl font-bold'>
            Welcome to {interview?.name} 🦑
          </CardTitle>
        </CardHeader>
        <CardContent className='p-6'>
          {interview ? (
            <div className='space-y-8'>
              {interview?.status === 'pending' && (
                <p className='text-center text-lg text-gray-700'>
                  Let&apos;s ensure your device is ready for the interview.
                </p>
              )}
              <div className='rounded-xl bg-gray-50 p-6 shadow-inner'>
                {interview?.status === 'pending' ? (
                  <Recorder interviewId={interview?.id} />
                ) : (
                  <AutoRecorder />
                )}
              </div>
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center space-y-4 py-12 text-red-600'>
              <AlertCircle size={64} />
              <p className='text-center text-xl font-semibold'>
                Your interview has expired
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
