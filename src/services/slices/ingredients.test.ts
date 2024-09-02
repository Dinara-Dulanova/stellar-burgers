import { ingredientsReducer, fetchIngredients } from './ingredients';
import { RequestStatus } from '../../utils/types';

describe('ingredients reducer', () => {
  const initialState = {
    ingredients: [],
    status: RequestStatus.Idle
  };

  test('test fetchIngredients.pending', () => {
    const state = ingredientsReducer(initialState, fetchIngredients.pending(RequestStatus.Loading));
    expect(state).toEqual({
      ...initialState,
      status: RequestStatus.Loading,
    });
  });

  test('test fetchIngredients.fulfilled', () => {
    const mockIngredients = [
      {
        _id: "1",
        name: "Ингредиент 1",
        type: "bun",
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: "https://code.s3.yandex.net/react/code/bun-02.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
        __v: 0
      },
      {
        _id: "2",
        name: "Ингредиент 2",
        type: "main",
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: "https://code.s3.yandex.net/react/code/bun-02.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
        __v: 0
      },
    ];
    const state = ingredientsReducer(initialState, fetchIngredients.fulfilled(mockIngredients, ''));
    expect(state).toEqual({
      ingredients: mockIngredients,
      status: RequestStatus.Succes,
    });
  })

  test('test fetchIngredients.rejected', () => {
    const mockError = new Error('Error');
    const state = ingredientsReducer(initialState, fetchIngredients.rejected(mockError, ''));
    expect(state).toEqual({
      ...initialState,
      status: RequestStatus.Failed,
    });
  });
})
