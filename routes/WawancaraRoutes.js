import express from 'express';
import { CreatePesertaWawancara, DeletePesertaWawancara, EditPesertaWawancara, GetJadwalWawancara, GetNilaiPewawancara, GetPendaftarByIDWawancara, GetPesertaByID, GetPesertaWawancara, GetWawancaraById, GetWawancaraByIdLabor } from '../controllers/WawancaraControllers.js';

const router = express.Router();

router.get('/getwawancarabyidlabor/:idLabor', GetWawancaraByIdLabor)
router.get('/getpesertawawancarabyid/:id', GetPesertaByID)
router.get('/getwawancarabyid/:id', GetWawancaraById);
router.get('/getpesertawawancara/:idWawancara', GetPesertaWawancara)
router.post('/jadwalwawancara', GetJadwalWawancara)
router.get('/getpesertawawancarabyidwawancara/:idWawancara', GetPendaftarByIDWawancara);
router.get('/getnilaipesertawawancara/:id', GetNilaiPewawancara)
router.post('/add-pesertawawancara', CreatePesertaWawancara);
router.post('/edit-peserta-wawancara', EditPesertaWawancara);
router.delete('/delete-pesertawawancara/:id', DeletePesertaWawancara);

export default router;