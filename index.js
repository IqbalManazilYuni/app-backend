import express from "express";
import cors from "cors";
import UserRoutes from './routes/UserRoutes.js';
import dotenv from 'dotenv';
// import db from './config/db.config.js';
dotenv.config(); 
const app = express();

// (async () => {
//   await db.sync();
// })();

app.use(cors());
app.use(express.json());
app.use(UserRoutes);

app.listen(process.env.PORT, () => {
  console.log("listening on", process.env.PORT);
})