import { feedsReducer, fetchFeeds } from './feeds';
import { RequestStatus, TOrdersData } from '../../utils/types';
import { errorFillUserData } from './user';

describe('feedsReducer', () => {
  const initialState = {
    feeds: { orders: [], total: 0, totalToday: 0 },
    status: RequestStatus.Idle,
  };

  test('test fetchFeeds.pending', () => {
    const state = feedsReducer(initialState, fetchFeeds.pending(RequestStatus.Loading));

    expect(state).toEqual({
      ...initialState,
      status: RequestStatus.Loading,
    });
  });

  test('test fetchFeeds.fulfilled', () => {
    const mockFeedsData = {
      orders: [
        {
          _id: '1',
          number: 123,
          createdAt: '2023-03-28T10:00:00.000Z',
          updatedAt: '2023-03-28T10:00:00.000Z',
          ingredients: ['bun', 'main'],
          status: 'done',
          name: 'test burger',
        },
      ],
      success: true,
      total: 1,
      totalToday: 1,
    };
    const state = feedsReducer(initialState, fetchFeeds.fulfilled(mockFeedsData, 'undefined'));

    expect(state).toEqual({
      feeds: mockFeedsData,
      status: RequestStatus.Succes,
    });
  });

  test('test fetchFeeds.rejected', () => {
    const mockError = new Error('Ошибка получения данных');
    const state = feedsReducer(
      initialState,
      fetchFeeds.rejected(mockError, '')
    );

    expect(state).toEqual({
      ...initialState,
      status: RequestStatus.Failed,
    });
  });
});
