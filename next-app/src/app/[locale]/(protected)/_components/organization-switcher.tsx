'use client';

import { ChevronsUpDown, Plus } from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { switchSessionOrganization } from '@/actions/auth/switch-session-organization';
import { useToast } from '@/hooks/use-toast';
import { currentSession } from '@/actions/auth/current-session';
import { useQuery } from '@tanstack/react-query';
import { getOrganizations } from '@/actions/organization/get-organizations';
import { Skeleton } from '@/components/ui/skeleton';

export const OrganizationSwitcher = () => {
  const { data: session } = useQuery({
    queryKey: ['session'],
    queryFn: currentSession,
  });
  const { data: organizations = [] } = useQuery({
    queryKey: ['organizations'],
    queryFn: () => getOrganizations(session?.user?.id ?? ''),
  });

  const { isMobile } = useSidebar();
  const { toast } = useToast();
  const [activeOrganization, setActiveOrganization] = useState(
    organizations[0]
  );

  const { mutateAsync } = useMutation({
    mutationFn: switchSessionOrganization,
    onSuccess: () => {
      window.location.reload();
    },
    onError: (error: Error) => {
      toast({
        title: 'error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const handleOrganizationClick = (organizationId: string) => {
    const userId = session?.user?.id;

    if (!userId) return;

    mutateAsync({ userId, organizationId });
  };

  const activeClassName = (id: string) =>
    cn('gap-2 p-2', {
      'text-primary bg-primary/20': id === activeOrganization?.id,
    });

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>
                  {session?.organization?.name ?? (
                    <Skeleton className='h-8 w-full' />
                  )}
                </span>
              </div>
              <ChevronsUpDown className='ml-auto' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
            align='start'
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className='text-xs text-muted-foreground'>
              organization
            </DropdownMenuLabel>
            {organizations.map((organization) => (
              <DropdownMenuItem
                key={organization.id}
                onClick={() => {
                  setActiveOrganization(organization);
                  handleOrganizationClick(organization.organizationId);
                }}
                className={`${activeClassName(organization.id)} cursor-pointer`}
              >
                {organization.organization.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                href='/organization/create'
                prefetch
                className='flex w-full items-center gap-2'
              >
                <div className='flex size-6 items-center justify-center rounded-md border bg-background'>
                  <Plus className='size-4' />
                </div>
                <div className='font-medium text-muted-foreground'>
                  Create an organization
                </div>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
