import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { clearOrder, createOrder } from '../../services/slices/orders';
import { clearConstructorItems } from '../../services/slices/constructor';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  // const constructorItems = {
  //   bun: {
  //     price: 0
  //   },
  //   ingredients: []
  // };

  const constructorItems = useSelector((state) => state.constructorBurger);
  const orderRequest = useSelector((state) => state.order.orderRequest);
  const orderModalData = useSelector((state) => state.order.orderModalData);
  const user = useSelector((store) => store.user);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user.userData) {
      navigate('/login');
    } else {
      const constructorItemsIds = constructorItems.ingredients.map(
        //айдишники только ингредиентов
        (item) => item._id
      );
      //добавим айдишники булок
      constructorItemsIds.push(constructorItems.bun._id);
      dispatch(createOrder(constructorItemsIds));
    }
  };
  const closeOrderModal = () => {
    dispatch(clearOrder());
    dispatch(clearConstructorItems());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  // return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
