import { getClient } from '../utils/axios.client';
import env from '../helpers/varsFromEnv';
import { MyForm } from '../types/MyForm';

const client = getClient({
  baseURL: env.API_URL,
});

type TyOrder = {
  orderItems: {
    productId: number;
    quantity: number;
  }[],
  firstName: string;
  lastName: string;
  patronymic: string;
  shippingAddress: string;
  email: string;
  phoneNumber: string;
  comment: string;
};

export const formApi = {
  createOrder: (
    newOrder: TyOrder,
  ) => {
    return client.post('/v1/orders', newOrder);
  },

  sendForm: (
    forms: MyForm,
  ) => {
    return client.post<Comment>('/posts', forms);
  },

};
