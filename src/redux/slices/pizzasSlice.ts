import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { type RootState } from '../store';

interface PizzasSliceState {
  loadingStatus: Status
  items: Pizza[]
}

interface FetchPizzasArgs {
  order: string
  sortBy: string
  category: string
  currentPage: number
}

interface Pizza {
  id: string
  title: string
  price: number
  imageUrl: string
  sizes: number[]
  types: number[]
  reating: number
}

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasArgs >(
  'pizzas/fetchPizzas',
  async (params) => {
    const { order, sortBy, category, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://64374d090c58d3b1456eb3e3.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`
    );
    return data;
  }
);

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

export const pizzasSelector = (state: RootState): PizzasSliceState => state.pizzas;
export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
