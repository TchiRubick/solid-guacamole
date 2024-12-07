'use client';

import { Bell } from 'lucide-react';

import { LogOut } from 'lucide-react';

import { signout } from '@/actions/auth/signout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarMenuButton, useSidebar } from '@/components/ui/sidebar';
import { useSession } from '@/hooks/use-session';
import { useMutation } from '@tanstack/react-query';
import { BadgeCheck, ChevronsUpDown, CreditCard, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const SidebarUser = () => {
  const { data: session } = useSession();

  const { isMobile } = useSidebar();

  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: signout,
    onSuccess: () => {
      router.push('/');
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size='lg'
          className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
        >
          <Avatar className='h-8 w-8 rounded-lg'>
            <AvatarImage
              src={session?.user?.image ?? undefined}
              alt={session?.user?.username}
            />
            <AvatarFallback className='rounded-lg uppercase'>
              {session?.user?.username.charAt(0)}
              {session?.user?.username.charAt(1)}
            </AvatarFallback>
          </Avatar>
          <div className='grid flex-1 text-left text-sm leading-tight'>
            <span className='truncate font-semibold'>
              {session?.user?.username}
            </span>
            <span className='truncate text-xs'>{session?.user?.email}</span>
          </div>
          <ChevronsUpDown className='ml-auto size-4' />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-gradient-to-b from-gray-50 to-white'
        side={isMobile ? 'bottom' : 'right'}
        align='end'
        sideOffset={4}
      >
        <DropdownMenuLabel className='p-0 font-normal'>
          <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
            <Avatar className='h-8 w-8 rounded-lg'>
              <AvatarImage
                src={session?.user?.image ?? undefined}
                alt={session?.user?.username}
              />
              <AvatarFallback className='rounded-lg uppercase'>
                {session?.user?.username.charAt(0)}
                {session?.user?.username.charAt(1)}
              </AvatarFallback>
            </Avatar>
            <div className='grid flex-1 text-left text-sm leading-tight'>
              <span className='truncate font-semibold'>
                {session?.user?.username}
              </span>
              <span className='truncate text-xs'>{session?.user?.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Sparkles />
            Upgrade to Pro
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BadgeCheck />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard />
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Bell />
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button
            className='w-full cursor-pointer'
            size='sm'
            variant='link'
            onClick={() => {
              mutate();
            }}
          >
            <LogOut />
            Log out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
