export interface SortType {
  sortProperty: string
}

export interface FilterSliceState {
  searchValue: string
  categoryId: number
  currentPage: number
  sort: SortType
}
