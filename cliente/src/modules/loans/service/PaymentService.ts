const API_URL = "http://localhost:8080/api/payments";

export const createPayment=async(data:any)=>{
   const response=await fetch(API_URL,{
    method:"POST",
    body:data
   });

   if(!response.ok){
    throw new Error("Error al crear pago");
   }

   return response.json();
}