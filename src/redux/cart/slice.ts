import { type PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { type RootState } from '../store';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { type CartItem, type CartSliceState } from './types';

const cartData = getCartFromLS();

const initialState: CartSliceState = {
  items: cartData.items,
  totalPrice: cartData.totalPrice,
  totalCount: cartData.totalCount
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem !== undefined) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1
        });
      }
    },
    minusItem: (state, action: PayloadAction<string>) => {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem !== undefined) {
        findItem.count--;
      }

      if (findItem !== undefined && findItem.count === 0) {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    }
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
  }
});

export const cartSelector = (state: RootState): CartSliceState => state.cart;
export const cartSelectorById = (id: number) => (state: RootState) =>
  state.cart.items.find((obj: { id: any }) => Number(obj.id) === Number(id));

// Action creators are generated for each case reducer function
export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
