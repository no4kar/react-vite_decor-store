import { TyInCartItem, useCartStore } from '../../store/cart.store';
import { Counter } from '../Counter';

export const CustomInputNumber = ({
  item
}: {
  item: TyInCartItem;
}) => {
  const { increase, decrease } = useCartStore.getState();

  return (
    <Counter
      quantity={item.quantity}
      onIncrease={() => increase(item)}
      onDecrease={() => decrease(item)}
    />
  );
};
