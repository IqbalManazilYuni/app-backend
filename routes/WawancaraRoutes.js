import express from 'express';
import { CreateNilaiWawancara, CreatePesertaWawancara, DeletePesertaWawancara, DeletePewawancara, EditPesertaWawancara, GetAsistePewawancara, GetJadwalWawancara, GetListPesertaWawancaraByIDMobile, GetNilaiPewawancara, GetNilaiWawancaraByID, GetPendaftarByIDWawancara, GetPesertaByID, GetPesertaWawancara, GetWawancaraByIDLaborMobile, GetWawancaraById, GetWawancaraByIdLabor, GetWawancaraTimeByNIM, UpdateNilaiWawancaraPeserta } from '../controllers/WawancaraControllers.js';

const router = express.Router();

router.get('/getwawancarabyidlabor/:idLabor', GetWawancaraByIdLabor)
router.get('/getwawancarabyidlabormobile/:idLabor', GetWawancaraByIDLaborMobile)
router.get('/getpesertawwcbyidmobile/:id', GetListPesertaWawancaraByIDMobile)
router.get('/getnilaiwawancarabyid/:id', GetNilaiWawancaraByID)
router.get('/getjadwalwawancarabynim/:nim', GetWawancaraTimeByNIM)
router.post('/edit-nilaiwawancara', UpdateNilaiWawancaraPeserta)
router.get('/getpesertawawancarabyid/:id', GetPesertaByID)
router.get('/getwawancarabyid/:id', GetWawancaraById);
router.get('/getpesertawawancara/:idWawancara', GetPesertaWawancara)
router.get('/getpesertawawancarabyidwawancara/:idWawancara', GetPendaftarByIDWawancara);
router.get('/getnilaipesertawawancara/:id', GetNilaiPewawancara);
router.get('/getasistenpewawancara/:idLabor', GetAsistePewawancara);
router.post('/jadwalwawancara', GetJadwalWawancara);
router.post('/addpewawancara', CreateNilaiWawancara);
router.post('/add-pesertawawancara', CreatePesertaWawancara);
router.post('/edit-peserta-wawancara', EditPesertaWawancara);
router.delete('/delete-pesertawawancara/:id', DeletePesertaWawancara);
router.delete('/delete-pewawancara/:id', DeletePewawancara);

export default router;