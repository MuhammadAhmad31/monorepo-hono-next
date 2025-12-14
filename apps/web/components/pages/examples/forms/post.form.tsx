'use client';

import { useEffect, useState } from 'react';
import { GlobalForm } from '../../../global/Form';
import type { CreatePostInput, User } from 'shared/types';
import { createPostSchema } from 'shared/schemas';

interface PostFormProps {
  users: User[];
  onSubmit: (data: CreatePostInput) => Promise<void>;
  loading: boolean;
  submitLabel?: string;
  initialData?: Partial<CreatePostInput>;
}

export const PostForm = ({
  users,
  onSubmit,
  loading,
  submitLabel = 'Create Post',
  initialData,
}: PostFormProps) => {
  const [selectedUserId, setSelectedUserId] = useState<string>(
    initialData?.userId || (users.length > 0 ? users[0]!.id : '')
  );

  useEffect(() => {
    if (users.length > 0 && !selectedUserId) {
      setSelectedUserId(users[0]!.id);
    }
  }, [users, selectedUserId]);

  return (
    <GlobalForm<CreatePostInput>
      fields={[
        {
          name: 'userId',
          label: 'Author',
          type: 'select',
          defaultValue: selectedUserId,
          options: users.map((user) => ({
            value: user.id,
            label: `${user.name} (${user.email})`,
          })),
          placeholder: users.length === 0 ? 'Create a user first' : 'Select author',
        },
        {
          name: 'title',
          label: 'Title',
          placeholder: 'Post Title',
          type: 'text',
        },
        {
          name: 'content',
          label: 'Content',
          placeholder: 'Post Content',
          type: 'textarea',
          rows: 6,
        },
        {
          name: 'published',
          label: 'Published',
          defaultValue: undefined,
          customRender: (fieldApi) => {
            const hasError = fieldApi.state.meta.errors.length > 0;
            return (
              <>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="published"
                    checked={fieldApi.state.value}
                    onChange={(e) => fieldApi.handleChange(e.target.checked)}
                    onBlur={fieldApi.handleBlur}
                    disabled={loading}
                    className="w-4 h-4 text-gray-700 rounded focus:ring-gray-500 dark:bg-gray-800 dark:border-gray-600"
                  />
                  <label
                    htmlFor="published"
                    className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                  >
                    Publish immediately
                  </label>
                </div>
                {hasError && (
                  <p className="text-red-500 text-sm mt-1">
                    {typeof fieldApi.state.meta.errors[0] === 'string'
                      ? fieldApi.state.meta.errors[0]
                      : String(fieldApi.state.meta.errors[0])}
                  </p>
                )}
              </>
            );
          },
        },
      ]}
      schema={createPostSchema}
      onSubmit={onSubmit}
      loading={loading || users.length === 0}
      submitLabel={submitLabel}
      initialData={initialData}
      resetOnSubmit={true}
      className="mb-6"
    />
  );
};