import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
});

// src/hooks/useUsers.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';

export function useUsers() {
  const queryClient = useQueryClient();

  const fetchUsers = () => api.get('/users').then(res => res.data);
  const { data, isLoading, error } = useQuery(['users'], fetchUsers);

  const createUser = useMutation(
    (newUser: any) => api.post('/users', newUser),
    {
      onSuccess: () => queryClient.invalidateQueries(['users']),
    }
  );

  const updateUser = useMutation(
    ({ id, user }: { id: number; user: any }) => api.put(`/users/${id}`, user),
    {
      onSuccess: () => queryClient.invalidateQueries(['users']),
    }
  );

  const deleteUser = useMutation(
    (id: number) => api.delete(`/users/${id}`),
    {
      onSuccess: () => queryClient.invalidateQueries(['users']),
    }
  );

  return {
    users: data,
    isLoading,
    error,
    createUser,
    updateUser,
    deleteUser,
  };
}
