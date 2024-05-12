import { getClient } from '../utils/axios.client';
import env from '../helpers/varsFromEnv';
import { TyProduct } from '../types/Products/Products';
import { accessTokenApi } from './accessToken.api';

const client = getClient({
  baseURL: env.API_URL,
  // withCredentials: true,
});

client.interceptors.request.use((req) => {
  const accessToken = accessTokenApi.get();

  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }

  return req;
});

// client.interceptors.response.use(res => res.data);


export const adminApi = {
  login: ({
    email,
    password,
  }: {
    email: string,
    password: string,
  }): Promise<boolean> => {
    return client.post<{ token: string }>('/admin/login', { email, password })
      .then(res => {
        accessTokenApi.save(res.data.token);

        return true;
      })
      .catch(err => {
        accessTokenApi.remove();
        console.error(err);

        return err;
      });
  },

  createProduct: (
    newProduct: Omit<TyProduct, 'id'>
  ) => {
    return client.post('/admin/product/new', newProduct);
  },

  getOrders: ({
    page = 0,
    size = 1,
  }: {
    page: number,
    size: number,
  }) => {
    return client.get(`/admin/orders?page=${page}&size=${size}`);
  },

};
