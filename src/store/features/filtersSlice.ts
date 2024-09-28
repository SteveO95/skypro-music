import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FiltersState = {
  genres: string[];
  authors: string[];
  keyword: string;
  sortOption: string;
};

const initialFiltersState: FiltersState = {
  genres: [],
  authors: [],
  keyword: "",
  sortOption: "По умолчанию",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState: initialFiltersState,
  reducers: {
    updateFilters(state, action: PayloadAction<Partial<FiltersState>>) {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetFilters() {
      return initialFiltersState;
    },
  },
});

export const { updateFilters, resetFilters } = filtersSlice.actions;

export const filterReducer = filtersSlice.reducer;
