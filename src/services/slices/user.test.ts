import { userReducer, registerUser, loginUser, logoutUser, fillUserData, errorFillUserData, updateUser } from './user';
import { RequestStatus, TUser } from '../../utils/types';
import { TLoginData } from '@api';

let registerMockData = {
  email: 'test@mail.com',
  name: 'Test',
  password: ''
};

let loginMockData: TLoginData = {
  email: 'test@mail.com',
  password: '',
};

const mockUser: TUser = {
  email: 'test@mail.com',
  name: 'test',
};

describe('user reducer', () => {
  const initialState = {
    userData: null,
    loginUserError: undefined,
    status: RequestStatus.Idle,
  };

  // Test registerUser
  describe('registerUser', () => {
    test('test registerUser.pending', () => {
      const state = userReducer(initialState, registerUser.pending(RequestStatus.Loading, registerMockData));
      expect(state).toEqual({
        ...initialState,
        status: RequestStatus.Loading,
      });
    });

    test('test registerUser.fulfilled', () => {
      const mockResponse = {
        user: mockUser,
        refreshToken: 'refreshToken',
        accessToken: 'accessToken',
        success: true
      };
      const state = userReducer(initialState, registerUser.fulfilled(mockResponse, '', registerMockData));
      expect(state).toEqual({
        userData: mockUser,
        status: RequestStatus.Succes,
      });
    });

    test('test registerUser.rejected', () => {
      let errorMock = new Error('error');
      const state = userReducer(initialState, registerUser.rejected(errorMock, '', registerMockData));
      expect(state).toEqual({
        ...initialState,
        status: RequestStatus.Failed,
      });
    });
  });

  // Test loginUser
  describe('loginUser', () => {
    test('test loginUser.pending', () => {
      const state = userReducer(initialState, loginUser.pending(RequestStatus.Loading, registerMockData));
      expect(state).toEqual({
        ...initialState,
        status: RequestStatus.Loading,
      });
    });

    test('test loginUser.fulfilled', () => {

      const mockResponse = {
        user: mockUser,
        refreshToken: 'refreshToken',
        accessToken: 'accessToken',
        success: true
      };
      const state = userReducer(initialState, loginUser.fulfilled(mockResponse, '', loginMockData));
      expect(state).toEqual({
        userData: mockUser,
        status: RequestStatus.Succes,
        loginUserError: '',
      });
    });

    test('test loginUser.rejected', () => {
      const error = new Error('error');
      const state = userReducer(initialState, loginUser.rejected(error, '', loginMockData));
      expect(state).toEqual({
        ...initialState,
        status: RequestStatus.Failed,
        loginUserError: error.message,
      });
    });
  });

  // Test logoutUser
  describe('logoutUser', () => {

    test('test logoutUser.pending', () => {
      const state = userReducer(initialState, logoutUser.pending(RequestStatus.Loading));
      expect(state).toEqual({
        ...initialState,
        status: RequestStatus.Loading,
      });
    });

    test('test logoutUser.fulfilled', () => {
      const initialStateWithUser = {
        userData: mockUser,
        status: RequestStatus.Succes,
        loginUserError: '',
        success: true
      };
      const state = userReducer(initialState, logoutUser.fulfilled(initialStateWithUser, ''));
      expect(state).toEqual({
        ...initialState,
        userData: null,
        status: RequestStatus.Idle,
        loginUserError: ''
      });
    });

    test('test logoutUser.rejected', () => {
      const error = new Error('error');
      const state = userReducer(initialState, logoutUser.rejected(error, ''));
      expect(state).toEqual({
        ...initialState,
        status: RequestStatus.Failed,
        loginUserError: error.message,
      });
    });
  });

  // Test updateUser
  describe('updateUser', () => {
    test('test updateUser.pending', () => {
      const state = userReducer(initialState, updateUser.pending(RequestStatus.Loading, registerMockData));
      expect(state).toEqual({
        ...initialState,
        status: RequestStatus.Loading,
      });
    });

    test('test updateUser.fulfilled', () => {
      const mockUser: TUser = {
        email: 'test@example.com',
        name: 'Test User',
      };
      const mockResponse = {
        user: mockUser,
        success: true
      };
      const state = userReducer(initialState, updateUser.fulfilled(mockResponse, '', registerMockData));
      expect(state).toEqual({
        userData: mockUser,
        status: RequestStatus.Succes,
        loginUserError: '',
      });
    });

    test('test updateUser.rejected', () => {
      const error = new Error('error');
      const state = userReducer(initialState, updateUser.rejected(error, '', registerMockData));
      expect(state).toEqual({
        ...initialState,
        status: RequestStatus.Failed,
        loginUserError: error.message,
      });
    });
  });


  // Test fillUserData reducer
  test('test fillUserData reducer', () => {
    const state = userReducer(initialState, fillUserData(mockUser));
    expect(state).toEqual({
      userData: mockUser,
      status: RequestStatus.Succes,
      loginUserError: undefined,
    });
  });

  // Test errorFillUserData reducer
  test('test errorFillUserData reducer', () => {
    const state = userReducer(initialState, errorFillUserData());
    expect(state).toEqual({
      ...initialState,
      status: RequestStatus.Failed,
    });
  });
});
