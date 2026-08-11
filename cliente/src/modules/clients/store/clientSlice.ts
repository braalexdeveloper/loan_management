import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ClientI } from "../interfaces/ClientI";
import { createClient, deleteClient, getClientById, getClients, updateClient } from "../service/ClientService";

interface ClientState {
  clients: ClientI[];
  getClient: ClientI | null;
  responseCreateClient: any;
  responseUpdateClient: any;
  responseDeleteClient: any;
  loading: boolean;
  error: string | null;
}

const initialState: ClientState = {
  clients: [],
  getClient: null,
  responseCreateClient: {},
  responseUpdateClient: {},
  responseDeleteClient: {},
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

export const getClientByIdThunk = createAsyncThunk("clients/getClientById", async (id: number) => {
  return await getClientById(id);
});

export const updatedClientThunk = createAsyncThunk("clients/update", async (client: ClientI) => {
  const { id, ...data } = client;
  return await updateClient(data,Number(id));
});

export const deleteClientThunk = createAsyncThunk("clients/delete", async (id: number) => {
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
      //getClientById
      .addCase(getClientByIdThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getClientByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.getClient = action.payload;
      })
      .addCase(getClientByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error al obtener cliente!";
      })
      //create client
      .addCase(createClientThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createClientThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.responseCreateClient = action.payload;
      })
      .addCase(createClientThunk.rejected, (state, action) => {
        console.log("createthunkRejected",action.error)
        state.loading = false;
        state.error = action.error.message ?? "Error al crear clienteuii!";
      })
      //Update client
      .addCase(updatedClientThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatedClientThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.responseUpdateClient=action.payload;
      })
      .addCase(updatedClientThunk.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ?? "Error al actualizar cliente";
      })
      //Delete client
      .addCase(deleteClientThunk.pending, (state) => {
        state.responseDeleteClient = "";
      })
      .addCase(deleteClientThunk.fulfilled, (state, action) => {
        state.responseDeleteClient = action.payload;
      })
      .addCase(deleteClientThunk.rejected, (state, action) => {
        state.responseDeleteClient = action.error.message ?? "Error al eliminar cliente desde frontend";
      })
  },
});

export default clientSlice.reducer;