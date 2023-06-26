import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './slices/filterSlice';
import cartSlice from './slices/cartSlice';
import pizzasSlice from './slices/pizzasSlice';

export const store = configureStore({
  reducer: { filters: filtersReducer, cart: cartSlice, pizzas: pizzasSlice },
});
