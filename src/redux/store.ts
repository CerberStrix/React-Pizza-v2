import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './filter/slice';
import cartSlice from './cart/slice';
import pizzasSlice from './pizza/slice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: { filters: filtersReducer, cart: cartSlice, pizzas: pizzasSlice }
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAppDispatch = () => useDispatch<AppDispatch>();
