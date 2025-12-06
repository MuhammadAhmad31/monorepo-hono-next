export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

export type CreateUserInput = {
  name: string;
  email: string;
};

export type UpdateUserInput = {
  name?: string;
  email?: string;
};

export type UsersResponse =
  | { success: true; users: User[] }
  | { success: false; error: string };

export type UserResponse =
  | { success: true; user: User }
  | { success: false; error: string };
