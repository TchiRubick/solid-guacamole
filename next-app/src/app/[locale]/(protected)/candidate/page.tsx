import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CandidateTable } from './_components/candidate-table';

const CandidatePage = () => (
  <main>
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
