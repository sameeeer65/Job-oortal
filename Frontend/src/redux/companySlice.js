import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  companies: [],
  searchCompanyByText: "",
  currentCompany: null,
  singleCompany: null,
  loading: false,
  error: null,
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompanies: (state, action) => {
      state.companies = action.payload;
      state.loading = false;
    },
      setSearchCompanyByText: (state, action) => {
      state.searchCompanyByText = action.payload;
    },
    setCurrentCompany: (state, action) => {
      state.currentCompany = action.payload;
    },
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
    addCompany: (state, action) => {
      state.companies.push(action.payload);
    },
    updateCompany: (state, action) => {
      const index = state.companies.findIndex(
        (c) => c._id === action.payload._id
      );
      if (index !== -1) {
        state.companies[index] = action.payload;
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearCompany: (state) => {
      state.currentCompany = null;
    },
  },
});

export const {
  setCompanies,
  setCurrentCompany,
  setSearchCompanyByText,
  setSingleCompany,
  addCompany,
  updateCompany,
  setLoading,
  setError,
  clearCompany,
} = companySlice.actions;

export default companySlice.reducer;
