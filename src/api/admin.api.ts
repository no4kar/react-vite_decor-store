import { getClient } from '../utils/axios.client';
import env from '../helpers/varsFromEnv';
import { TyProduct } from '../types/Products/Products';
import { accessTokenApi } from './accessToken.api';
import { TyService } from '../types/Services/Services';

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
  login: async ({
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
    return client.post('/admin/products/new', newProduct);
  },

  editProduct: ({
    id,
    ...restProductProps
  }: TyProduct
  ) => {
    return client.post(`/admin/products/update/${id}`, restProductProps);
  },

  removeProduct: (
    id: TyProduct['id']
  ) => {
    return client.delete(`/admin/products/delete/${id}`);
  },

  removeService: (
    id: TyService['id']
  ) => {
    return client.delete(`/admin/offers/delete/${id}`);
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
