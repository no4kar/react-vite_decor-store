import { AxiosResponse } from 'axios';
import { getClient } from '../utils/axios.client';
import env from '../helpers/varsFromEnv';
import { accessTokenApi } from './accessToken.api';
import { TyProduct } from '../types/Products';
import { TyService } from '../types/Services';
import { TyOrder } from '../types/Orders';

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

        return false;
      });
  },

  createProduct: <T>(
    newProduct: Omit<TyProduct, 'id'>
  ): Promise<AxiosResponse<T>> => {
    return client.post('/admin/products/new', newProduct);
  },

  editProduct: <T>({
    id,
    ...restProductProps
  }: TyProduct
  ): Promise<AxiosResponse<T>> => {
    return client.post(`/admin/products/update/${id}`, restProductProps);
  },

  removeProduct: (
    id: TyProduct['id']
  ) => {
    return client.delete(`/admin/products/delete/${id}`);
  },

  createService: <T>(
    newService: Omit<TyService, 'id'>
  ): Promise<AxiosResponse<T>> => {
    return client.post('/admin/offers/new', newService);
  },

  editService: <T>({
    id,
    ...restServiceProps
  }: TyService
  ): Promise<AxiosResponse<T>> => {
    return client.post(`/admin/offers/update/${id}`, restServiceProps);
  },

  removeService: (
    id: TyService['id']
  ) => {
    return client.delete(`/admin/offers/delete/${id}`);
  },

  getOrders: ({
    page = 0,
    size = 100,
  }: {
    page?: number,
    size?: number,
  } = {},
  ): Promise<AxiosResponse<TyOrder[]>> => {

    const params: {
      page: string;
      size?: string
    } = {
      page: String(page),
    };

    if (size && size > 0) {
      params.size = String(size);
    }

    return client.get('/admin/orders', { params });
  },

};
