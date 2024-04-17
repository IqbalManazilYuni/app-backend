import express from "express";
import cors from "cors";
import UserRoutes from './routes/UserRoutes.js';
import dotenv from 'dotenv';
import { Sequelize } from "sequelize";
// import db from './config/db.config.js';
dotenv.config(); 
const app = express();

// (async () => {
//   await db.sync();
// })();
// Menggunakan dotenv untuk konfigurasi

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'bfrl0tflajs99qxjy82q-mysql.services.clever-cloud.com',
  port: 3306,
  username: 'umjokrsq2nnxdyke',
  password: 'Fs1a3Cp6uZwinKEGLCLT',
  database: 'bfrl0tflajs99qxjy82q'
});

try {
  await sequelize.authenticate();
  console.log('Connection to the database has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const corsOptions = {
  origin: 'http://localhost:3000', // Allow access from localhost:3000
  credentials: true, // Allow including cookies from frontend
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(UserRoutes);

app.listen(process.env.PORT, () => {
  console.log("Listening on port", process.env.PORT);
});