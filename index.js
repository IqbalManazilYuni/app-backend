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
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DBNAME
});

try {
  await sequelize.authenticate();
  console.log('Connection to the database has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

// const corsOptions = {
//   origin: 'http://localhost:3000',
//   credentials: true,
// };

app.use(cors());

app.use(express.json());
app.use(UserRoutes);

app.listen(process.env.PORT, () => {
  console.log("Listening on port", process.env.PORT);
});