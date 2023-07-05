import { type Pizza, type FetchPizzasArgs } from './types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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
