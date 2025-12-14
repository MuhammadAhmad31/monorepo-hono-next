"use server";

import { revalidatePath } from 'next/cache';
import { api } from '@/lib/api';
import type { CreatePostInput, UpdatePostInput } from 'shared/types';
import { log, normalizeError } from 'shared/lib';

export async function getAllPostsAction() {
  try {
    const response = await api.posts.getAll();

    if (response.status === 'success') {
      return { success: true, data: response.data };
    }

    log('warn', 'Get all posts failed', response);

    return {
      success: false,
      error: normalizeError(response.errors ?? response.message),
    };
  } catch (error) {
    log('error', 'getAllPostsAction crashed', error);

    return {
      success: false,
      error: normalizeError(error),
    };
  }
}

export async function createPostAction(data: CreatePostInput) {
  try {
    const response = await api.posts.create(data);

    if (response.status === 'success') {
      revalidatePath('/example/server');
      return { success: true, data: response.data };
    }

    log('warn', 'Create post failed', response);

    return {
      success: false,
      error: normalizeError(response.errors ?? response.message),
    };
  } catch (error) {
    log('error', 'createPostAction crashed', error);

    return {
      success: false,
      error: normalizeError(error),
    };
  }
}


export async function deletePostAction(id: string) {
  try {
    const response = await api.posts.delete(id);

    if (response.status === 'success') {
      revalidatePath('/example/server');
      return { success: true };
    }

    log('warn', 'Delete post failed', response);

    return {
      success: false,
      error: normalizeError(response.errors ?? response.message),
    };
  } catch (error) {
    log('error', 'deletePostAction crashed', error);

    return {
      success: false,
      error: normalizeError(error),
    };
  }
}

export async function updatePostAction(
  id: string,
  data: UpdatePostInput
) {
  try {
    const response = await api.posts.update(id, data);

    if (response.status === 'success') {
      revalidatePath('/example/server');
      return { success: true, data: response.data };
    }

    log('warn', 'Update post failed', response);

    return {
      success: false,
      error: normalizeError(response.errors ?? response.message),
    };
  } catch (error) {
    log('error', 'updatePostAction crashed', error);

    return {
      success: false,
      error: normalizeError(error),
    };
  }
}
