'use client';

import { interviewListQuery } from '@/actions/interview/interview-list';
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
import type { SelectInterview } from '@/models/interview/type';
import { useQuery } from '@tanstack/react-query';
import type { ColumnDef } from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Eye } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { PaginationBar } from './paginationBar';

const columns: ColumnDef<SelectInterview>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'candidate.email',
    header: 'Candidate',
  },
  {
    accessorKey: 'organization.name',
    header: 'Organization',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'id',
    header: 'Action',
    cell: ({ row }) => (
      <Link href={`/interview/${row.original.id}`}>
        <Button variant='ghost' size='icon' className='h-8 w-8'>
          <Eye className='h-4 w-4' />
        </Button>
      </Link>
    ),
  },
];

const pageSize = 10;

export const InterviewListTable = () => {
  const [page, setPage] = useState(1);

  const { data, isFetching } = useQuery({
    queryKey: ['interviews', page],
    queryFn: () => interviewListQuery(page, pageSize),
  });

  const totalPages = data ? Math.ceil(data.length / pageSize) : 1;

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isFetching) return <Skeleton className='h-1/2 w-full' />;

  return (
    <div>
      <Table className='bg-card'>
        <TableCaption>A list of your interviews.</TableCaption>
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
      {totalPages > 1 && (
        <PaginationBar
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};
