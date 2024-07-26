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

export const fetchOrders = createAsyncThunk(
  'orders/orders',
  async () => await getOrdersApi()
);

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (data: string[]) => {
    const res = await orderBurgerApi(data);
    return res.order;
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrder: (state) => {
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
        state.orderModalData = action.payload;
      })
      .addCase(createOrder.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  }
});

export const ordersReducer = orderSlice.reducer;

export const { clearOrder } = orderSlice.actions;
