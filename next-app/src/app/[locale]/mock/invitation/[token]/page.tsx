import { verifTokenStatusQuery } from '@/actions/interview/verif-token-status';

const Page = async ({ params }: { params: Promise<{ token: string }> }) => {
  const interview = await verifTokenStatusQuery((await params).token);

  return <div>{interview ? 'ok' : 'ko'}</div>;
};

export default Page;
