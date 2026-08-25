import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { LoanI } from "../interfaces/LoanI";
import { createLoan, getLoans } from "../service/LoanService";


interface LoanState{
loans:LoanI[];
currentPage:number;
totalPages:number;
totalLoans:number;
loading:boolean;
error:any;
}

const initialState:LoanState={
    loans:[],
currentPage:0,
totalPages:0,
totalLoans:0,
loading:false,
error:""
}

export const getLoansThunk=createAsyncThunk("fetch/getLoans",async({page,dni}:{page?:number,dni?:string})=>{
    return await getLoans(page,dni);
});

export const createLoanThunk=createAsyncThunk("fetch/createLoan",async(loan:any)=>{
  return await createLoan(loan);
});

const loanSlice=createSlice({
    name:"loans",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
      builder
      .addCase(getLoansThunk.pending,(state)=>{
        state.loading=true;
      })
      .addCase(getLoansThunk.fulfilled,(state,action)=>{
         state.loading=false;
         state.loans=action.payload.data;
         state.currentPage=action.payload.currentPage;
         state.totalLoans=action.payload.totalElements;
         state.totalPages=action.payload.totalPages;
      })
      .addCase(getLoansThunk.rejected,(state,action)=>{
      state.loading=false;
      state.error=action.error.message ?? "Error al cargar prestamos"
      })
      
    },
})

export default loanSlice.reducer;