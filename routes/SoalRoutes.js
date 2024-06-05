import express from 'express';
import { CreateSoalUjian, GetBankSoal } from '../controllers/SoalUjian.js';

const router = express.Router();

router.get('/getbanksoal/:idLabor', GetBankSoal)
router.post('/create-soalujian', CreateSoalUjian)


export default router;