import type { ClientI } from "../interfaces/ClientI";

const API_URL = "http://localhost:5000/api/clients";


export const getClients=async ()=>{
    const response=await fetch(API_URL);
    if (!response.ok) {
    throw new Error("Error al obtener los clientes");
  }
    const data=await response.json();
    
    return data;
}

export const getClientById=async (id:number)=>{
   const response=await fetch(`${API_URL}/${id}`);
   if(!response.ok) throw new Error("Error al obtener cliente");
   return await response.json();
}

export const createClient = async (client: ClientI) => {
    const response = await fetch(API_URL,{
     method:"POST",
     headers:{
        "Content-Type":"application/json",
     },
     body:JSON.stringify(client),
    });

    const result=await response.json();

    if(!response.ok){
        throw new Error(result.errors[0].property ?? "Error al crear cliente rr!");
    }

    return result;
}

export const updateClient=async (client:ClientI,id:number)=>{
  const response=await fetch(API_URL+"/"+id,{
    method:"PUT",
    headers:{
        "Content-Type":"application/json",
     },
     body:JSON.stringify(client),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message ?? "Error al actualizar el cliente");
  }
  
  return result;
}


  export const deleteClient = async (id: number) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error al eliminar cliente");
  }

  return await response.json();
};
