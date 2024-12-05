import { DeleteOrganizationModal } from './delete-organization-modal';
import { TranferOwnerForm } from './tranfer-owner-form';
export const DangerZone = () => {
  return (
    <div className='mb-12 space-y-4 rounded-xl border-2 border-destructive bg-white p-6 shadow-sm dark:bg-gray-800/50'>
      <TranferOwnerForm />
      <DeleteOrganizationModal />
    </div>
  );
};
