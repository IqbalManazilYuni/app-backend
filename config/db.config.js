import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'; // Impor dotenv untuk memuat variabel lingkungan
import mysql2 from 'mysql2';

dotenv.config(); // Memuat variabel lingkungan dari file .env

const db = new Sequelize({
  dialect: 'mysql',
  dialectModule: mysql2, // Menambahkan ini untuk menggunakan mysql2
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DBNAME
});

export default db;
