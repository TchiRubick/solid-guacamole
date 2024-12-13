import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditsOrganizationForm } from './credits-organization-forn';
import { DangerZone } from './danger-zone';
import { DetailsOrganizationForm } from './details-organization-form';

export const OwnerScope = () => (
  <div className='min-h-screen border-2 bg-background'>
    <CardHeader>
      <CardTitle>Manage your organization</CardTitle>
    </CardHeader>
    <CardContent className='space-y-6'>
      <DetailsOrganizationForm />
      <CreditsOrganizationForm />
      <DangerZone />
    </CardContent>
  </div>
);
