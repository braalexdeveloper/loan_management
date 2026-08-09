import express from "express";
import cors from "cors";
import { AppDataSource } from "./config/db";
import clientRoutes from './modules/clients/client.routes';
import loanRoutes from './modules/loans/loan.routes';
import paymentRoutes from './modules/payments/payment.routes';
import { errorHandler } from "./middleware/errorHandler";

const app=express();

app.use(cors({
    origin: "http://localhost:5173",
}));
app.use(express.json());

app.use('/api',clientRoutes);
app.use('/api',loanRoutes);
app.use('/api',paymentRoutes);

app.use(errorHandler);

AppDataSource.initialize().then(()=>{
    app.listen(5000,()=>console.log("servidor corriendo!"))
}).catch((error)=>{
    console.error('❌ Error al conectar la base de datos', error);
    process.exit(1); // Termina el proceso si la BD no se conecta
})