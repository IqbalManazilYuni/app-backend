import express from "express";
import cors from "cors";
import UserRoutes from './routes/UserRoutes.js';
// import db from './config/db.config.js';

const app = express();

// (async () => {
//   await db.sync();
// })();

app.use(cors());
app.use(express.json());
app.use(UserRoutes);

app.listen(3001, () => {
  console.log("listening on ")
})