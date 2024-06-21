import express from 'express';
import { CreatePesertaUjian, DeletePesertaUjian, GetJadwalUjian, GetListUjianByIDLabor, GetPesertaUjianByID, GetPesertaUjianByIdTahapan, GetSoalUjianByIdUjian, GetUjianByID, GetUjianTimeByNIM, GetpesertaUjianByid, UpdatePenganggungJawab, UpdateStatusRecruitment } from '../controllers/UjianControllers.js';

const router = express.Router();

router.get('/getsoalbyidujian/:idTahapan', GetSoalUjianByIdUjian)
router.get('/getujianbyidlabor/:idLabor', GetListUjianByIDLabor);
router.get('/getjadwalujian/:idLabor', GetJadwalUjian);
router.get('/getujianbyid/:id', GetUjianByID);
router.get('/getpesertaujianbyid/:id', GetPesertaUjianByID)
router.get('/getujianbynim/:nim', GetUjianTimeByNIM)
router.get('/getonepesertaujianbyid/:id', GetpesertaUjianByid)
router.get('/getpesertaujianbyidtahapan/:idTahapan', GetPesertaUjianByIdTahapan)
router.post('/create-pesertaujian', CreatePesertaUjian)
router.post('/edit-pesertaujian', UpdatePenganggungJawab)
router.post('/update-status-ujian', UpdateStatusRecruitment)
router.delete('/delete-pesertaujian/:id', DeletePesertaUjian)

export default router;