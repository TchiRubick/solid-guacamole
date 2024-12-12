import Link from 'next/link';
import { InterviewListTable } from './_components/interviewListTable';
import { Button } from '@/components/ui/button';

const ListInterviewPage = () => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Interviews List</h1>
        <Link href='/interview/create' prefetch>
          <Button variant='default'> Create Interview + </Button>
        </Link>
      </div>
      <InterviewListTable />
    </div>
  );
};

export default ListInterviewPage;
