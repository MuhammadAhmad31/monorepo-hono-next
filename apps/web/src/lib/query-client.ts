import { QueryClient } from '@tanstack/react-query';
import { tanstackConfig } from 'config/tanstack.config';

let browserQueryClient: QueryClient | undefined = undefined;

export const getQueryClient = () => {
  if (typeof window === 'undefined') {
    return new QueryClient(tanstackConfig.query);
  } else {
    if (!browserQueryClient) browserQueryClient = new QueryClient(tanstackConfig.query);
    return browserQueryClient;
  }
}