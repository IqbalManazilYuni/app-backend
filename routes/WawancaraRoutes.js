import express from 'express';
import { CreatePesertaWawancara, DeletePesertaWawancara, GetPendaftarByIDWawancara, GetPesertaWawancara, GetWawancaraById, GetWawancaraByIdLabor } from '../controllers/WawancaraControllers.js';

const router = express.Router();

router.get('/getwawancarabyidlabor/:idLabor', GetWawancaraByIdLabor)
router.get('/getwawancarabyid/:id', GetWawancaraById);
router.get('/getpesertawawancara/:idWawancara', GetPesertaWawancara)
router.get('/getpesertawawancarabyidwawancara/:idWawancara', GetPendaftarByIDWawancara)
router.post('/add-pesertawawancara', CreatePesertaWawancara);
router.delete('/delete-pesertawawancara/:id', DeletePesertaWawancara);

export default router;