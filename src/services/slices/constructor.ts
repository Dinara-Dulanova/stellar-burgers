import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient, TConstructorIngredient } from '../../utils/types';
import { ingredientsReducer } from './ingredients';

type ConstructorState = {
  ingredients: TConstructorIngredient[];
  bun: TConstructorIngredient | null;
};

// Инициальное состояние
const initialState: ConstructorState = {
  ingredients: [],
  bun: null
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addConstructorItem: (state, action) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push(action.payload);
      }
    },
    moveConstructorItemUP: (state, action) => {
      [
        state.ingredients[action.payload],
        state.ingredients[action.payload - 1]
      ] = [
        state.ingredients[action.payload - 1],
        state.ingredients[action.payload]
      ];
    },
    moveConstructorItemDown: (state, action) => {
      [
        state.ingredients[action.payload],
        state.ingredients[action.payload + 1]
      ] = [
        state.ingredients[action.payload + 1],
        state.ingredients[action.payload]
      ];
    },
    deleteConstructorItem: (state, action) => {
      if (action.payload.type !== 'bun') {
        state.ingredients.splice(action.payload, 1);
      }
    },
    clearConstructorItems: (state, action) => {
      //при успешном оформлении заказа чистим корзину
      state = initialState;
    }
  }
});

export default constructorSlice.reducer;
export const addConstructorItem = constructorSlice.actions.addConstructorItem;
export const moveConstructorItemUP =
  constructorSlice.actions.moveConstructorItemUP;
export const moveConstructorItemDown =
  constructorSlice.actions.moveConstructorItemDown;
export const deleteConstructorItem =
  constructorSlice.actions.deleteConstructorItem;
export const clearConstructorItems =
  constructorSlice.actions.clearConstructorItems;
