import express from 'express';
import { CreatePesertaUjian, DeletePesertaUjian, GetJadwalUjian, GetListUjianByIDLabor, GetPesertaUjianByID, GetPesertaUjianByIdTahapan, GetUjianByID, GetpesertaUjianByid, UpdatePenganggungJawab } from '../controllers/UjianControllers.js';

const router = express.Router();

router.get('/getujianbyidlabor/:idLabor', GetListUjianByIDLabor);
router.get('/getjadwalujian/:idLabor', GetJadwalUjian);
router.get('/getujianbyid/:id', GetUjianByID);
router.get('/getpesertaujianbyid/:id', GetPesertaUjianByID)
router.get('/getonepesertaujianbyid/:id', GetpesertaUjianByid)
router.get('/getpesertaujianbyidtahapan/:idTahapan', GetPesertaUjianByIdTahapan)
router.post('/create-pesertaujian', CreatePesertaUjian)
router.post('/edit-pesertaujian', UpdatePenganggungJawab)
router.delete('/delete-pesertaujian/:id', DeletePesertaUjian)

export default router;