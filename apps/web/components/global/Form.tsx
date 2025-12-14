'use client';

import { useForm } from '@tanstack/react-form';
import type { ZodSchema } from 'zod';
import { type ReactNode } from 'react';

/**
 * Configuration for a single form field
 */
interface FormField {
  /** Unique field name (required) - used as the key for form data */
  name: string;
  
  /** Optional label displayed above the input */
  label?: string;
  
  /** Placeholder text for the input */
  placeholder?: string;
  
  /** Input type - determines the HTML input element to render */
  type?: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select';
  
  /** Default value for the field */
  defaultValue?: string | number;
  
  /** Options for select type fields - array of value/label pairs */
  options?: Array<{ value: string | number; label: string }>;
  
  /** Number of rows for textarea type (default: 4) */
  rows?: number;
  
  /** 
   * Custom render function for complete control over field rendering.
   * Receives fieldApi with state, handlers (handleChange, handleBlur), and meta (errors).
   */
  customRender?: (fieldApi: any) => ReactNode;
  
  /** Custom className for the field wrapper div */
  className?: string;
  
  /** Custom className for the input element (merged with base styles) */
  inputClassName?: string;
}

/**
 * Props for GlobalForm component
 * @template T - Type of form data (must extend Record<string, any>)
 */
interface GlobalFormProps<T extends Record<string, any>> {
  /** Array of form field configurations */
  fields: FormField[];
  
  /** 
   * Submit handler - receives validated form data.
   * Can be async or sync function.
   */
  onSubmit: (data: T) => Promise<void> | void;
  
  /** Zod schema for form validation - validates on submit */
  schema: ZodSchema<T>;
  
  /** Text displayed on submit button (default: 'Submit') */
  submitLabel?: string;
  
  /** Loading state - disables all inputs and shows loading spinner on button */
  loading?: boolean;
  
  /** Initial form data - useful for edit forms */
  initialData?: Partial<T>;
  
  /** Custom className for the form element */
  className?: string;
  
  /** Whether to reset form after successful submit (default: true) */
  resetOnSubmit?: boolean;
  
  /** 
   * Custom submit button renderer.
   * Receives loading state, isSubmitting state, and submitLabel.
   * Useful for completely custom button designs.
   */
  renderSubmitButton?: (props: {
    loading: boolean;
    isSubmitting: boolean;
    submitLabel: string;
  }) => ReactNode;
}

/**
 * Global Form Component with TanStack Form and Zod validation
 * 
 * A reusable form component with built-in validation, error handling, and customization options.
 * Supports text, email, password, number, textarea, and select inputs out of the box.
 * 
 * Features:
 * - Automatic form state management via TanStack Form
 * - Zod schema validation on submit
 * - Built-in error display with animations
 * - Loading states with disabled inputs
 * - Dark mode support
 * - Fully customizable fields and submit button
 * - Type-safe with TypeScript generics
 * 
 * @template T - Type of form data
 */
export function GlobalForm<T extends Record<string, any>>({
  fields,
  onSubmit,
  schema,
  submitLabel = 'Submit',
  loading = false,
  initialData,
  className = '',
  resetOnSubmit = true,
  renderSubmitButton,
}: GlobalFormProps<T>) {
  const form = useForm({
    defaultValues: fields.reduce((acc, field) => {
      acc[field.name] = initialData?.[field.name] ?? field.defaultValue ?? '';
      return acc;
    }, {} as any),
    onSubmit: async ({ value }) => {
      await onSubmit(value as T);
      if (resetOnSubmit) {
        form.reset();
      }
    },
    validators: {
      onSubmit: schema,
    },
  });

  const renderField = (field: FormField) => {
    return (
      <form.Field
        key={field.name}
        name={field.name}
        children={(fieldApi) => {
          // If custom render is provided, use it
          if (field.customRender) {
            return (
              <div className={field.className || 'space-y-2'}>
                {field.customRender(fieldApi)}
              </div>
            );
          }

          const hasError = fieldApi.state.meta.errors.length > 0;
          const errorMessage = fieldApi.state.meta.errors[0];

          const baseInputClassName = `w-full p-3 border rounded-lg 
            dark:bg-gray-800 dark:border-gray-600 dark:text-white
            focus:ring-2 focus:ring-gray-400 focus:border-transparent
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-200
            ${hasError ? 'border-red-500 focus:ring-red-400' : 'border-gray-300'}
          `;

          const inputClassName = field.inputClassName 
            ? `${baseInputClassName} ${field.inputClassName}`
            : baseInputClassName;

          return (
            <div className={field.className || 'space-y-2'}>
              {field.label && (
                <label 
                  htmlFor={field.name}
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {field.label}
                </label>
              )}

              {field.type === 'textarea' ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={fieldApi.state.value as string}
                  onChange={(e) => fieldApi.handleChange(e.target.value)}
                  onBlur={fieldApi.handleBlur}
                  disabled={loading}
                  rows={field.rows || 4}
                  className={inputClassName}
                />
              ) : field.type === 'select' ? (
                <select
                  id={field.name}
                  name={field.name}
                  value={fieldApi.state.value as string}
                  onChange={(e) => fieldApi.handleChange(e.target.value)}
                  onBlur={fieldApi.handleBlur}
                  disabled={loading}
                  className={inputClassName}
                >
                  <option value="">{field.placeholder || 'Select...'}</option>
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type || 'text'}
                  placeholder={field.placeholder}
                  value={fieldApi.state.value as string}
                  onChange={(e) => fieldApi.handleChange(e.target.value)}
                  onBlur={fieldApi.handleBlur}
                  disabled={loading}
                  className={inputClassName}
                />
              )}

              {hasError && (
                <p className="text-red-500 text-sm mt-1 animate-in fade-in slide-in-from-top-1">
                  {typeof errorMessage === 'string' ? errorMessage : String(errorMessage)}
                </p>
              )}
            </div>
          );
        }}
      />
    );
  };

  const defaultSubmitButton = (
    <button
      type="submit"
      disabled={loading || form.state.isSubmitting}
      className="w-full bg-linear-to-r from-gray-700 to-gray-900 text-white px-6 py-3 rounded-lg 
        font-semibold shadow-lg hover:shadow-xl hover:from-gray-800 hover:to-black 
        transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
    >
      {loading || form.state.isSubmitting ? (
        <span className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Submitting...
        </span>
      ) : (
        submitLabel
      )}
    </button>
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className={`space-y-4 ${className}`}
    >
      {fields.map((field) => renderField(field))}

      {renderSubmitButton ? (
        renderSubmitButton({
          loading,
          isSubmitting: form.state.isSubmitting,
          submitLabel,
        })
      ) : (
        defaultSubmitButton
      )}
    </form>
  );
}