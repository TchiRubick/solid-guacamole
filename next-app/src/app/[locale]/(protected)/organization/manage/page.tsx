import { currentSession } from '@/actions/auth/current-session';
import { OwnerScope } from './_components/owner-scope';
import { CardNoOrganization } from '../_components/card-no-organization';
import { MembresScope } from './_components/membres-scope';

const ManageOrganizationPage = async () => {
  const { session } = await currentSession();
  return (
    <div>
      {session?.organizationId === null ? (
        <div className='flex items-center justify-center'>
          <CardNoOrganization />
        </div>
      ) : (
        <div>
          <OwnerScope />
          <MembresScope />
        </div>
      )}
    </div>
  );
};

export default ManageOrganizationPage;
