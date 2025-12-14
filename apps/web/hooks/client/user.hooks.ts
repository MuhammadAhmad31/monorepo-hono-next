'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateUserInput, User } from 'shared/types';
import { api } from '@/lib/api';

export const useUsersQuery = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async (): Promise<User[]> => {
      const response = await api.users.getAll();
      if (response.status === 'success') {
        return response.data;
      }
      throw new Error(response.message);
    },
  });
}

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: CreateUserInput) => {
      const response = await api.users.create(data);
      if (response.status === 'success') {
        return response.data;
      }
      throw new Error(response.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.users.delete(id);
      if (response.status !== 'success') {
        throw new Error(response.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}
