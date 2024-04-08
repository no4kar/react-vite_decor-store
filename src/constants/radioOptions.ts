import { PayOption, DeliveryOption } from '../types/MyForm';

export const delivery: DeliveryOption[] = [
  { id: 1, value: 'Нова Пошта' },
  { id: 2, value: 'Укрпошта' },
  { id: 3, value: 'Самовивіз' },
  { id: 4, value: 'Кур`єрська доставка' },
];

export const payOption: PayOption[] = [
  { id: 1, value: 'Попередня оплата' },
  { id: 2, value: 'Оплата при отриманні' },
];
