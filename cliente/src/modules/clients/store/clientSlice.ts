import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ClientI } from "../interfaces/ClientI";
import { createClient, deleteClient, getClients } from "../service/ClientService";

interface ClientState {
  clients: ClientI[];
  responseCreateClient:any;
  responseDeleteClient:any;
  loading: boolean;
  error: string | null;
}

const initialState: ClientState = {
  clients: [],
  responseCreateClient:{},
  responseDeleteClient:{},
  loading: false,
  error: null,
};

export const getClientsThunk = createAsyncThunk(
  "clients/fetch",
  async () => {
    return await getClients();
  }
);

export const createClientThunk = createAsyncThunk("clients/create", async (client: ClientI) => {
  return await createClient(client);
});

export const deleteClientThunk=createAsyncThunk("clients/delete",async(id:number)=>{
  return await deleteClient(id);
});

const clientSlice = createSlice({
  name: "clients",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(getClientsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getClientsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload;
      })

      .addCase(getClientsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ?? "Error al cargar clientes";
      })
      //create client
      .addCase(createClientThunk.pending,(state)=>{
        state.loading=true;
        state.error=null;
      })
      .addCase(createClientThunk.fulfilled,(state,action)=>{
        state.loading=false;
        state.responseCreateClient=action.payload;
      })
      .addCase(createClientThunk.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.error.message ?? "Error al crear cliente!";
      })
      //Delete client
      .addCase(deleteClientThunk.pending,(state)=>{
        state.responseDeleteClient="";
      })
      .addCase(deleteClientThunk.fulfilled,(state,action)=>{
        state.responseDeleteClient=action.payload;
      })
      .addCase(deleteClientThunk.rejected,(state,action)=>{
        state.responseDeleteClient=action.error.message ?? "Error al eliminar cliente desde frontend";
      })
  },
});

export default clientSlice.reducer;