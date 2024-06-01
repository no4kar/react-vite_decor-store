type TyOrderItem = {
  id: number,
  productId: number,
  quantity: number,
  price: number,
};

export type TyOrder = {
  id: number,
  firstName: string,
  lastName: string,
  patronymic: string,
  shippingAddress: string,
  email: string,
  phoneNumber: string,
  status: string,
  comment: string,
  total: number,
  orderDate: string,
  orderItems: TyOrderItem[],
};

