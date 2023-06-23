import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  currentPage: 1,
  sort: {
    sortProperty: 'rating',
  },
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    changeCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
    changeSortType: (state, action) => {
      state.sort = action.payload;
    },
    changePageCount: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action) => {
      state.categoryId = Number(action.payload.categoryId);
      state.currentPage = Number(action.payload.currentPage);
      state.sort.sortProperty = action.payload.sortProperty;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeCategoryId, changeSortType, changePageCount, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
