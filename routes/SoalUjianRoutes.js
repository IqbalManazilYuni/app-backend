import express from 'express';
import { CreateSoalUjianList, GetSoalUjianId, DeleteDataSoalUjianList } from '../controllers/SoalUjianControllers.js';
import verifyToken from '../config/middleware.js';

const router = express.Router();

router.get('/getSoalUjianList/:idUjian', verifyToken, GetSoalUjianId)
router.post('/create-soalujianlist', verifyToken, CreateSoalUjianList)
router.delete('/deletesoalujianlist/:id', verifyToken, DeleteDataSoalUjianList)

export default router;