"use client";

import {
  useCreateUser,
  useDeleteUser,
  useUsersQuery,
} from "hooks/client/user.hooks";
import { UserFormWithCustomField } from "../forms/user.form";
import { UsersTable } from "components/shared";

export function UsersClientSection() {
  const { data: users = [] } = useUsersQuery();
  const createUser = useCreateUser();
  const deleteUser = useDeleteUser();

  return (
    <div className="border rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">👥 Users ({users.length})</h2>

      <UserFormWithCustomField
        onSubmit={async (data) => {
          await createUser.mutateAsync(data);
        }}
        loading={createUser.isPending}
      />

      <UsersTable users={users} onDelete={(id) => deleteUser.mutate(id)} />
    </div>
  );
}
