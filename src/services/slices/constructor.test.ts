import constructorReducer, {
  addConstructorItem,
  moveConstructorItemUP,
  moveConstructorItemDown,
  deleteConstructorItem,
  initialState,
} from './constructor';

const ingredient1 = {
  _id: '1',
  name: 'Ингредиент 1',
  type: 'main',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0,
};

const ingredient2 = {
  _id: '2',
  name: 'Ингредиент 2',
  type: 'main',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0,
};

describe('constructor reducer', () => {
  test('add ingredient', () => {
    const newState = constructorReducer(initialState, addConstructorItem(ingredient1));
    expect(newState).toEqual({
      ingredients: [
        {
          ...ingredient1,
          uniqueId: expect.any(String),
        },
      ],
      bun: null,
    });
  });

  test('remove ingredient', () => {
    const newState = constructorReducer(initialState, deleteConstructorItem('1'));
    expect(newState).toEqual({
      ingredients: [],
      bun: null,
    });
  });

  test('move ingredient UP', () => {
    const state = {
      ingredients: [
        {
          id: '1',
          ...ingredient1,
          uniqueId: '1',
        },
        {
          id: '2',
          ...ingredient2,
          uniqueId: '2',
        },
      ],
      bun: null,
    };

    const newState = constructorReducer(state, moveConstructorItemUP('1'));
    expect(newState).toEqual({
      ingredients: [
        {
          id: '2',
          ...ingredient2,
          uniqueId: '2',
        },
        {
          id: '1',
          ...ingredient1,
          uniqueId: '1',
        },
      ],
      bun: null,
    });
  });

  test('move ingredient DOWN', () => {
    const state = {
      ingredients: [
        {
          id: '1',
          ...ingredient1,
          uniqueId: '1',
        },
        {
          id: '2',
          ...ingredient2,
          uniqueId: '2',
        },
      ],
      bun: null,
    };

    const newState = constructorReducer(state, moveConstructorItemDown(0));
    expect(newState).toEqual({
      ingredients: [
        {
          id: '2',
          ...ingredient2,
          uniqueId: '2',
        },
        {
          id: '1',
          ...ingredient1,
          uniqueId: '1',
        },
      ],
      bun: null,
    });
  });
});
