import { configureStore } from "@reduxjs/toolkit";
import clientReducer from '../modules/clients/store/clientSlice';
import loanReducer from '../modules/loans/store/LoanSlice';

export const store=configureStore({
    reducer:{
        clients:clientReducer,
        loans:loanReducer
    }
});

export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;