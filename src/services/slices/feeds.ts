import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getFeedsApi,
  getIngredientsApi,
  getOrdersApi
} from '../../utils/burger-api';
import { TOrder, RequestStatus, TOrdersData } from '../../utils/types';

type FeedState = {
  feeds: TOrdersData;
  status: RequestStatus;
};

const initialState: FeedState = {
  feeds: { orders: [], total: 0, totalToday: 0 },
  status: RequestStatus.Idle
};

export const fetchFeeds = createAsyncThunk('feeds/feeds', getFeedsApi);

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.status = RequestStatus.Succes;
        state.feeds = action.payload;
      })
      .addCase(fetchFeeds.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  }
});

export const feedsReducer = feedsSlice.reducer;
