import { currentSession } from '@/actions/auth/current-session';
import { NotAuthorized } from '@/components/not-authorized';
import { redirect } from 'next/navigation';
import { CardNoOrganization } from '../_components/card-no-organization';
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
    <main>
      {session.organizationId === null ? <CardNoOrganization /> : <Dashboard />}
    </main>
  );
};

export default DashboardPage;
