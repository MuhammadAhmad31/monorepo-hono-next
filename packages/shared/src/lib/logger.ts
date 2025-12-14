import { ZodError } from 'zod';

type LogLevel = 'info' | 'warn' | 'error';

export function log(
  level: LogLevel,
  message: string,
  data?: unknown
) {
  if (process.env.NODE_ENV === 'production') {
    // nanti bisa kirim ke winston / sentry
    return;
  }

  const prefix = `[${level.toUpperCase()}]`;

  if (data instanceof ZodError) {
    console[level](prefix, message);
    console.dir(data.issues, { depth: null });
    return;
  }

  if (typeof data === 'object') {
    console[level](prefix, message);
    console.dir(data, { depth: null });
    return;
  }

  console[level](prefix, message, data);
}
