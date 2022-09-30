import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterSliceState, Sort, SortPropertyEnum } from './types';




const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state: FilterSliceState, action: PayloadAction<number>) {

      state.categoryId = action.payload;
      // console.log('filter', state.categoryId);
    },
    setSort(state: FilterSliceState, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setSearchValue(state: FilterSliceState, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCurrentPage(state: FilterSliceState, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state: FilterSliceState, action: PayloadAction<FilterSliceState>) {
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
      state.searchValue = action.payload.searchValue;
    },
  },
});


export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions;
export default filterSlice.reducer;
