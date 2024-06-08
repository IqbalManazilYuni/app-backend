import express from 'express';
import { CreateSoalUjianList } from '../controllers/SoalUjianControllers.js';

const router = express.Router();

router.post('/create-soalujianlist', CreateSoalUjianList)

export default router;