import { NotAuthorized } from '@/components/not-authorized';
import { actionSessionGuard } from '@/server-functions/session';
import { CardNoOrganization } from '../_components/card-no-organization';
import { Dashboard } from './_components/dashboard';

export const DashboardPage = async () => {
  const session = await actionSessionGuard();

  if (!session) {
    return <NotAuthorized />;
  }

  return (
    <main>
      {session.organizationId === null ? (
        <div className='flex items-center justify-center'>
          <CardNoOrganization />
        </div>
      ) : (
        <Dashboard />
      )}
    </main>
  );
};

export default DashboardPage;
