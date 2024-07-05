import express from 'express';
import { CreateKegiatan, DeleteKegiatan, EditKegiatan, GetKegiatan, GetKegiatanByID } from '../controllers/KegiatanControllers.js';
import verifyToken from '../config/middleware.js';
const router = express.Router();

router.get('/getkegiatan/:id',verifyToken,GetKegiatanByID)
router.get('/getkegiatan',verifyToken, GetKegiatan);
router.post('/add-kegiatan',verifyToken, CreateKegiatan);
router.post('/edit-kegiatan',verifyToken, EditKegiatan);
router.delete('/deletekegiatan/:id',verifyToken, DeleteKegiatan)

export default router;