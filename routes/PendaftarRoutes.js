import express from 'express';
import { CreatePendaftar, GetListPendaftarByIdLabor, GetPendaftarByIdRecruitment } from '../controllers/PendaftarControllers.js';

const router = express.Router();

router.post('/add-pendaftar', CreatePendaftar);
router.post('/get-pendaftar', GetPendaftarByIdRecruitment)
router.get('/get-pendaftarbyidLabor/:idLabor', GetListPendaftarByIdLabor)

export default router;