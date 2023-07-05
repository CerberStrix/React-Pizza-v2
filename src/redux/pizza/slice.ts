import { createSlice } from '@reduxjs/toolkit';
import { type PizzasSliceState } from './types';
import { Status } from './types';
import { fetchPizzas } from './asyncActions';

const initialState: PizzasSliceState = {
  items: [],
  loadingStatus: Status.LOADING
};

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.loadingStatus = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loadingStatus = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.items = [];
      state.loadingStatus = Status.ERROR;
    });
  }
});

// Action creators are generated for each case reducer function

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
