import express from 'express';
import { CekKodeUjian, CreateJawabanUjian, CreatePesertaUjian, DeletePesertaUjian, EditNilaiJawabanEssay, GenerateKodeUjian, GetJadwalUjian, GetJawabanCalonAsisten, GetListUjianByIDLabor, GetNilaiUjianCalonAsisten, GetPesertaUjianByID, GetPesertaUjianByIdTahapan, GetSoalUjianByIdUjian, GetUjianByID, GetUjianTimeByNIM, GetpesertaUjianByid, UpdatePenganggungJawab, UpdateStatusUjianRecruitment } from '../controllers/UjianControllers.js';
import verifyToken from '../config/middleware.js';

const router = express.Router();

router.get('/getjawabancalonasisten/:idPendaftar', verifyToken, GetJawabanCalonAsisten)
router.get('/getsoalbyidujian/:idTahapan', verifyToken, GetSoalUjianByIdUjian)
router.get('/generatekodeujian/:id', verifyToken, GenerateKodeUjian)
router.get('/getujianbyidlabor/:idLabor', verifyToken, GetListUjianByIDLabor);
router.get('/getjadwalujian/:idLabor', verifyToken, GetJadwalUjian);
router.get('/getujianbyid/:id', verifyToken, GetUjianByID);
router.get('/getpesertaujianbyid/:id', verifyToken, GetPesertaUjianByID)
router.get('/getujianbynim/:nim', verifyToken, GetUjianTimeByNIM)
router.get('/getonepesertaujianbyid/:id', verifyToken, GetpesertaUjianByid)
router.get('/getpesertaujianbyidtahapan/:idTahapan', verifyToken, GetPesertaUjianByIdTahapan)
router.post('/create-pesertaujian', verifyToken, CreatePesertaUjian)
router.post('/edit-pesertaujian', verifyToken, UpdatePenganggungJawab);
router.post('/update-status-ujian', verifyToken, UpdateStatusUjianRecruitment);
router.post('/cekkodeujian', verifyToken, CekKodeUjian);
router.post('/postnilaijawabanessay', verifyToken, EditNilaiJawabanEssay);
router.get('/postambilnilaicalon/:idPendaftarString', verifyToken, GetNilaiUjianCalonAsisten)
router.post('/create-jawaban-user', verifyToken, CreateJawabanUjian)
router.delete('/delete-pesertaujian/:id', verifyToken, DeletePesertaUjian)

export default router;