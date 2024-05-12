import { getClient } from '../utils/axios.client';
import env from '../helpers/varsFromEnv';

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

type TyFeedback = {
  name: string;
  email: string;
  comment: string;
};

export const formApi = {
  createOrder: (
    newOrder: TyOrder,
  ) => {
    return client.post('/v1/orders', newOrder);
  },

  sendFeedback: (feedback: TyFeedback,
  ) => {
    return client.post('/v1/feedback', feedback,);
  },

};
