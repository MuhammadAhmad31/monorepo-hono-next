'use client';

import { useMemo } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import type { User } from 'shared/types';
import { VirtualDataTable } from '../global/DataTable';

const columnHelper = createColumnHelper<User>();

export const UsersTable = ({
  users,
  onDelete,
}: {
  users: User[];
  onDelete: (id: string) => void;
}) => {
  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Name',
        size: 150,
      }),
      columnHelper.accessor('email', {
        header: 'Email',
        size: 200,
      }),
      columnHelper.accessor('createdAt', {
        header: 'Created At',
        size: 120,
        cell: info =>
          new Date(info.getValue()).toLocaleDateString(),
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        size: 100,
        cell: info => (
          <button
            onClick={() => {
              if (confirm('Delete user and all posts?')) {
                onDelete(info.row.original.id);
              }
            }}
            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
          >
            Delete
          </button>
        ),
      }),
    ],
    [onDelete]
  );

  return (
    <VirtualDataTable<User>
      data={users}
      columns={columns}
      height={400}
      rowHeight={12}
    />
  );
}
