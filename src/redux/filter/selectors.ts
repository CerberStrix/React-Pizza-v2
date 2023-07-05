import { type RootState } from '../store';
import { type FilterSliceState } from './types';

export const filterSelector = (state: RootState): FilterSliceState => state.filters;
