import { Request,Response,NextFunction } from "express";


export function errorHandler(error:any,req:Request,res:Response,next:NextFunction){
   
    if(error.statusCode){
        return res.status(error.statusCode).json({message:error.message});
    }

    console.error(error);

    return res.status(500).json({error:"Error interno del servidor"})
}