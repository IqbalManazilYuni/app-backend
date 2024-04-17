import { Sequelize } from "sequelize";
import dotenv from 'dotenv'; // Impor dotenv untuk memuat variabel lingkungan

dotenv.config(); // Memuat variabel lingkungan dari file .env

const db = new Sequelize({
  dialect: 'mysql',
  host: 'bfrl0tflajs99qxjy82q-mysql.services.clever-cloud.com',
  port: 3306,
  username: 'umjokrsq2nnxdyke',
  password: 'Fs1a3Cp6uZwinKEGLCLT', // Ganti dengan password MySQL Anda
  database: 'bfrl0tflajs99qxjy82q'
});


export default db;
