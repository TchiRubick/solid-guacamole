import { oneInterviewQuery } from '@/actions/interview/get-one';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Eye } from 'lucide-react';

const DetailsInterviewPage = async ({
  params,
}: {
  params: Promise<{ id: number }>;
}) => {
  const interview = await oneInterviewQuery((await params).id);

  return (
    <Card>
      <CardHeader className='space-y-4'>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-xl text-neutral-200'>
            Interview {interview?.name}
          </CardTitle>
          <div className='space-x-2'>
            <Button
              variant='outline'
              className='border-neutral-800 bg-neutral-900 text-neutral-200 hover:bg-neutral-800'
            >
              Process
            </Button>
            <Button
              variant='outline'
              className='border-neutral-800 bg-neutral-900 text-neutral-200 hover:bg-neutral-800'
            >
              Create as template
            </Button>
          </div>
        </div>
        <div className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='name' className='text-neutral-400'>
              Candidate name:
              <Label className='text-neutral-200'>
                {' '}
                {interview?.candidate.name}{' '}
              </Label>
            </Label>
          </div>
          <div className='space-y-2'>
            <Label className='text-neutral-400'>Interview description: </Label>
            <Label className='text-neutral-200'>{interview?.description}</Label>
          </div>
        </div>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='space-y-2'>
          <Label htmlFor='observations' className='text-neutral-400'>
            Observations
          </Label>
          <Textarea
            id='observations'
            className='min-h-[100px] border-neutral-800 bg-neutral-900 text-neutral-200'
            placeholder='Enter your observations'
          />
        </div>
        <div className='space-y-4'>
          <Label className='text-neutral-400'>Response</Label>
          {[1, 2, 3].map((questionNumber) => (
            <div key={questionNumber} className='space-y-2'>
              <Label className='text-sm text-neutral-500'>
                {questionNumber}. Question {questionNumber}
              </Label>
              <div className='flex gap-2'>
                <Input
                  placeholder='https://response-video-link'
                  className='border-neutral-800 bg-neutral-900 text-neutral-200'
                />
                <Button
                  variant='outline'
                  size='icon'
                  className='border-neutral-800 bg-neutral-900 text-neutral-200 hover:bg-neutral-800'
                >
                  <Eye className='h-4 w-4' />
                  <span className='sr-only'>View</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailsInterviewPage;
