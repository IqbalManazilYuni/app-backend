import express from 'express';
import { CreateTahapan, DeleteTahapan, EditTahapan, GetTahapanByID, GetTahapanByIDRecruitment } from '../controllers/TahapanControllers.js';
import verifyToken from '../config/middleware.js';

const router = express.Router();

router.get('/gettahapanbyidrecruitment/:idRecruitment', verifyToken, GetTahapanByIDRecruitment)
router.get('/gettahapanbyid/:id', verifyToken, GetTahapanByID)
router.post('/add-tahapan', verifyToken, CreateTahapan);
router.post('/edit-tahapan', verifyToken, EditTahapan);
router.delete('/delete-tahapan/:id', verifyToken, DeleteTahapan);

export default router;