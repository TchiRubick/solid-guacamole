import { verifTokenStatusQuery } from '@/actions/interview/verif-token-status';
import { Recorder } from '../../interview/_components/recorder';
import { Button } from '@/components/ui/button';

const Page = async ({ params }: { params: Promise<{ token: string }> }) => {
  const interview = await verifTokenStatusQuery((await params).token);

  return (
    <div>
      {interview ? (
        <div>
          <span>Test your camera and microphone</span>
          <Recorder />
          <Button>Start Interview</Button>
        </div>
      ) : (
        'Your interview has already expired'
      )}
    </div>
  );
};

export default Page;
