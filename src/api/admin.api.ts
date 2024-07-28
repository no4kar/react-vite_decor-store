import { AxiosResponse } from 'axios';
import { getClient } from '../utils/axios.client';
import env from '../helpers/varsFromEnv';
import { accessTokenApi } from './accessToken.api';
import { TyProduct } from '../types/Product';
import { TyService } from '../types/Service';
import { TyOrder } from '../types/Orders';

const client = getClient({
  baseURL: `${env.API_URL}/admin`,
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
    return client.post<{ token: string }>('/login', { email, password })
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
    newProduct: Omit<TyProduct.Item, 'id'>
  ): Promise<AxiosResponse<T>> => {
    return client.post('/products/new', newProduct);
  },

  editProduct: <T>({
    id,
    ...restProductProps
  }: TyProduct.Item
  ): Promise<AxiosResponse<T>> => {
    return client.post(`/products/update/${id}`, restProductProps);
  },

  removeProduct: (
    id: TyProduct.Item['id']
  ) => {
    return client.delete(`/products/delete/${id}`);
  },

  createService: <T>(
    newService: Omit<TyService.Item, 'id'>
  ): Promise<AxiosResponse<T>> => {
    return client.post('/offers/new', newService);
  },

  editService: <T>({
    id,
    ...restServiceProps
  }: TyService.Item
  ): Promise<AxiosResponse<T>> => {
    return client.post(`/offers/update/${id}`, restServiceProps);
  },

  removeService: (
    id: TyService.Item['id']
  ) => {
    return client.delete(`/offers/delete/${id}`);
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

    return client.get('/orders', { params });
  },

  // removeOrder: (
  //   id: TyOrder['id']
  // ) => {
  //   return client.delete(`/orders/delete/${id}`);
  // },
};
