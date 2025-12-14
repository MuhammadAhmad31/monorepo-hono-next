"use client";

import { useSSR } from "components/global/SSRWrapper";
import { UserForm } from "components/pages/examples/forms/user.form";
import { UsersTable } from "components/shared";

import { createUserAction, deleteUserAction } from "hooks/server/user.action";
import type { User } from "shared/types";

export const UsersServerSection = ({ users } : { users: User[] }) => {
  const { isPending, executeAction } = useSSR();

  return (
    <div className="border rounded-lg p-6 dark:border-gray-700">
      <h2 className="text-2xl font-semibold mb-4">
        👥 Users ({users.length})
      </h2>

      <UserForm
        loading={isPending}
        onSubmit={executeAction(createUserAction)}
      />

      <UsersTable
        users={users}
        onDelete={(id) => {
          if (!confirm('Delete user?')) return;
          return executeAction(deleteUserAction)(id);
        }}
      />
    </div>
  );
}