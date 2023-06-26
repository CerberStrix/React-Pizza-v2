import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzas',
  async ({ order, sortBy, category, currentPage }) => {
    const { data } = await axios.get(
      `https://64374d090c58d3b1456eb3e3.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`,
    );
    return data;
  },
);

const initialState = {
  items: [],
  loadingStatus: 'loading',
};

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.loadingStatus = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.loadingStatus = 'success';
    },
    [fetchPizzas.rejected]: (state) => {
      state.items = [];
      state.loadingStatus = 'error';
    },
  },
});

// Action creators are generated for each case reducer function
export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
