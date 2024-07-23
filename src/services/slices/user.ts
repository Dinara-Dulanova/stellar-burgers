import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TUser } from '@utils-types';
import {
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { fetchOrders } from './orders';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';

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
    const response = await registerUserApi(data);
    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);
    return response;
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (user: Partial<TRegisterData>) => {
    const response = await updateUserApi(user);
    console.log(response);
    return response;
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);
    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);
    return response;
  }
);

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  const response = await logoutApi();
  localStorage.removeItem('refreshToken');
  deleteCookie('accessToken');
  // localStorage.setItem('refreshToken', response.refreshToken);// setCookie('accessToken', response.accessToken);
  return response;
});

//авточек юзера для перезегрузки
export const getUser = createAsyncThunk(
  'user/getUser',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      getUserApi()
        .then((res) => {
          dispatch(fillUserData(res.user));
        })
        .catch((error) => {
          dispatch(errorFillUserData());
        });
    } else {
      dispatch(errorFillUserData());
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fillUserData: (state, action) => {
      state.userData = action.payload;
      state.status = RequestStatus.Succes;
    },
    errorFillUserData: (state) => {
      state.status = RequestStatus.Failed;
    }
  },
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
      })
      //logout
      .addCase(logoutUser.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.loginUserError = action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.userData = null;
        state.status = RequestStatus.Idle;
        state.loginUserError = '';
      })
      //update
      .addCase(updateUser.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.loginUserError = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.status = RequestStatus.Succes;
        state.loginUserError = '';
      });
  }
});

export const userReducer = userSlice.reducer;
export const { fillUserData, errorFillUserData } = userSlice.actions;
