'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import { OrganizationSwitcher } from './organization-switcher';
import { SidebarUser } from './sibar-user';
import Link from 'next/link';

const data = {
  navMain: [
    {
      title: 'Organization',
      url: '/organization',
      items: [
        {
          title: 'Dashboard',
          url: '/organization/dashboard',
        },
        {
          title: 'Manage',
          url: '/organization/manage',
        },
      ],
    },
    {
      title: 'Interviews',
      url: '/interview',
      items: [
        {
          title: 'List',
          url: '/interview',
        },
        {
          title: 'Templates',
          url: '/interview/template',
        },
      ],
    },
    {
      title: 'Candidate',
      url: '/candidate',
      items: [],
    },
  ],
};

export const AppSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  const pathname = usePathname();
  const isActive = (url: string) => pathname === url;

  return (
    <Sidebar variant='floating' {...props}>
      <SidebarHeader>
        <OrganizationSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className='gap-2'>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.url} prefetch className='font-medium'>
                    {item.title}
                  </Link>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub className='ml-0 border-l-0 px-1.5'>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={isActive(item.url)}
                        >
                          <Link href={item.url} prefetch>
                            {item.title}
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarUser />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
