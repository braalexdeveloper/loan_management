
const API_URL = "http://localhost:8080/api/loans";

export const getLoans=async (page:number=0,dni:string="")=>{
  const response= await fetch(`${API_URL}?page=${page}&dni=${dni}`);
  if(!response.ok){
   throw new Error("Error al obtener Prestamos");
  }
  const data=await response.json()
  console.log(data)
  return data;
}

export const getLoanById=async(id:number)=>{
  const response=await fetch(`${API_URL}/${id}`);
  if(!response.ok){
   throw new Error("Error al obtener Prestamo");
  }
  const data=await response.json()
  console.log(data)
  return data;
}

export const createLoan=async (loan:any)=>{
  const response=await fetch(API_URL,{
    method:"POST",
    headers:{
            "Content-Type": "application/json",
        },
    body: JSON.stringify(loan),
  });

  if(!response.ok){
    throw new Error("Error al crear prestamo");
  }
  return await response.json();

}