import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type FilterSliceState, type SortType } from './types';

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: {
    sortProperty: 'rating'
  }
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    changeCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    changeSortType: (state, action: PayloadAction<SortType>) => {
      state.sort = action.payload;
    },
    changePageCount: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action: PayloadAction<any>) => {
      state.categoryId = Number(action.payload.categoryId);
      state.currentPage = Number(action.payload.currentPage);
      state.sort.sortProperty = action.payload.sortProperty;
    }
  }
});

export const { setSearch, changeCategoryId, changeSortType, changePageCount, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
