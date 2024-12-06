'use client';

import { currentSession } from '@/actions/auth/current-session';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useQuery } from '@tanstack/react-query';

export const MembresScope = () => {
  const { data: session } = useQuery({
    queryKey: ['session'],
    queryFn: currentSession,
  });
  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800'>
      <div className='mx-auto max-w-7xl p-6'>
        <div className='mb-12 rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800/50'>
          <Label className='mb-2 text-2xl font-medium'>
            Organization information
          </Label>
          <div className='mb-12 space-y-4 rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800/50'>
            <div className='flex flex-col justify-between gap-4 md:flex-row md:items-center'>
              <div>
                <Label htmlFor='name'>Name</Label>
                <Input value={session?.organization?.name ?? ''} readOnly />
              </div>
              <Badge variant='secondary' className='h-9 px-4 py-2'>
                Credits remaining: 30
              </Badge>
            </div>
            <div>
              <Label htmlFor='description'>Description</Label>

              <Textarea
                value={session?.organization?.description ?? ''}
                readOnly
              />
            </div>
          </div>
          <div className='mb-12 space-y-4 rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800/50'>
            <div className='flex items-center justify-between'>
              <Button variant='destructive' className=''>
                Leave Organization
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
