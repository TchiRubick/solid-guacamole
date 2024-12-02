import { CandidateTable } from './_components/candidate-table';

const CandidatePage = () => (
  <main>
    <h1 className='text-4xl font-bold'>Candidates</h1>
    <section className='mt-10'>
      <CandidateTable />
    </section>
  </main>
);

export default CandidatePage;
