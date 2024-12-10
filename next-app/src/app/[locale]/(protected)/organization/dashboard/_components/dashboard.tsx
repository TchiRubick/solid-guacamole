'use client';
import { getFullInformations } from '@/actions/organization/get-full-informations';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { Building2, Users } from 'lucide-react';
import { DialogCloseButton } from './DialogCloseButton';
import { MemberTable } from './member-table';

export function Dashboard() {
  const { data: organization } = useQuery({
    queryKey: ['organization'],
    queryFn: () => getFullInformations(),
  });

  return (
    <div className='min-h-screen bg-background'>
      <div className='mx-auto max-w-7xl p-6'>
        {/* Header Section */}
        <div className='mb-12 rounded-xl bg-card p-6 shadow-sm dark:bg-gray-800/50'>
          <div className='flex flex-col justify-between gap-4 md:flex-row md:items-center'>
            <div>
              <h1 className='text-2xl font-bold tracking-tight'>
                {organization?.name}
              </h1>
              <p className='mt-1 text-sm text-muted-foreground'>
                Manage your organization settings and members
              </p>
            </div>
            <Badge variant='secondary' className='h-9 px-4 py-2'>
              Credits remaining: 30
            </Badge>
          </div>
          <div className='mt-6 grid gap-1'>
            <div className='flex items-center gap-2'>
              <Users className='h-4 w-4 text-muted-foreground' />
              <span className='text-sm'>
                Owner: {organization?.owner.username}
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <Building2 className='h-4 w-4 text-muted-foreground' />
              <span className='text-sm'>
                Organization description: {organization?.description}
              </span>
            </div>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className='mb-12 grid gap-6 md:grid-cols-3'>
          <Card className='relative overflow-hidden'>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm font-medium'>
                Interview passed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>40</div>
              <div className='absolute right-4 top-4 text-muted-foreground/20'>
                <Users className='h-12 w-12' />
              </div>
            </CardContent>
          </Card>
          <Card className='relative overflow-hidden'>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm font-medium'>Candidates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>40</div>
              <div className='absolute right-4 top-4 text-muted-foreground/20'>
                <Users className='h-12 w-12' />
              </div>
            </CardContent>
          </Card>
          <Card className='relative overflow-hidden'>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm font-medium'>
                Top interviewer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>John</div>
              <div className='absolute right-4 top-4 text-muted-foreground/20'>
                <Users className='h-12 w-12' />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Table Section */}
        <div className='rounded-xl bg-card p-6 shadow-sm dark:bg-gray-800/50'>
          <div className='mb-6 flex items-center justify-between'>
            <h2 className='text-xl font-semibold'>Organization Members</h2>
            <DialogCloseButton />
          </div>
          <div className='relative overflow-hidden'>
            <MemberTable />
          </div>
        </div>
      </div>
    </div>
  );
}
