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

const data = {
  navMain: [
    {
      title: 'Organization',
      url: '/organization',
      items: [
        {
          title: 'Dashboard',
          url: '/organization',
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
        <OrganizationSwitcher
          organization={[
            {
              name: 'Organization 1',
              id: '1',
            },
          ]}
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className='gap-2'>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className='font-medium'>
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub className='ml-0 border-l-0 px-1.5'>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={isActive(item.url)}
                        >
                          <a href={item.url}>{item.title}</a>
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
