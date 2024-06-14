import express from 'express';
import { CreatePendaftar, DeletePendaftar, GetListPendaftarByIdLabor, GetPendaftarByIdRecruitment, GetPendaftarLabByID } from '../controllers/PendaftarControllers.js';

const router = express.Router();

router.post('/add-pendaftar', CreatePendaftar);
router.post('/get-pendaftar', GetPendaftarByIdRecruitment)
router.get('/get-pendaftarbyidLabor/:idLabor', GetListPendaftarByIdLabor)
router.get('/getpendaftarlaborbyidlabor/:idLabor', GetPendaftarLabByID)
router.delete('/deletependaftar/:id', DeletePendaftar)

export default router;