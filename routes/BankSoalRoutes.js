import express from 'express';
import { CreateSoalUjian, DeleteSoal, EditSoal, GetBankSoal, GetSoalById, CreateSoalUjianImport } from '../controllers/BankSoalControllers.js';
import verifyToken from '../config/middleware.js';

const router = express.Router();

router.get('/getbanksoal/:idLabor', verifyToken, GetBankSoal)
router.get('/getsoalbyid/:id', verifyToken, GetSoalById)
router.post('/create-soalujian', verifyToken, CreateSoalUjian)
router.post('/create-soalujian-import', verifyToken, CreateSoalUjianImport)
router.post('/edit-soalujian', verifyToken, EditSoal)
router.delete('/delete-soal/:id', verifyToken, DeleteSoal)

export default router;