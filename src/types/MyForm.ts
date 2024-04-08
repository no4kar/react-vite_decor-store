export interface DeliveryOption {
  id: number;
  value: string;
}

export interface PayOption {
  id: number;
  value: string;
}

export interface MyForm {
  firstName: string;
  phoneNumber: string;
  email: string;
  message: string;
  lastName: string;
  middleName?: string;
  comment: string;
  agreement: boolean;
  city: string;
  delivery: DeliveryOption[];
  payOption: PayOption[];
}
