import express from 'express';
import { CreateSoalUjianList, GetSoalUjianId, DeleteDataSoalUjianList } from '../controllers/SoalUjianControllers.js';

const router = express.Router();

router.get('/getSoalUjianList/:idUjian', GetSoalUjianId)
router.post('/create-soalujianlist', CreateSoalUjianList)
router.delete('/deletesoalujianlist/:id', DeleteDataSoalUjianList)

export default router;