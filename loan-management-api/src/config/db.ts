import "reflect-metadata";
import { DataSource } from "typeorm";
import { Client } from "../modules/clients/client.entity";
import { Loan } from "../modules/loans/loan.entity";
import { Payment } from "../modules/payments/payment.entity";

export const AppDataSource=new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'brayan',
  database: process.env.DB_NAME || 'loansdb',
  synchronize: true, // ⚠️ Solo en desarrollo (cambiar a false en producción)
  logging: true,
  entities: [Client,Loan,Payment], // Directorio de modelos
  migrations: [],
});