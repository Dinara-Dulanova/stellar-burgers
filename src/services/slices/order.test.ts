import { ordersReducer, fetchOrders, createOrder, clearOrder } from './orders';
import { RequestStatus, TOrder, TOrdersData } from '../../utils/types';

describe('orders reducer', () => {
  const initialState = {
    orders: [],
    status: RequestStatus.Idle,
    orderRequest: false,
    orderModalData: null
  };

  // Test fetchOrders (получаю свои заказы)
  describe('fetchOrders', () => {
    test('test fetchOrders.pending', () => {
      const state = ordersReducer(initialState, fetchOrders.pending(RequestStatus.Loading));
      expect(state).toEqual({
        ...initialState,
        status: RequestStatus.Loading,
      });
    });

    test('test fetchOrders.fulfilled', () => {
      const mockOrders = [
        {
          _id: '1',
          ingredients: [],
          owner: {
            email: "test@mail.com",
            name: "test"
          },
          status: 'done',
          name: 'test order',
          createdAt: '2024-09-01',
          updatedAt: '2024-09-01',
          number: 1,
          price: 2323
        },
      ];
      const state = ordersReducer(initialState, fetchOrders.fulfilled(mockOrders, ''));
      expect(state).toEqual({
        orders: mockOrders,
        status: RequestStatus.Succes,
        orderRequest: false,
        orderModalData: null,
      });
    });

    test('test fetchOrders.rejected', () => {
      const mockError = new Error('Error');
      const state = ordersReducer(initialState, fetchOrders.rejected(mockError, ''));
      expect(state).toEqual({
        ...initialState,
        status: RequestStatus.Failed,
      });
    });
  });

  // Test createOrder (отправляю свой заказ)
  describe('createOrder', () => {
    test('test createOrder.pending', () => {
      const state = ordersReducer(initialState, createOrder.pending(RequestStatus.Loading, []));
      expect(state).toEqual({
        ...initialState,
        status: RequestStatus.Loading,
        orderRequest: true,
      });
    });

    test('test createOrder.fulfilled', () => {
      const mockOrder: TOrder =
        {
          _id: '1',
          status: 'done',
          name: 'test order',
          createdAt: '2024-09-01',
          updatedAt: '2024-09-01',
          number: 1,
          ingredients: [],
        };
      const state = ordersReducer(initialState, createOrder.fulfilled(mockOrder, '', []));
      expect(state).toEqual({
        ...initialState,
        status: RequestStatus.Succes,
        orderRequest: false,
        orderModalData: mockOrder,
      });
    });

    test('test createOrder.rejected', () => {
      const mockError = new Error('Error');
      const state = ordersReducer(initialState, createOrder.rejected(mockError, '', []));
      expect(state).toEqual({
        ...initialState,
        status: RequestStatus.Failed,
      });
    });
  });

  test('test clearOrder reducer', () => {
    const mockOrder: TOrder =
      {
        _id: '1',
        status: 'done',
        name: 'test order',
        createdAt: '2024-09-01',
        updatedAt: '2024-09-01',
        number: 1,
        ingredients: [],
      };
    const state = ordersReducer({
      ...initialState,
      orderRequest: true,
      orderModalData: mockOrder
    }, clearOrder());
    expect(state).toEqual({
      ...initialState,
      orderRequest: false,
      orderModalData: null,
    });
  })
});
