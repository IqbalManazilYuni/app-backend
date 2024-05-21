import express from 'express';
import { CreatePesertaWawancara, GetPendaftarByIDWawancara, GetPesertaWawancara, GetWawancaraById, GetWawancaraByIdLabor } from '../controllers/WawancaraControllers.js';

const router = express.Router();

router.get('/getwawancarabyidlabor/:idLabor', GetWawancaraByIdLabor)
router.get('/getwawancarabyid/:id', GetWawancaraById);
router.get('/getpesertawawancara/:idWawancara', GetPesertaWawancara)
router.get('/getpesertawawancarabyidwawancara/:idWawancara', GetPendaftarByIDWawancara)
router.post('/add-pesertawawancara', CreatePesertaWawancara);

export default router;