import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { Sequelize } from "sequelize";
import LabRoutes from './routes/LabRoutes.js'
import RegistrasiRoutes from './routes/RegistrasiRoutes.js';
import UserRoutes from './routes/UserRoutes.js'
import KepengurusanRoutes from './routes/KepengurusanRoutes.js'
import DivisiRoutes from './routes/DivisiRoutes.js'
import KegiatanRoutes from './routes/KegiatanRoutes.js'
import RecruitmentRoutes from './routes/RecruitmentRoutes.js';
import TahapanRoutes from './routes/TahapanRoutes.js'
import WawancaraRoutes from './routes/WawancaraRoutes.js'
import PendaftarRoutes from './routes/PendaftarRoutes.js'
import DetailKepengurusan from "./models/Model_Kepengurusan/DetailKepengurusan.js";
import Kepengurusan from "./models/Model_Kepengurusan/Kepengurusan.js";
import Divisi from "./models/Model_Kepengurusan/Divisi.js";
import Labor from "./models/Model_Kepengurusan/Labor.js";
import Modul from "./models/Model_Modul/Modul.js";
import RiwayatPembaca from "./models/Model_Modul/RiwayatPembaca.js";
import JawabanUjian from "./models/Model_Recruitment/JawabanUjian.js";
import NilaiWawancara from "./models/Model_Recruitment/NilaiWawancara.js";
import Pendaftar from "./models/Model_Recruitment/Pendaftar.js";
import PesertaUjian from "./models/Model_Recruitment/PesertaUjian.js";
import PesertaWawancara from "./models/Model_Recruitment/PesertaWawancara.js";
import Pewawacara from "./models/Model_Recruitment/Pewawancara.js";
import Recruitment from "./models/Model_Recruitment/Recruitment.js";
import SoalUjian from "./models/Model_Recruitment/SoalUjian.js";
import Tahapan from "./models/Model_Recruitment/Tahapan.js";
import Ujian from "./models/Model_Recruitment/Ujian.js";
import Wawancara from "./models/Model_Recruitment/Wawancara.js";
import BankSoal from "./models/Model_Soal/BankSoal.js";
import SoalEssay from "./models/Model_Soal/SoalEssay.js";
import SoalMultiple from "./models/Model_Soal/SoalMultple.js";
import User from "./models/Model_User/Users.js";
import { 
  RelasiBankSoal,
  RelasiDivisi,
  RelasiKegiatan,
  RelasiKepengurusan,
  RelasiLabor, 
  RelasiModul, 
  RelasiPendaftar, 
  RelasiPesertaUjian, 
  RelasiPesertaWawancara, 
  RelasiPewawancara, 
  RelasiRecruitment, 
  RelasiTahapan, 
  RelasiUjian, 
  RelasiUser,
  RelasiWawancara
} from "./models/ModelRelasi.js";
import Kegiatan from "./models/Model_Recruitment/Kegiatan.js";


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
  process.exit(1); 
}


// const modelsToSync = [
//   Labor,
//   User,
//   Kepengurusan,
//   Kegiatan,
//   Recruitment,
//   Divisi,
//   DetailKepengurusan,
//   Modul,
//   RiwayatPembaca,
//   Pendaftar,
//   Tahapan,
//   BankSoal,
//   Ujian,
//   Wawancara,
//   PesertaWawancara,
//   Pewawacara,
//   NilaiWawancara,
//   PesertaUjian,
//   SoalUjian,
//   JawabanUjian,
//   SoalEssay,
//   SoalMultiple,
// ];

// (async () => {
//   for (const model of modelsToSync) {
//     try {
//       await model.sync();
//       console.log(`Model ${model.name} synchronized successfully.`);
//     } catch (error) {
//       console.error(`An error occurred while synchronizing ${model.name}:`, error);
//       process.exit(1); 
//     }
//   }
// })();

// (async () => {
//   try {
//     await RelasiLabor();
//     await RelasiUser();
//     await RelasiModul();
//     await RelasiKepengurusan();
//     await RelasiDivisi();
//     await RelasiKegiatan();
//     await RelasiRecruitment();
//     await RelasiPendaftar();
//     await RelasiTahapan();
//     await RelasiWawancara();
//     await RelasiBankSoal();
//     await RelasiUjian();
//     await RelasiPesertaWawancara();
//     await RelasiPewawancara();
//     await RelasiPesertaUjian();

//     console.log('Relationships setup successfully.');
//   } catch (error) {
//     console.error('An error occurred while setting up relationships:', error);
//     process.exit(1); 
//   }
// })();

const corsOptions = {
  origin: (origin, callback) => {
    callback(null, true);
  }
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(LabRoutes)
app.use(RegistrasiRoutes)
app.use(UserRoutes)
app.use(KepengurusanRoutes)
app.use(DivisiRoutes)
app.use(KegiatanRoutes)
app.use(RecruitmentRoutes);
app.use(TahapanRoutes);
app.use(WawancaraRoutes);
app.use(PendaftarRoutes);

app.listen(process.env.PORT, () => {
  console.log("Listening on port", process.env.PORT);
});
