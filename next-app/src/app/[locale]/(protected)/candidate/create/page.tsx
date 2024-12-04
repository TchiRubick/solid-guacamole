import { CreateCandidateForm } from './_components/create-candidate-form';

const CandidateCreatePage = () => (
  <main className='min-h-screen bg-gradient-to-b from-gray-50 to-white p-8 dark:from-gray-900 dark:to-gray-800'>
    <h1 className='text-4xl font-bold'>Candidate creation</h1>
    <section className='mt-10'>
      <CreateCandidateForm />
    </section>
  </main>
);

export default CandidateCreatePage;
