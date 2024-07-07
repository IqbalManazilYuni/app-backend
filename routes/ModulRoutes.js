import express from 'express';
import { AddModul, CreateRiwayatPembaca, DeleteModul, EditModul, GetModulAll, GetModulById } from '../controllers/ModulControllers.js';
import multer from 'multer';
import verifyToken from '../config/middleware.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/getmodulbyidlabor/:idLabor', verifyToken, GetModulAll)
router.get('/getmodulbyid/:id', verifyToken, GetModulById);
router.post('/createriwayat', CreateRiwayatPembaca)
router.post('/add-modul', verifyToken, upload.single('nama_file'), AddModul);
router.post('/edit-modul', verifyToken, upload.single('nama_file'), EditModul);
router.delete('/delete-modul/:id', verifyToken, DeleteModul)

export default router;