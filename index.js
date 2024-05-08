import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { Sequelize } from "sequelize";
import Labor from "./models/LaborModels.js";
import Pengguna from "./models/PenggunaModels.js";
import Periode from "./models/PeriodeModels.js";
import Jabatan from "./models/JabatanModels.js";
import DetailPeriode from "./models/DetailPeriodeModels.js";
import Module from "./models/ModuleModels.js";
import ProsesOr from "./models/ProsesOrModule.js";
import Tahapan from "./models/TahapanModels.js";
import DetailPesertaOr from "./models/DetailPesertaOrModels.js";
import Wawancara from "./models/WawancaraModels.js";
import Pewawancara from "./models/PewawancaraModels.js";
import PesertaWawancara from "./models/pesertaWawancaraModels.js";
import NilaiPesertaWawancara from "./models/NilaiPesertaWawancaraModels.js";
import Ujian from "./models/Ujian.js";
import BankSoal from "./models/BankSoalModels.js";
import BankSoalEssay from "./models/BankSoalEssayModels.js";
import BankSoalMultiple from "./models/BankSoalMultiple.js";
import SoalUjian from "./models/SoalUjianModels.js";
import PesertaUjian from "./models/PesertaUjianModels.js";
import Jawaban from "./models/JawabanModels.js";
import { setupRelations, setupRelationsDetailPeriode, setupRelationshipsTahapan, setupRelationshipsPengguna, setupRelasiWawancara, setupDetailNilaiWawancara, setupRelationshipsTahapanDetail, setupUjianRelasi, setupRelasibankSoal, relasiJawaban } from "./models/RelasiModels.js";
import LabRoutes from './routes/LabRoutes.js'
import RegistrasiRoutes from './routes/RegistrasiRoutes.js';
import UserRoutes from './routes/UserRoutes.js'

dotenv.config();
const app = express();

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
  process.exit(1); // Keluar dari aplikasi jika gagal terhubung ke database
}

// Model tabel yang akan disinkronkan
// const modelsToSync = [
//   Labor,
//   Pengguna,
//   Periode,
//   Jabatan,
//   DetailPeriode,
//   Module,
//   ProsesOr,
//   Tahapan,
//   DetailPesertaOr,
//   Wawancara,
//   Pewawancara,
//   PesertaWawancara,
//   NilaiPesertaWawancara,
//   Ujian,
//   BankSoal,
//   BankSoalEssay,
//   BankSoalMultiple,
//   SoalUjian,
//   PesertaUjian,
//   Jawaban
// ];

// // Sinkronkan model-model tabel dengan database
// (async () => {
//   for (const model of modelsToSync) {
//     try {
//       await model.sync();
//       console.log(`Model ${model.name} synchronized successfully.`);
//     } catch (error) {
//       console.error(`An error occurred while synchronizing ${model.name}:`, error);
//       process.exit(1); // Keluar dari aplikasi jika gagal menyinkronkan model tabel
//     }
//   }
// })();

// // Konfigurasi relasi antar tabel
// (async () => {
//   try {
//     await setupRelations();
//     await setupRelationsDetailPeriode();
//     await setupRelationshipsTahapan();
//     await setupRelationshipsPengguna();
//     await setupRelasiWawancara();
//     await setupDetailNilaiWawancara();
//     await setupRelationshipsTahapanDetail();
//     await setupUjianRelasi();
//     await setupRelasibankSoal();
//     await relasiJawaban();

//     console.log('Relationships setup successfully.');
//   } catch (error) {
//     console.error('An error occurred while setting up relationships:', error);
//     process.exit(1); // Keluar dari aplikasi jika gagal mengatur relasi antar tabel
//   }
// })();

app.use(cors());
app.use(express.json());

app.use(LabRoutes)
app.use(RegistrasiRoutes)
app.use(UserRoutes)

app.listen(process.env.PORT, () => {
  console.log("Listening on port", process.env.PORT);
});
