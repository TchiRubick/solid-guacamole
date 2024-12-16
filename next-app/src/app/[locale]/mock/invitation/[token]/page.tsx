import { verifTokenStatusQuery } from '@/actions/interview/verif-token-status';
import { Recorder } from '../../interview/_components/recorder';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AlertCircle, CheckCircle, Video, Mic } from 'lucide-react';

const Page = async ({ params }: { params: Promise<{ token: string }> }) => {
  const interview = await verifTokenStatusQuery((await params).token);

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4'>
      <Card className='w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-lg'>
        <CardHeader className='bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white'>
          <CardTitle className='text-center text-3xl font-bold'>
            Interview Setup
          </CardTitle>
        </CardHeader>
        <CardContent className='p-6'>
          {interview ? (
            <div className='space-y-8'>
              <p className='text-center text-lg text-gray-700'>
                Let's ensure your device is ready for the interview.
              </p>
              <div className='rounded-xl bg-gray-50 p-6 shadow-inner'>
                <Recorder />
              </div>
              <div className='flex justify-center space-x-12'>
                <DeviceStatus icon={Video} label='Camera' />
                <DeviceStatus icon={Mic} label='Microphone' />
              </div>
              <div className='flex items-center justify-center space-x-2 text-green-600'>
                <CheckCircle size={24} />
                <span className='text-lg font-semibold'>
                  Your device is ready!
                </span>
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
        {interview && (
          <CardFooter className='flex justify-center bg-gray-50 p-6'>
            <Link href={`/mock/interview/${interview.id}`}>
              <Button
                size='lg'
                className='bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 text-lg font-semibold transition-colors duration-300 hover:from-blue-700 hover:to-indigo-700'
              >
                Start Interview
              </Button>
            </Link>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

const DeviceStatus = ({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) => (
  <div className='flex flex-col items-center space-y-2'>
    <div className='flex h-14 w-14 items-center justify-center rounded-full bg-blue-100'>
      <Icon className='h-7 w-7 text-blue-600' />
    </div>
    <span className='text-sm font-medium text-gray-700'>{label}</span>
  </div>
);

export default Page;
