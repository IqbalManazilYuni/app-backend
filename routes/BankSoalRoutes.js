import express from 'express';
import { CreateSoalUjian, DeleteSoal, EditSoal, GetBankSoal, GetSoalById, CreateSoalUjianImport } from '../controllers/BankSoalControllers.js';

const router = express.Router();

router.get('/getbanksoal/:idLabor', GetBankSoal)
router.get('/getsoalbyid/:id', GetSoalById)
router.post('/create-soalujian', CreateSoalUjian)
router.post('/create-soalujian-import', CreateSoalUjianImport)
router.post('/edit-soalujian', EditSoal)
router.delete('/delete-soal/:id', DeleteSoal)

export default router;