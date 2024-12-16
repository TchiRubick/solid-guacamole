import { verifTokenStatusQuery } from '@/actions/interview/verif-token-status';
import { Recorder } from '../../interview/_components/recorder';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle, Video, Mic } from 'lucide-react';

const Page = async ({ params }: { params: Promise<{ token: string }> }) => {
  const interview = await verifTokenStatusQuery((await params).token);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white shadow-lg rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <CardTitle className="text-3xl font-bold text-center">Interview Setup</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {interview ? (
            <div className="space-y-8">
              <p className="text-center text-gray-700 text-lg">
                Let's ensure your device is ready for the interview.
              </p>
              <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
                <Recorder/>
              </div>
              <div className="flex justify-center space-x-12">
                <DeviceStatus icon={Video} label="Camera" />
                <DeviceStatus icon={Mic} label="Microphone" />
              </div>
              <div className="flex items-center justify-center space-x-2 text-green-600">
                <CheckCircle size={24} />
                <span className="text-lg font-semibold">Your device is ready!</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-4 text-red-600 py-12">
              <AlertCircle size={64} />
              <p className="text-center text-xl font-semibold">Your interview has expired</p>
            </div>
          )}
        </CardContent>
        {interview && (
          <CardFooter className="flex justify-center p-6 bg-gray-50">
            <Link href={`/mock/interview/${interview.id}`}>
              <Button size="lg" className="px-8 py-3 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-colors duration-300">
                Start Interview
              </Button>
            </Link>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

const DeviceStatus = ({ icon: Icon, label }: { icon: React.ElementType; label: string }) => (
  <div className="flex flex-col items-center space-y-2">
    <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
      <Icon className="w-7 h-7 text-blue-600" />
    </div>
    <span className="text-sm font-medium text-gray-700">{label}</span>
  </div>
);

export default Page;

