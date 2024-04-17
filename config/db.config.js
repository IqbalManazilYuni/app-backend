import { Sequelize } from "sequelize";
import dotenv from 'dotenv'; // Impor dotenv untuk memuat variabel lingkungan

dotenv.config(); // Memuat variabel lingkungan dari file .env

const db = new Sequelize(process.env.DB_DBNAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

export default db;
