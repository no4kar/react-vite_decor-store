import { TyInfo } from '../types/Info';

export const formVersionData: {
  order: TyInfo;
  consultation: TyInfo;
  sendMessage: TyInfo;
} = {
  order: {
    title: 'Оформлення замовлення',
    description: 'Заповніть ваші контактні дані',
  },
  consultation: {
    title: 'Замовити консультацію',
    description: 'Заповніть форму і ми зв’яжемося з вами найближчим часом',
  },
  sendMessage: {
    title: 'Або напишіть нам',
    description: '',
  },
};
