import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient, RequestStatus } from '../../utils/types';

type IngredientsState = {
  ingredients: TIngredient[];
  status: RequestStatus;
};

const initialState: IngredientsState = {
  ingredients: [],
  status: RequestStatus.Idle
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/ingredients',
  async () => await getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.status = RequestStatus.Succes;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  }
});

export const ingredientsReducer = ingredientsSlice.reducer;
