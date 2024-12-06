import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DetailsOrganizationForm } from './details-organization-form';
import { CreditsOrganizationForm } from './credits-organization-forn';
import { DangerZone } from './danger-zone';

export const OwnerScope = () => (
  <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800'>
    <CardHeader>
      <CardTitle>Information general</CardTitle>
    </CardHeader>
    <CardContent className='space-y-6'>
      <DetailsOrganizationForm />
      <CreditsOrganizationForm />
      <DangerZone />
    </CardContent>
  </div>
);
