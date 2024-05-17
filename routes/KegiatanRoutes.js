import express from 'express';
import { CreateKegiatan, DeleteKegiatan, EditKegiatan, GetKegiatan, GetKegiatanByID } from '../controllers/KegiatanControllers.js';
const router = express.Router();

router.get('/getkegiatan/:id',GetKegiatanByID)
router.get('/getkegiatan', GetKegiatan);
router.post('/add-kegiatan', CreateKegiatan);
router.post('/edit-kegiatan', EditKegiatan);
router.delete('/deletekegiatan/:id', DeleteKegiatan)

export default router;