import { ZodError } from 'zod';

export function normalizeError(error: unknown): string {
  if (error instanceof ZodError) {
    return error.issues.map(i => i.message).join(', ');
  }

  if (typeof error === 'string') {
    return error;
  }

  if (error && typeof error === 'object') {
    if ('message' in error && typeof error.message === 'string') {
      return error.message;
    }
    return JSON.stringify(error);
  }

  return 'Unknown error';
}
