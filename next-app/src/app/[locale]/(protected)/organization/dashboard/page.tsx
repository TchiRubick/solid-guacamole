import { NotAuthorized } from '@/components/not-authorized';
import { actionSessionGuard } from '@/server-functions/session';
import { redirect } from 'next/navigation';
import { CardNoOrganization } from '../_components/card-no-organization';
import { Dashboard } from './_components/dashboard';

export const DashboardPage = async () => {
  const session = await actionSessionGuard();

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
