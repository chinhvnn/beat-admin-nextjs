import { TOKEN_KEY, axiosInstance } from '@/utils/axios';

export const login = async ({ email, password }: any) => {
  return await axiosInstance.post('auth/login', {
    email,
    password,
  });
};

export const getAuthUser = async () => {
  return await axiosInstance.get('admin/users/me');
};
