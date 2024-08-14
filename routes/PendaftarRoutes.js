import express from 'express';
import {
    CetakLaporan,
    CreatePendaftar,
    DeletePendaftar,
    EditPendaftarDokumen,
    GetListPendaftarByIdLabor,
    GetPendaftarByIdRecruitment,
    GetPendaftarByNIM,
    GetPendaftarLabByID
} from '../controllers/PendaftarControllers.js';
import verifyToken from '../config/middleware.js';

const router = express.Router();

router.post('/add-pendaftar', verifyToken, CreatePendaftar);
router.post('/getbynimpendaftar', verifyToken, GetPendaftarByNIM);
router.post('/getDataCetak', verifyToken, CetakLaporan);
router.post('/edit-pendaftaran', verifyToken, EditPendaftarDokumen);
router.post('/get-pendaftar', verifyToken, GetPendaftarByIdRecruitment)
router.get('/get-pendaftarbyidLabor/:idLabor', verifyToken, GetListPendaftarByIdLabor)
router.get('/getpendaftarlaborbyidlabor/:idLabor', verifyToken, GetPendaftarLabByID)
router.delete('/deletependaftar/:id', verifyToken, DeletePendaftar)

export default router;