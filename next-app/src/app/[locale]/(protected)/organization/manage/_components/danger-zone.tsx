'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DeleteOrganizationModal } from './delete-organization-modal';

export const DangerZone = () => {
  return (
    <Card className='space-y-4 border-destructive p-4'>
      <div className='flex w-full items-end justify-between gap-4'>
        <div className='flex w-full flex-col gap-4'>
          <Label htmlFor='danger'>Email</Label>
          <Input placeholder='Email address' id='danger' className='w-full' />
        </div>
        <Button variant='outline'>Transfer ownership</Button>
      </div>
      <DeleteOrganizationModal />
    </Card>
  );
};
