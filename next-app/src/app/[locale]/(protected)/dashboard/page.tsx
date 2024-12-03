import { currentSession } from '@/actions/auth/current-session';
import { NotAuthorized } from '@/components/not-authorized';
import { Dashboard } from './_components/dashboard';

export const DashboardPage = async () => {
  const { session } = await currentSession();

  if (!session) {
    return <NotAuthorized />;
  }

  return (
    <div>
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
