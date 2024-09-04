import { ingredientsReducer } from './slices/ingredients';
import constructorBurger from './slices/constructor';
import { ordersReducer } from './slices/orders';
import { feedsReducer } from './slices/feeds';
import { userReducer } from './slices/user';
import rootReducer from './rootReducer';
import { combineReducers } from 'redux';

describe('rootReducer', () => {
  test('should combine all reducers', () => {
    const initAction = {type: '@@INIT'};
    const state = rootReducer(undefined, initAction);
    expect(state).toEqual({
      ingredients: ingredientsReducer(undefined, initAction),
      constructorBurger: constructorBurger(undefined, initAction),
      order: ordersReducer(undefined, initAction),
      feed: feedsReducer(undefined, initAction),
      user: userReducer(undefined, initAction),
    })
  });
});
