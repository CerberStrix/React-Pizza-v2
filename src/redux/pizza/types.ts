export interface PizzasSliceState {
  loadingStatus: Status
  items: Pizza[]
}

export interface FetchPizzasArgs {
  order: string
  sortBy: string
  category: string
  currentPage: number
}

export interface Pizza {
  id: string
  title: string
  price: number
  imageUrl: string
  sizes: number[]
  types: number[]
  reating: number
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
};
