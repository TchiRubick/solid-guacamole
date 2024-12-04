import { CreateCandidateForm } from './_components/create-candidate-form';

const CandidateCreatePage = () => (
  <main>
    <h1 className='text-4xl font-bold'>Candidate creation</h1>
    <section className='mt-10'>
      <CreateCandidateForm />
    </section>
  </main>
);

export default CandidateCreatePage;
