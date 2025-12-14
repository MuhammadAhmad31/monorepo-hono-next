'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreatePostInput, Post } from 'shared/types';
import { api } from '@/lib/api';

export const usePostsQuery = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async (): Promise<Post[]> => {
      const response = await api.posts.getAll();
      if (response.status === 'success') {
        return response.data;
      }
      throw new Error(response.message);
    },
  });
}

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: CreatePostInput) => {
      const response = await api.posts.create(data);
      if (response.status === 'success') {
        return response.data;
      }
      throw new Error(response.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.posts.delete(id);
      if (response.status !== 'success') {
        throw new Error(response.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}