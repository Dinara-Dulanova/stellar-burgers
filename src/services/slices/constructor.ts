import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient, TConstructorIngredient } from '../../utils/types';
import { ingredientsReducer } from './ingredients';
import { v4 as uuidv4 } from 'uuid';

type ConstructorState = {
  ingredients: TConstructorIngredient[];
  bun: TConstructorIngredient | null;
};

// Инициальное состояние
const initialState: ConstructorState = {
  ingredients: [],
  bun: null
};

export const addConstructorItem = (ingredient: TIngredient) => ({
  type: 'constructor/addConstructorItem',
  payload: { ...ingredient, uniqueId: uuidv4() }
});

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
    clearConstructorItems: (state) => {
      state.bun = initialState.bun;
      state.ingredients = initialState.ingredients;
    }
  }
});

export default constructorSlice.reducer;
// export const addConstructorItem = constructorSlice.actions.addConstructorItem;
export const moveConstructorItemUP =
  constructorSlice.actions.moveConstructorItemUP;
export const moveConstructorItemDown =
  constructorSlice.actions.moveConstructorItemDown;
export const deleteConstructorItem =
  constructorSlice.actions.deleteConstructorItem;
export const clearConstructorItems =
  constructorSlice.actions.clearConstructorItems;
