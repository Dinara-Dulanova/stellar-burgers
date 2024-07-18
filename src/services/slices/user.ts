import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TUser } from '@utils-types';
import { getOrdersApi, registerUserApi, TRegisterData } from '@api';
import { fetchOrders } from './orders';

type TUserState = {
  userData: TUser | null;
  status: RequestStatus;
};

const initialState: TUserState = {
  userData: null,
  status: RequestStatus.Idle
};

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => {
    console.log(data);
    const response = await registerUserApi(data);
    return response;
    // async ({ email, name, password }: TRegisterData) => {
    //   console.log('{ name, email, password }');
    //   console.log({ name, email, password });
    //   const userData = await registerUserApi({ email, name, password });
    //   console.log(userData);
    //   return userData;
  }
  // async () => await registerUserApi()
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Обработка запроса
      .addCase(registerUser.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      // Обработка успешного ответа
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = RequestStatus.Succes;
        state.userData = action.payload.user;
      })
      // Обработка ошибки
      .addCase(registerUser.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
      });
  }
});

export const userReducer = userSlice.reducer;
