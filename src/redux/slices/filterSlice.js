import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  sort: {
    name: 'популярности',
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
  },
});

// Action creators are generated for each case reducer function
export const { changeCategoryId, changeSortType } = filterSlice.actions;

export default filterSlice.reducer;
