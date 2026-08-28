import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { LoanI } from "../interfaces/LoanI";
import { createLoan, getLoanById, getLoans } from "../service/LoanService";


interface LoanState {
  loans: LoanI[];
  loanState:LoanI | null;
  currentPage: number;
  totalPages: number;
  totalLoans: number;
  loading: boolean;
  error: any;
}

const initialState: LoanState = {
  loans: [],
  loanState:null,
  currentPage: 0,
  totalPages: 0,
  totalLoans: 0,
  loading: false,
  error: ""
}

export const getLoansThunk = createAsyncThunk("fetch/getLoans", async ({ page, dni }: { page?: number, dni?: string }) => {
  return await getLoans(page, dni);
});

export const getLoanByIdThunk = createAsyncThunk("fetch/getLoanById", async (id: number) => {
  return await getLoanById(id);
});

export const createLoanThunk = createAsyncThunk("fetch/createLoan", async (loan: any) => {
  return await createLoan(loan);
});

const loanSlice = createSlice({
  name: "loans",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLoansThunk.pending, (state) => {
        state.loading = true;
        
      })
      .addCase(getLoansThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.loans = action.payload.data;
        
        state.currentPage = action.payload.currentPage;
        state.totalLoans = action.payload.totalElements;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getLoansThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error al cargar prestamos"
      })
      .addCase(getLoanByIdThunk.fulfilled,(state,action)=>{
       state.loanState=action.payload;
      })

  },
})

export default loanSlice.reducer;