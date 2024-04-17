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
  password: 'Fs1a3Cp6uZwinKEGLCLT', // Ganti dengan password MySQL Anda
  database: 'bfrl0tflajs99qxjy82q'
});

// Cek koneksi ke database
try {
  await sequelize.authenticate();
  console.log('Connection to the database has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

// Definisikan model-model Sequelize di sini (jika diperlukan)
// Contoh:
// const User = sequelize.define('User', { /* definisi model */ });

app.use(cors());
app.use(express.json());
app.use(UserRoutes);

app.listen(process.env.PORT, () => {
  console.log("Listening on port", process.env.PORT);
});