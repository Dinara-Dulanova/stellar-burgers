import { combineReducers } from 'redux';
import { ingredientsReducer } from './slices/ingredients';
import constructorBurger from './slices/constructor';
import { ordersReducer } from './slices/orders';
import { feedsReducer } from './slices/feeds';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorBurger: constructorBurger,
  order: ordersReducer,
  feed: feedsReducer
});

export default rootReducer;
