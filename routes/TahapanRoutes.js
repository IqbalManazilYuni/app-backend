import express from 'express';
import { CreateTahapan, DeleteTahapan, EditTahapan, GetTahapanByID, GetTahapanByIDRecruitment } from '../controllers/TahapanControllers.js';

const router = express.Router();

router.get('/gettahapanbyidrecruitment/:idRecruitment', GetTahapanByIDRecruitment)
router.get('/gettahapanbyid/:id', GetTahapanByID)
router.post('/add-tahapan', CreateTahapan);
router.post('/edit-tahapan', EditTahapan);
router.delete('/delete-tahapan/:id', DeleteTahapan);

export default router;