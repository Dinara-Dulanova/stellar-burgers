import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi, getOrdersApi } from '../../utils/burger-api';
import { TOrder, RequestStatus } from '../../utils/types';

type TOrderState = {
  orders: TOrder[];
  status: RequestStatus;
};

const initialState: TOrderState = {
  orders: [],
  status: RequestStatus.Idle
};

export const fetchOrders = createAsyncThunk(
  'orders/orders',
  async () => await getOrdersApi()
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = RequestStatus.Succes;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  }
});

export const ordersReducer = orderSlice.reducer;
