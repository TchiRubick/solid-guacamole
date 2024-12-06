import { currentSession } from '@/actions/auth/current-session';
import { OwnerScope } from './_components/owner-scope';
import { CardNoOrganization } from '../_components/card-no-organization';
import { MembresScope } from './_components/membres-scope';
import { getOneOrganizationQuery } from '@/actions/organization/get-one-organization';

const ManageOrganizationPage = async () => {
  const { session, organization } = await currentSession();
  const organizationId = organization?.id;

  if (!organizationId) {
    return (
      <div className='flex items-center justify-center'>
        <CardNoOrganization />
      </div>
    );
  }

  const org = await getOneOrganizationQuery(organization);

  return (
    <div>
      {org && (
        <div>
          {session?.userId === org?.ownerId ? <OwnerScope /> : <MembresScope />}
        </div>
      )}
    </div>
  );
};

export default ManageOrganizationPage;
