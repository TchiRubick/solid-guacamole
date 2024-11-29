import Image from 'next/image';
import { SignInForm } from './_components/signin-form';

const SignInPage = () => (
  <div className='min-h-screen w-full lg:grid lg:grid-cols-2'>
    <div className='flex items-center justify-center py-12'>
      <SignInForm />
    </div>
    <div className='hidden bg-muted lg:block'>
      <Image
        src='/placeholder.svg'
        alt='Image'
        width='1920'
        height='1080'
        className='h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
      />
    </div>
  </div>
);

export default SignInPage;
