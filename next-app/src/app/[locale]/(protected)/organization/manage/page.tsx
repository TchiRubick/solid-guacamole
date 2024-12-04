import { currentSession } from '@/actions/auth/current-session';
import { UserManagement } from './_components/user-management';
import { CardNoOrganization } from '../_components/card-no-organization';

const ManageOrganizationPage = async () => {
  const { session } = await currentSession();
  return (
    <div>
      {session?.organizationId === null ? (
        <div className='flex items-center justify-center'>
          <CardNoOrganization />
        </div>
      ) : (
        <UserManagement />
      )}
    </div>
  );
};

export default ManageOrganizationPage;
