"use server";

import { revalidatePath } from 'next/cache';
import { api } from '@/lib/api';
import type { CreateUserInput } from 'shared/types';
import { log, normalizeError } from 'shared/lib';

export async function getUserAllAction() {
  try {
    const response = await api.users.getAll();

    if (response.status === 'success') {
      return { success: true, data: response.data };
    }

    log('warn', 'Get all users failed', response);

    return {
      success: false,
      error: normalizeError(response.errors ?? response.message),
    };
  } catch (error) {
    log('error', 'getUserAllAction crashed', error);

    return {
      success: false,
      error: normalizeError(error),
    };
  }
}

export async function createUserAction(data: CreateUserInput) {
  try {
    const response = await api.users.create(data);

    if (response.status === 'success') {
      revalidatePath('/example/server');
      return { success: true, data: response.data };
    }

    log('warn', 'Create user failed', response);

    return {
      success: false,
      error: normalizeError(response.errors ?? response.message),
    };
  } catch (error) {
    log('error', 'createUserAction crashed', error);

    return {
      success: false,
      error: normalizeError(error),
    };
  }
}

export async function deleteUserAction(id: string) {
  try {
    const response = await api.users.delete(id);

    if (response.status === 'success') {
      revalidatePath('/example/server');
      return { success: true };
    }

    log('warn', 'Delete user failed', response);

    return {
      success: false,
      error: normalizeError(response.errors ?? response.message),
    };
  } catch (error) {
    log('error', 'deleteUserAction crashed', error);

    return {
      success: false,
      error: normalizeError(error),
    };
  }
}
