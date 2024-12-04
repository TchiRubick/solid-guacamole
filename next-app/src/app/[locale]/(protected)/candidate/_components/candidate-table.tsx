'use client';

import { getAllCandidateAction } from '@/actions/candidate/get-all-candidate';
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
import type { Candidate } from '@/models/candidate/type';
import { useQuery } from '@tanstack/react-query';
import type { ColumnDef } from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

const columnsFn = (onClick: (id: number) => void): ColumnDef<Candidate>[] => [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    accessorKey: 'id',
    header: 'Action',
    cell: ({ row }) => (
      <Button
        onClick={() => onClick(row.original.id)}
        variant='ghost'
        size='icon'
        className='h-8 w-8'
      >
        <Eye className='h-4 w-4' />
      </Button>
    ),
  },
];

export const CandidateTable = () => {
  const router = useRouter();

  const { data, isFetching } = useQuery({
    queryKey: ['candidates'],
    queryFn: () => getAllCandidateAction(),
  });

  const handleOnRowEditClick = (id: number) => {
    router.push(`/candidate/${id}`);
  };

  const columns = useMemo(() => columnsFn(handleOnRowEditClick), []);

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isFetching) return <Skeleton className='h-1/2 w-full' />;

  return (
    <Table>
      <TableCaption>A list of your candidates.</TableCaption>
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
