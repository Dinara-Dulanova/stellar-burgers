import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
// import { useDispatch, useSelector, useStore } from 'react-redux';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

// const rootReducer = () => {}; // Заменить на импорт настоящего редьюсера

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

// export type AppState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export const useAppSelector = useSelector.withTypes<AppState>();
// export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
// export const useAppStore = useStore.withTypes<typeof store>();

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
