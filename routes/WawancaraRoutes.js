import express from 'express';
import { CreateNilaiWawancara, CreatePesertaWawancara, DeletePesertaWawancara, DeletePewawancara, EditPesertaWawancara, GetAsistePewawancara, GetJadwalWawancara, GetListPesertaWawancaraByIDMobile, GetNilaiPewawancara, GetNilaiWawancaraByID, GetPendaftarByIDWawancara, GetPesertaByID, GetPesertaWawancara, GetWawancaraByIDLaborMobile, GetWawancaraById, GetWawancaraByIdLabor, GetWawancaraTimeByNIM, UpdateNilaiWawancaraPeserta } from '../controllers/WawancaraControllers.js';
import verifyToken from '../config/middleware.js';

const router = express.Router();

router.get('/getwawancarabyidlabor/:idLabor', verifyToken, GetWawancaraByIdLabor)
router.get('/getwawancarabyidlabormobile/:idLabor', verifyToken, GetWawancaraByIDLaborMobile)
router.get('/getpesertawwcbyidmobile/:id', verifyToken, GetListPesertaWawancaraByIDMobile)
router.get('/getnilaiwawancarabyid/:id', verifyToken, GetNilaiWawancaraByID)
router.get('/getjadwalwawancarabynim/:nim', verifyToken, GetWawancaraTimeByNIM)
router.post('/edit-nilaiwawancara', verifyToken, UpdateNilaiWawancaraPeserta)
router.get('/getpesertawawancarabyid/:id', verifyToken, GetPesertaByID)
router.get('/getwawancarabyid/:id', verifyToken, GetWawancaraById);
router.get('/getpesertawawancara/:idWawancara', verifyToken, GetPesertaWawancara)
router.get('/getpesertawawancarabyidwawancara/:idWawancara', verifyToken, GetPendaftarByIDWawancara);
router.get('/getnilaipesertawawancara/:id', verifyToken, GetNilaiPewawancara);
router.get('/getasistenpewawancara/:idLabor', verifyToken, GetAsistePewawancara);
router.post('/jadwalwawancara', verifyToken, GetJadwalWawancara);
router.post('/addpewawancara', verifyToken, CreateNilaiWawancara);
router.post('/add-pesertawawancara', verifyToken, CreatePesertaWawancara);
router.post('/edit-peserta-wawancara', verifyToken, EditPesertaWawancara);
router.delete('/delete-pesertawawancara/:id', verifyToken, DeletePesertaWawancara);
router.delete('/delete-pewawancara/:id', verifyToken, DeletePewawancara);

export default router;