import { currentSession } from '@/actions/auth/current-session';
import { NotAuthorized } from '@/components/not-authorized';
import { redirect } from 'next/navigation';
import { Dashboard } from './_components/dashboard';

export const DashboardPage = async () => {
  const { session } = await currentSession();

  if (!session) {
    return <NotAuthorized />;
  }

  if (session.organizationId === null) {
    redirect('/organization/create');
  }

  return (
    <div>
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
