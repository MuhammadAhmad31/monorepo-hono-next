'use client';

import type { CreateUserInput } from 'shared/types';
import { GlobalForm } from '../../../global/Form';
import { createUserSchema } from 'shared/schemas';

interface UserFormProps {
  onSubmit: (data: CreateUserInput) => Promise<void>;
  loading: boolean;
  submitLabel?: string;
  initialData?: Partial<CreateUserInput>;
}

export const UserForm = ({
  onSubmit,
  loading,
  submitLabel = 'Add User',
  initialData,
}: UserFormProps) => {
  return (
    <GlobalForm<CreateUserInput>
      fields={[
        {
          name: 'name',
          label: 'Name',
          placeholder: 'Enter your name',
          type: 'text',
        },
        {
          name: 'email',
          label: 'Email',
          placeholder: 'Enter your email',
          type: 'email',
        },
      ]}
      schema={createUserSchema}
      onSubmit={onSubmit}
      loading={loading}
      submitLabel={submitLabel}
      initialData={initialData}
      resetOnSubmit={true}
      className="mb-6"
    />
  );
};

export const UserFormWithCustomField = ({
  onSubmit,
  loading,
}: UserFormProps) => {
  return (
    <GlobalForm<CreateUserInput>
      fields={[
        {
          name: 'name',
          label: 'Name',
          placeholder: 'Enter your name',
          type: 'text',
          className: 'space-y-2 mb-4',
          inputClassName: 'border-2 border-blue-500',
        },
        {
          name: 'email',
          label: 'Email Address',
          customRender: (fieldApi) => {
            const hasError = fieldApi.state.meta.errors.length > 0;
            return (
              <>
                <label className="block text-sm font-bold text-blue-600">
                  📧 {fieldApi.name.toUpperCase()}
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={fieldApi.state.value}
                    onChange={(e) => fieldApi.handleChange(e.target.value)}
                    onBlur={fieldApi.handleBlur}
                    className={`w-full pl-10 p-3 border-2 rounded-lg ${
                      hasError ? 'border-red-500' : 'border-blue-500'
                    }`}
                    placeholder="your@email.com"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">
                    ✉️
                  </span>
                </div>
                {hasError && (
                  <p className="text-red-500 text-sm">
                    {fieldApi.state.meta.errors[0]}
                  </p>
                )}
              </>
            );
          },
        },
      ]}
      schema={createUserSchema}
      onSubmit={onSubmit}
      loading={loading}
      renderSubmitButton={({ loading, isSubmitting, submitLabel }) => (
        <button
          type="submit"
          disabled={loading || isSubmitting}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold 
            hover:bg-blue-700 disabled:opacity-50 transition-all"
        >
          {loading || isSubmitting ? '⏳ Processing...' : `🚀 ${submitLabel}`}
        </button>
      )}
    />
  );
};