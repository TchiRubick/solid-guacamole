import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CandidateTable } from './_components/candidate-table';

const CandidatePage = () => (
  <main className='min-h-screen bg-gradient-to-b from-gray-50 to-white p-8 dark:from-gray-900 dark:to-gray-800'>
    <h1 className='text-4xl font-bold'>Candidates</h1>
    <div className='flex w-full justify-end'>
      <Link href='/candidate/create'>
        <Button variant='default'>Create Candidate</Button>
      </Link>
    </div>
    <section className='mt-10'>
      <CandidateTable />
    </section>
  </main>
);

export default CandidatePage;
