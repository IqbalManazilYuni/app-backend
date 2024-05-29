import express from 'express';
import { CreatePendaftar, GetPendaftarByIdRecruitment } from '../controllers/PendaftarControllers.js';

const router = express.Router();

router.post('/add-pendaftar', CreatePendaftar);
router.post('/get-pendaftar', GetPendaftarByIdRecruitment)

export default router;