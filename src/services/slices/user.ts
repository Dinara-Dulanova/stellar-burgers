import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TUser } from '@utils-types';
import {
  getOrdersApi,
  getUserApi,
  loginUserApi,
  registerUserApi,
  TLoginData,
  TRegisterData
} from '@api';
import { fetchOrders } from './orders';
import { getCookie, setCookie } from '../../utils/cookie';

type TUserState = {
  // userData: TUser | null;
  // status: RequestStatus;
  // isAuthChecked: boolean, // флаг для статуса проверки токена пользователя
  userData: TUser | null;
  loginUserError: string | undefined;
  status: RequestStatus;
};

const initialState: TUserState = {
  // userData: null,
  // status: RequestStatus.Idle
  userData: null,
  // isAuthChecked: false,
  loginUserError: undefined,
  status: RequestStatus.Idle
};

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => {
    console.log(data);
    const response = await registerUserApi(data);
    console.log(response);
    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);
    return response;
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData) => {
    console.log(data);
    const response = await loginUserApi(data);
    console.log(response);
    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);
    return response;
  }
);

//авточек юзера для перезегрузки
export const getUser = createAsyncThunk(
  'user/getUser',
  async (_, { dispatch }) => {
    console.log('GET USER');
    if (getCookie('accessToken')) {
      getUserApi()
        .then((res) => {
          console.log('RES');
          console.log(res);
          dispatch(fillUserData(res.user));
        })
        .catch((error) => {
          console.log('ERROR');
          console.log(error);
        });
    } else {
      console.log('no auth');
    }
    // const userData = await getUserApi();
    // return userData;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fillUserData: (state, action) => {
      state.userData = action.payload;
      state.status = RequestStatus.Succes;
    }
  }, //проаерка авторизации, разлогиниться, что-то непонятное с чек
  extraReducers: (builder) => {
    builder
      //register
      .addCase(registerUser.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = RequestStatus.Succes;
        state.userData = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
      })
      //login
      .addCase(loginUser.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.loginUserError = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.status = RequestStatus.Succes;
        state.loginUserError = '';
      });
    //авточек
    // .addCase(getUser.pending, (state) => {
    //   state.status = RequestStatus.Loading;
    // })
    // .addCase(getUser.fulfilled, (state, action) => {
    //   state.status = RequestStatus.Succes;
    //   state.userData = action.payload;
    // })
    // .addCase(getUser.rejected, (state, action) => {
    //   state.status = RequestStatus.Failed;
    // });
  }
});

export const userReducer = userSlice.reducer;
export const { fillUserData } = userSlice.actions;
