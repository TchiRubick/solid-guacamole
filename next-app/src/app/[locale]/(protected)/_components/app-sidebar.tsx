'use client';

import { Badge } from '@/components/ui/badge';
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
import { useSession } from '@/hooks/use-session';
import {
  Building2,
  ChevronDown,
  FileText,
  LayoutDashboard,
  List,
  Settings,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { OrganizationSwitcher } from './organization-switcher';
import { SidebarUser } from './sibar-user';

const data = {
  navMain: [
    {
      title: 'Organization',
      icon: Building2,
      url: '#',
      items: [
        {
          title: 'Dashboard',
          icon: LayoutDashboard,
          url: '/organization/dashboard',
        },
        {
          title: 'Manage',
          icon: Settings,
          url: '/organization/manage',
        },
      ],
    },
    {
      title: 'Interviews',
      icon: FileText,
      url: '/interview',
      items: [
        {
          title: 'List',
          icon: List,
          url: '/interview',
        },
        {
          title: 'Templates',
          icon: FileText,
          url: '/interview/template',
          soon: true,
        },
      ],
    },
    {
      title: 'Candidate',
      icon: Users,
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

  const { data: session } = useSession();

  return (
    <Sidebar variant='floating' className='bg-card backdrop-blur-xl' {...props}>
      <SidebarHeader className='border-b border-border/50 pb-2'>
        <OrganizationSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className='gap-1.5 p-2'>
            {session?.organization &&
              data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className='group relative flex items-center gap-2 rounded-md px-3 py-2 hover:bg-accent/50 data-[active=true]:bg-accent/50'
                  >
                    <Link href={item.url} prefetch className='font-medium'>
                      <item.icon className='h-4 w-4' />
                      <span>{item.title}</span>
                      {item.items?.length > 0 && (
                        <ChevronDown className='ml-auto h-4 w-4 transition-transform group-data-[state=open]:rotate-180' />
                      )}
                    </Link>
                  </SidebarMenuButton>
                  {item.items?.length ? (
                    <SidebarMenuSub className='ml-4 border-l border-border/50 pl-2'>
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={isActive(subItem.url)}
                            className='group flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground data-[active=true]:bg-accent data-[active=true]:text-accent-foreground'
                          >
                            <Link
                              href={subItem.soon ? '#' : subItem.url}
                              prefetch
                            >
                              <subItem.icon className='h-4 w-4' />
                              <span>{subItem.title}</span>
                              {subItem.soon && (
                                <Badge
                                  variant='outline'
                                  className='ml-auto text-[8px]'
                                >
                                  Coming Soon
                                </Badge>
                              )}
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
      <SidebarFooter className='border-t border-border/50 p-2'>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarUser />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
