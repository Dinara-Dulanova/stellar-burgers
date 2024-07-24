import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi, orderBurgerApi } from '../../utils/burger-api';
import { TOrder, RequestStatus } from '../../utils/types';

//тут моя лента заказов и оформление заказа
type TOrderState = {
  orders: TOrder[];
  status: RequestStatus;
  orderRequest: boolean;
  orderModalData: TOrder | null;
};

const initialState: TOrderState = {
  orders: [],
  status: RequestStatus.Idle,
  orderRequest: false,
  orderModalData: null
};

export const fetchOrders = createAsyncThunk('orders/orders', async () => {
  console.log('fetchOrders');
  return await getOrdersApi();
});

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (data: string[]) => {
    console.log('createOrder');
    console.log(data);
    return await orderBurgerApi(data);
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrder: (state, action) => {
      state.orderRequest = false;
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      //получаю свои заказы
      .addCase(fetchOrders.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = RequestStatus.Succes;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      //отправляю свой заказ
      .addCase(createOrder.pending, (state) => {
        state.status = RequestStatus.Loading;
        state.orderRequest = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = RequestStatus.Succes;
        state.orderRequest = false;
        // @ts-ignore
        state.orderModalData = action.payload;
      })
      .addCase(createOrder.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  }
});

export const ordersReducer = orderSlice.reducer;

export const { clearOrder } = orderSlice.actions;
