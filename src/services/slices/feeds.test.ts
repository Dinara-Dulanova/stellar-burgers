import { feedsReducer, fetchFeeds, initialState } from './feeds';
import { RequestStatus } from '../../utils/types';

describe('feeds reducer', () => {
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
          createdAt: '2024-09-01',
          updatedAt: '2023-09-01',
          ingredients: [],
          status: 'done',
          name: 'test burger',
        },
      ],
      success: true,
      total: 1,
      totalToday: 1,
    };
    const state = feedsReducer(initialState, fetchFeeds.fulfilled(mockFeedsData, ''));
    expect(state).toEqual({
      feeds: mockFeedsData,
      status: RequestStatus.Succes,
    });
  });

  test('test fetchFeeds.rejected', () => {
    const mockError = new Error('Error');
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
