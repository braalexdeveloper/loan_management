import Swal from "sweetalert2";

export const alertSuccess=(title:string,text?:string)=>{
 return Swal.fire({
    icon:"success",
    title,
    text,
    timer:2000,
    showConfirmButton:false,
    timerProgressBar:true,
 });
}

export const alertError=(title:string,text?:string)=>{
 return Swal.fire({
    icon:"error",
    title,
    text,
    confirmButtonText:"Aceptar",
 })
}

export const alertWarning = (
  title: string,
  text?: string
) => {
  return Swal.fire({
    icon: "warning",
    title,
    text,
    confirmButtonText: "Aceptar",
  });
};

export const alertConfirm = async (
  title: string,
  text: string
) => {
  return await Swal.fire({
    icon: "warning",
    title,
    text,
    showCancelButton: true,
    confirmButtonText: "Sí, continuar",
    cancelButtonText: "Cancelar",
  });
};