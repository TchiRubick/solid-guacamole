'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Building2, Delete, Eye, Users } from 'lucide-react';
import { DialogCloseButton } from './DialogCloseButton';
import { currentSession } from '@/actions/auth/current-session';
import { useQuery } from '@tanstack/react-query';

export function Dashboard() {
  const { data: session } = useQuery({
    queryKey: ['session'],
    queryFn: currentSession,
  });

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800'>
      <div className='mx-auto max-w-7xl p-6'>
        {/* Header Section */}
        <div className='mb-12 rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800/50'>
          <div className='flex flex-col justify-between gap-4 md:flex-row md:items-center'>
            <div>
              <h1 className='text-2xl font-bold tracking-tight'>
                {session?.organization?.name}
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
              <span className='text-sm'>Owner: {session?.user?.username}</span>
            </div>
            <div className='flex items-center gap-2'>
              <Building2 className='h-4 w-4 text-muted-foreground' />
              <span className='text-sm'>
                Organization description: {session?.organization?.description}
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
        <div className='rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800/50'>
          <div className='mb-6 flex items-center justify-between'>
            <h2 className='text-xl font-semibold'>Organization Members</h2>
            <DialogCloseButton />
          </div>
          <div className='relative overflow-hidden rounded-lg border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>UserName</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    email: 'John Doe',
                    username: '24/05/1995',
                    address: 'Web Developer',
                    phone: '$120,000',
                    city: 'Antananarivo',
                    status: 'Ok',
                  },
                  {
                    email: 'Jane Doe',
                    username: '04/11/1980',
                    address: 'Web Designer',
                    phone: '$100,000',
                    city: 'Antananarivo',
                    status: 'Ok',
                  },
                  {
                    email: 'Gary Barlow',
                    username: '24/05/1995',
                    address: 'Singer',
                    phone: '$20,000',
                    city: 'Antananarivo',
                    status: 'Ok',
                  },
                ].map((item) => (
                  <TableRow key={item.email}>
                    <TableCell className='font-medium'>{item.email}</TableCell>
                    <TableCell>{item.username}</TableCell>
                    <TableCell>{item.address}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>{item.city}</TableCell>
                    <TableCell>
                      <Badge variant='secondary'>{item.status}</Badge>
                    </TableCell>
                    <TableCell className='text-right'>
                      <Button variant='ghost' size='icon' className='h-8 w-8'>
                        <Eye className='h-4 w-4' />
                      </Button>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='h-8 w-8 text-destructive'
                      >
                        <Delete className='h-4 w-4' />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
