import express from 'express';
import { CreatePesertaUjian, DeletePesertaUjian, GetListUjianByIDLabor, GetPesertaUjianByID, GetPesertaUjianByIdTahapan, GetUjianByID } from '../controllers/UjianControllers.js';

const router = express.Router();

router.get('/getujianbyidlabor/:idLabor', GetListUjianByIDLabor);
router.get('/getujianbyid/:id', GetUjianByID);
router.get('/getpesertaujianbyid/:id', GetPesertaUjianByID)
router.get('/getpesertaujianbyidtahapan/:idTahapan', GetPesertaUjianByIdTahapan)
router.post('/create-pesertaujian', CreatePesertaUjian)
router.delete('/delete-pesertaujian/:id', DeletePesertaUjian)

export default router;