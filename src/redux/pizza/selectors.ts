import { type RootState } from '../store';
import { type PizzasSliceState } from './types';

export const pizzasSelector = (state: RootState): PizzasSliceState => state.pizzas;
