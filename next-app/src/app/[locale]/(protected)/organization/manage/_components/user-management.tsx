import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DetailsOrganizationForm } from './details-organization-form';
import { CreditsOrganizationForm } from './credits-organization-forn';
import { DangerZone } from './danger-zone';

export const UserManagement = () => (
  <div className='container mx-auto space-y-6 p-6'>
    <Card className='w-full border-2 border-primary/20'>
      <CardHeader>
        <CardTitle>Information general</CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <DetailsOrganizationForm />
        <CreditsOrganizationForm />
        <DangerZone />
      </CardContent>
    </Card>
  </div>
);
