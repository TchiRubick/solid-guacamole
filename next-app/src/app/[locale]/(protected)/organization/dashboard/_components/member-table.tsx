'use client';

import { membersQuery } from '@/actions/organization/get-members';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import type { ColumnDef } from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Eye } from 'lucide-react';
import Link from 'next/link';

type Row = Awaited<ReturnType<typeof membersQuery>>[number];

const columns: ColumnDef<Row>[] = [
  {
    accessorKey: 'user.username',
    header: 'Name',
  },
  {
    accessorKey: 'user.email',
    header: 'Email',
  },
  {
    accessorKey: 'user.phone',
    header: 'Phone',
  },
  {
    accessorKey: 'id',
    header: 'Action',
    cell: ({ row }) => (
      <Link href={`/user/${row.original.userId}`}>
        <Button variant='ghost' size='icon' className='h-8 w-8'>
          <Eye className='h-4 w-4' />
        </Button>
      </Link>
    ),
  },
];

export const MemberTable = () => {
  const { data, isFetching } = useQuery({
    queryKey: ['members'],
    queryFn: () => membersQuery(),
  });

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isFetching) return <Skeleton className='h-1/2 w-full' />;

  return (
    <Table>
      <TableCaption>Members list</TableCaption>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && 'selected'}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className='h-24 text-center'>
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
