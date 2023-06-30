import { createSlice, isAnyOf } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
    },
    minusItem: (state, action) => {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem) {
        findItem.count--;
      }

      if (findItem.count === 0) {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(addItem, minusItem, removeItem), (state) => {
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
      state.totalCount = state.items.reduce((count, obj) => {
        return obj.count + count;
      }, 0);
    });
  },
});

export const cartSelector = (state) => state.cart;
export const cartSelectorById = (id) => (state) =>
  state.cart.items.find((obj) => Number(obj.id) === Number(id));

// Action creators are generated for each case reducer function
export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
